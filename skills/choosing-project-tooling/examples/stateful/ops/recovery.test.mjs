import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createServer } from "node:http";
import { test } from "node:test";

const root = resolve(import.meta.dirname, "..");
const source = `stateful_backup_${crypto.randomUUID().replaceAll("-", "")}`;
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
function sql(query) {
  return ok("docker", [
    "compose",
    "exec",
    "-T",
    "test-db",
    "psql",
    "-U",
    "stateful_local",
    "-d",
    source,
    "-At",
    "-v",
    "ON_ERROR_STOP=1",
    "-c",
    query,
  ]);
}

test("native backup restores exact durable rows into a fresh database and refuses overwrites and failed captures", () => {
  const dir = mkdtempSync(join(tmpdir(), "stateful-backup-"));
  const target = `stateful_restore_${crypto.randomUUID().replaceAll("-", "")}`;
  const env = {
    RESTIC_REPOSITORY: join(dir, "repository"),
    RESTIC_PASSWORD: "disposable-only",
    BACKUP_DATABASE: source,
  };
  const exec = ["compose", "exec", "-T", "test-db"];
  let ownsSource = false;
  let ownsTarget = false;
  try {
    ok("docker", [...exec, "createdb", "-U", "stateful_local", source]);
    ownsSource = true;
    ok("docker", [
      "run",
      "--rm",
      "--network",
      "stateful-task-tracker_default",
      "-e",
      `DATABASE_URL=postgresql://stateful_local:disposable-local-only@test-db/${source}`,
      "stateful:recovery",
      "node",
      "migrate.mjs",
    ]);
    sql(
      "insert into tasks (id,title,completed) values ('11111111-1111-4111-8111-111111111111', 'Restore completed work', true), ('22222222-2222-4222-8222-222222222222', 'Keep pending work', false)",
    );
    ok("restic", ["init"], env);
    ok("just", ["backup"], env);
    ok("docker", [...exec, "dropdb", "-U", "stateful_local", source]);
    const url = `postgresql://stateful_local:disposable-local-only@127.0.0.1:55433/${target}`;
    ok("just", ["restore", url], env);
    ownsTarget = true;
    const rows = JSON.parse(
      ok("docker", [
        ...exec,
        "psql",
        "-U",
        "stateful_local",
        "-d",
        target,
        "-At",
        "-c",
        "select json_agg(t order by id) from (select id,title,completed from tasks) t",
      ]),
    );
    assert.deepEqual(rows, [
      {
        id: "11111111-1111-4111-8111-111111111111",
        title: "Restore completed work",
        completed: true,
      },
      {
        id: "22222222-2222-4222-8222-222222222222",
        title: "Keep pending work",
        completed: false,
      },
    ]);
    assert.equal(
      ok("docker", [
        ...exec,
        "psql",
        "-U",
        "stateful_local",
        "-d",
        target,
        "-At",
        "-c",
        "select count(*) from drizzle.__drizzle_migrations",
      ]),
      "2",
    );
    assert.equal(
      ok("docker", [
        ...exec,
        "psql",
        "-U",
        "stateful_local",
        "-d",
        target,
        "-At",
        "-c",
        "select count(*) from tasks where created_at is not null",
      ]),
      "2",
    );
    assert.notEqual(run("just", ["restore", url], env).status, 0);
    assert.notEqual(
      run("just", ["restore", "postgresql://production/production"], env)
        .status,
      0,
    );
    const failed = run("just", ["backup"], env);
    assert.notEqual(failed.status, 0);
    assert.match(failed.stderr, /does not exist/);
    assert.equal(
      JSON.parse(ok("restic", ["snapshots", "--json"], env)).length,
      1,
    );
  } finally {
    if (ownsSource)
      run("docker", [
        ...exec,
        "dropdb",
        "--if-exists",
        "-U",
        "stateful_local",
        source,
      ]);
    if (ownsTarget)
      run("docker", [
        ...exec,
        "dropdb",
        "--if-exists",
        "-U",
        "stateful_local",
        target,
      ]);
    rmSync(dir, { recursive: true, force: true });
  }
});

test("rendered backup unit fails nonzero, cleans restricted dump, and its configured failure route reaches only a local receiver", async () => {
  const dir = mkdtempSync(join(tmpdir(), "stateful-unit-"));
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
      "stateful-db",
      "--tmpfs",
      "/var/lib/postgresql",
      "-e",
      "POSTGRES_USER=stateful",
      "-e",
      "POSTGRES_DB=stateful",
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
          "stateful-db",
          "pg_isready",
          "-U",
          "stateful",
          "-d",
          "stateful",
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
      "stateful-db",
      "psql",
      "-U",
      "stateful",
      "-d",
      "stateful",
      "-c",
      "create table tasks (title text); insert into tasks values ('Unit capture')",
    ]);
    render(
      "ansible/templates/database-backup.service.j2",
      "database-backup.service",
    );
    render(
      "ansible/templates/failure-alert.service.j2",
      "stateful-alert.service",
    );
    ok("restic", ["init"], env);
    const capture = unitCommand("database-backup.service", "ExecStart");
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
      assert.equal(statSync(join(dir, "tasks.dump")).mode & 0o777, 0o600);
      assert.equal(execute(clean).status, 0);
      assert.equal(existsSync(join(dir, "tasks.dump")), false);
      const failure = execute(capture, { RESTIC_PASSWORD: "wrong-key" });
      assert.notEqual(failure.status, 0);
      assert.match(failure.stderr, /wrong password|no key found/);
      assert.equal(execute(clean).status, 0);
      assert.equal(existsSync(join(dir, "tasks.dump")), false);
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
      assert.deepEqual(requests, ["text=Stateful host requires attention"]);
      assert.equal(
        JSON.parse(ok("restic", ["snapshots", "--json"], env)).length,
        1,
      );
    } finally {
      process.umask(previousMask);
    }
  } finally {
    server.close();
    if (ownsDatabase) run("docker", ["rm", "--force", "stateful-db"]);
    rmSync(dir, { recursive: true, force: true });
  }
});

test("first-deploy hook migrates a fresh database and a failed additive release stops writers but preserves rows for the previous image", async () => {
  const dir = mkdtempSync(join(tmpdir(), "stateful-release-"));
  const network = `stateful-release-${Date.now()}`;
  const names = [];
  const good = `ghcr.io/fixture/stateful:${"1".repeat(40)}`;
  const bad = `ghcr.io/fixture/stateful:${"2".repeat(40)}`;
  const hookEnv = {
    KAMAL_LOCK: "true",
    KAMAL_SERVICE: "stateful",
    KAMAL_ROLES: "web",
    KAMAL_HOSTS: "192.0.2.1",
    DEPLOY_HOST: "192.0.2.1",
    IMAGE_REPOSITORY: "fixture/stateful",
    SSH_CONFIG_FILE: "/dev/null",
    KAMAL_VERSION: "1".repeat(40),
    PATH: `${dir}:${process.env.PATH}`,
    RECOVERY_ENV_FILE: join(dir, "migration.env"),
    RECOVERY_NETWORK: network,
  };
  let ownsNetwork = false;
  const dbSql = (query) =>
    ok("docker", [
      "exec",
      "stateful-release-db",
      "psql",
      "-U",
      "stateful",
      "-d",
      "stateful",
      "-At",
      "-v",
      "ON_ERROR_STOP=1",
      "-c",
      query,
    ]);
  try {
    // Refuse to stop any pre-existing deployment on a shared local daemon.
    assert.equal(
      ok("docker", [
        "ps",
        "--filter",
        "label=service=stateful",
        "--filter",
        "label=role=web",
        "-q",
      ]),
      "",
    );
    ok("docker", ["image", "inspect", "stateful:recovery"]);
    ok("docker", ["tag", "stateful:recovery", good]);
    const { cpSync } = await import("node:fs");
    cpSync(join(root, "drizzle"), join(dir, "drizzle"), { recursive: true });
    const journal = JSON.parse(
      readFileSync(join(dir, "drizzle/meta/_journal.json"), "utf8"),
    );
    journal.entries.push({
      idx: 2,
      version: "7",
      when: journal.entries.at(-1).when + 1,
      tag: "0002_failed_release",
      breakpoints: true,
    });
    writeFileSync(
      join(dir, "drizzle/meta/_journal.json"),
      JSON.stringify(journal),
    );
    writeFileSync(
      join(dir, "drizzle/0002_failed_release.sql"),
      "ALTER TABLE tasks ADD COLUMN release_probe text;\n--> statement-breakpoint\nSELECT missing_release_function();\n",
    );
    writeFileSync(
      join(dir, "Dockerfile"),
      "FROM stateful:recovery\nCOPY --chown=node:node drizzle ./drizzle\n",
    );
    ok("docker", ["build", "-t", bad, dir]);
    ok("docker", ["network", "create", network]);
    ownsNetwork = true;
    ok("docker", [
      "run",
      "-d",
      "--name",
      "stateful-release-db",
      "--network",
      network,
      "--tmpfs",
      "/var/lib/postgresql",
      "-e",
      "POSTGRES_USER=stateful",
      "-e",
      "POSTGRES_DB=stateful",
      "-e",
      "POSTGRES_PASSWORD=disposable-only",
      "postgres:18.6-trixie@sha256:bd5dfa494a5a259704365813dbfa5fa6b3e69be7348d43b547f540c730478583",
    ]);
    names.push("stateful-release-db");
    let ready = false;
    for (let i = 0; i < 60; i++) {
      if (
        run("docker", [
          "exec",
          "stateful-release-db",
          "pg_isready",
          "-U",
          "stateful",
        ]).status === 0
      ) {
        ready = true;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    assert.ok(ready, "release database readiness deadline");
    writeFileSync(
      join(dir, "migration.env"),
      "DATABASE_URL=postgresql://stateful:disposable-only@stateful-release-db/stateful\n",
      { mode: 0o600 },
    );
    // Substitute only SSH transport and host-local paths. The actual hook,
    // image lookup, Docker stop/check, and Drizzle migration execute unchanged.
    writeFileSync(
      join(dir, "ssh"),
      `#!/bin/sh
set -eu
test "$1" = -F && test "$2" = /dev/null
shift 2
while [ "$1" = -o ]; do
  case "$2" in BatchMode=yes|ConnectTimeout=15|ServerAliveInterval=15|ServerAliveCountMax=2) ;; *) exit 1 ;; esac
  shift 2
done
test "$1" = deploy@192.0.2.1
shift
sed -e "s|/etc/stateful/migration.env|$RECOVERY_ENV_FILE|g" -e "s|--network kamal|--network $RECOVERY_NETWORK|g" | "$@"
`,
      { mode: 0o700 },
    );
    ok("bash", [".kamal/hooks/pre-app-boot"], hookEnv);
    dbSql(
      "insert into tasks (id,title,completed) values ('11111111-1111-4111-8111-111111111111','Survive failed release',true)",
    );
    ok("docker", [
      "run",
      "-d",
      "--name",
      "stateful-release-app",
      "--network",
      network,
      "--network-alias",
      "app",
      "--label",
      "service=stateful",
      "--label",
      "role=web",
      "--env-file",
      join(dir, "migration.env"),
      good,
    ]);
    names.push("stateful-release-app");
    for (const invalid of [
      { KAMAL_LOCK: "false" },
      { KAMAL_ROLES: "worker" },
      { KAMAL_HOSTS: "192.0.2.2" },
      { KAMAL_VERSION: "not-a-sha" },
    ]) {
      assert.notEqual(
        run("bash", [".kamal/hooks/pre-app-boot"], { ...hookEnv, ...invalid })
          .status,
        0,
      );
      assert.equal(
        ok("docker", [
          "inspect",
          "--format",
          "{{.State.Running}}",
          "stateful-release-app",
        ]),
        "true",
      );
    }
    const failure = run("bash", [".kamal/hooks/pre-app-boot"], {
      ...hookEnv,
      KAMAL_VERSION: "2".repeat(40),
    });
    assert.notEqual(failure.status, 0);
    assert.match(failure.stderr, /missing_release_function/);
    assert.equal(
      ok("docker", [
        "ps",
        "--filter",
        "label=service=stateful",
        "--filter",
        "label=role=web",
        "-q",
      ]),
      "",
    );
    assert.deepEqual(
      JSON.parse(
        dbSql(
          "select json_agg(t) from (select id,title,completed from tasks) t",
        ),
      ),
      [
        {
          id: "11111111-1111-4111-8111-111111111111",
          title: "Survive failed release",
          completed: true,
        },
      ],
    );
    assert.equal(
      dbSql(
        "select count(*) from information_schema.columns where table_name='tasks' and column_name='release_probe'",
      ),
      "0",
    );
    ok("docker", ["start", "stateful-release-app"]);
    ok("docker", [
      "run",
      "-d",
      "--name",
      "stateful-release-gateway",
      "--network",
      network,
      "-v",
      `${join(root, "config/Caddyfile")}:/etc/caddy/Caddyfile:ro`,
      "-e",
      "BASIC_AUTH_USER=stateful-test",
      "-e",
      "BASIC_AUTH_HASH=$2a$14$4Nb.dvcT/BDWlz0/Uqziy.morUYofYDB9E5hh6E6tC17p4aXN1Ma.",
      "caddy:2.11.9-alpine@sha256:0bbb055bda6793c999bde78b1b5ce3e89f829fb031af2cf50056ea1246559fee",
    ]);
    names.push("stateful-release-gateway");
    // Probe from the private network. Docker Desktop's host-port forwarding is
    // not reachable reliably from an act runner's host-network namespace.
    const probe = (path, authorized = false) =>
      JSON.parse(
        ok("docker", [
          "exec",
          "stateful-release-app",
          "node",
          "-e",
          `fetch('http://stateful-release-gateway:8080${path}', {signal:AbortSignal.timeout(2000),headers:${JSON.stringify(authorized ? { Authorization: "Basic " + Buffer.from("stateful-test:disposable-gateway-only").toString("base64") } : {})}}).then(async r=>console.log(JSON.stringify({status:r.status,body:await r.text()})))`,
        ]),
      );
    ready = false;
    for (let i = 0; i < 60; i++) {
      try {
        if (probe("/up").status === 200) {
          ready = true;
          break;
        }
      } catch {
        /* Bounded startup polling. */
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    assert.ok(
      ready,
      `previous image readiness deadline\n${run("docker", ["logs", "stateful-release-gateway"]).stderr}\n${run("docker", ["logs", "stateful-release-app"]).stdout}`,
    );
    assert.equal(probe("/").status, 401);
    const response = probe("/", true);
    assert.equal(response.status, 200);
    assert.match(response.body, /Survive failed release/);
  } finally {
    for (const name of names.reverse()) run("docker", ["rm", "-f", name]);
    if (ownsNetwork) run("docker", ["network", "rm", network]);
    run("docker", ["image", "rm", good, bad]);
    rmSync(dir, { recursive: true, force: true });
  }
});
