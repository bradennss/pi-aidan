import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createServer } from "node:http";
import { test } from "node:test";

const root = resolve(import.meta.dirname, "..");
const container = `monorepo-backup-${crypto.randomUUID()}`;
function run(command, args, env = {}, input) {
  return spawnSync(command, args, {
    cwd: root,
    env: { ...process.env, ...env },
    input,
    encoding: "utf8",
    timeout: 120_000,
  });
}
function ok(command, args, env, input) {
  const result = run(command, args, env, input);
  assert.equal(
    result.status,
    0,
    `${command}: ${result.stderr}\n${result.stdout}`,
  );
  return result.stdout.trim();
}
test("rendered backup unit fails nonzero, cleans restricted dump, and its configured failure route reaches only a local receiver", async () => {
  const dir = mkdtempSync(join(tmpdir(), "monorepo-unit-"));
  const env = {
    RESTIC_REPOSITORY: join(dir, "repository"),
    RESTIC_PASSWORD: "disposable-only",
  };
  let ownsDatabase = false;
  const requests = [];
  const server = createServer((request, response) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      requests.push(body);
      response.end("ok");
    });
  });
  function render(source, destination) {
    ok("ansible", [
      "localhost",
      "-i",
      "localhost,",
      "-c",
      "local",
      "-m",
      "ansible.builtin.template",
      "-a",
      `src=${join(root, source)} dest=${join(dir, destination)} mode=0600`,
      "-e",
      JSON.stringify({ backup_directory: dir }),
    ]);
  }
  function unitCommand(file, key) {
    const line = readFileSync(join(dir, file), "utf8")
      .split("\n")
      .find((line) => line.startsWith(`${key}=`));
    assert.ok(line, `${file} must define ${key}`);
    return line.slice(key.length + 1).replaceAll("$$", "$");
  }
  try {
    ok("docker", [
      "run",
      "--detach",
      "--name",
      container,
      "--tmpfs",
      "/var/lib/postgresql",
      "-e",
      "POSTGRES_USER=monorepo",
      "-e",
      "POSTGRES_DB=monorepo",
      "-e",
      "POSTGRES_PASSWORD=disposable-only",
      "postgres:18.6-trixie@sha256:bd5dfa494a5a259704365813dbfa5fa6b3e69be7348d43b547f540c730478583",
    ]);
    ownsDatabase = true;
    let ready = false;
    for (let attempt = 0; attempt < 60; attempt++) {
      if (
        run("docker", [
          "exec",
          container,
          "pg_isready",
          "-U",
          "monorepo",
          "-d",
          "monorepo",
        ]).status === 0
      ) {
        ready = true;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    assert.ok(ready, "disposable PostgreSQL readiness deadline");
    ok("docker", [
      "exec",
      container,
      "psql",
      "-U",
      "monorepo",
      "-d",
      "monorepo",
      "-c",
      "create table tasks (title text); insert into tasks values ('Unit capture')",
    ]);
    render(
      "ansible/templates/database-backup.service.j2",
      "database-backup.service",
    );
    render(
      "ansible/templates/failure-alert.service.j2",
      "monorepo-alert.service",
    );
    ok("restic", ["init"], env);
    const capture = unitCommand("database-backup.service", "ExecStart").replace(
      "monorepo-api-db",
      container,
    );
    const clean = unitCommand("database-backup.service", "ExecStopPost");
    const execute = (command, extra = {}) =>
      spawnSync("sh", ["-c", command], {
        cwd: dir,
        env: { ...process.env, ...env, ...extra },
        encoding: "utf8",
        timeout: 120_000,
      });
    const previousMask = process.umask(0o077);
    try {
      assert.equal(execute(capture).status, 0);
      const { statSync, existsSync } = await import("node:fs");
      assert.equal(statSync(join(dir, "reports.dump")).mode & 0o777, 0o600);
      assert.equal(execute(clean).status, 0);
      assert.equal(existsSync(join(dir, "reports.dump")), false);
      const failure = execute(capture, { RESTIC_PASSWORD: "wrong-key" });
      assert.notEqual(failure.status, 0);
      assert.match(failure.stderr, /wrong password|no key found/);
      assert.equal(execute(clean).status, 0);
      assert.equal(existsSync(join(dir, "reports.dump")), false);
      // macOS has no systemd. Dispatch the actual rendered OnFailure command;
      // scheduler activation and sandbox enforcement need an authorized Debian trial.
      const alert = unitCommand("database-backup.service", "OnFailure");
      await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
      const { execFile } = await import("node:child_process");
      await new Promise((resolve, reject) =>
        execFile(
          "sh",
          ["-c", unitCommand(alert, "ExecStart")],
          {
            env: {
              ...process.env,
              ALERT_WEBHOOK: `http://127.0.0.1:${server.address().port}/failure`,
            },
            timeout: 20_000,
          },
          (error) => (error ? reject(error) : resolve()),
        ),
      );
      assert.deepEqual(requests, ["text=Monorepo host requires attention"]);
      assert.equal(
        JSON.parse(ok("restic", ["snapshots", "--json"], env)).length,
        1,
      );
    } finally {
      process.umask(previousMask);
    }
  } finally {
    server.close();
    if (ownsDatabase) run("docker", ["rm", "--force", container]);
    rmSync(dir, { recursive: true, force: true });
  }
});
