import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { test } from "node:test";

const root = resolve(import.meta.dirname, "..");
const env = {
  ...process.env,
  TF_VAR_state_passphrase: "temporary-only-test-encryption-key",
  TF_IN_AUTOMATION: "1",
};
function run(cwd, command, args, extra = {}) {
  return spawnSync(command, args, {
    cwd,
    env: { ...env, ...extra },
    encoding: "utf8",
  });
}
function ok(cwd, command, args) {
  const result = run(cwd, command, args);
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

test("partial apply persists encrypted state; rejected push retains recovery; reconciliation preserves mutation", () => {
  const dir = mkdtempSync(join(tmpdir(), "stateless-state-"));
  const repo = join(dir, "writer");
  const remote = join(dir, "remote.git");
  const peer = join(dir, "peer");
  try {
    mkdirSync(join(repo, "infra"), { recursive: true });
    cpSync(join(root, "test/state/main.tf"), join(repo, "infra/main.tf"));
    cpSync(
      join(root, "infra/encryption.tf"),
      join(repo, "infra/encryption.tf"),
    );
    writeFileSync(
      join(repo, "infra/backend.tf"),
      'terraform {\n  backend "local" {\n    path = "production.tfstate"\n  }\n}\n',
    );
    writeFileSync(
      join(repo, ".gitignore"),
      "infra/.terraform/\ninfra/*.backup\n.recovery/\n",
    );
    cpSync(join(root, "justfile"), join(repo, "justfile"));
    ok(dir, "git", ["init", "--bare", "--initial-branch=main", remote]);
    ok(repo, "git", ["init", "--initial-branch=main"]);
    ok(repo, "git", ["config", "user.email", "test@example.invalid"]);
    ok(repo, "git", ["config", "user.name", "Local test"]);
    ok(repo, "git", ["add", "."]);
    ok(repo, "git", ["commit", "-m", "fixture"]);
    ok(repo, "git", ["remote", "add", "origin", remote]);
    ok(repo, "git", ["push", "origin", "main"]);
    ok(repo, "tofu", ["-chdir=infra", "init", "-input=false"]);
    const failed = run(
      repo,
      "tofu",
      ["-chdir=infra", "apply", "-input=false", "-auto-approve"],
      { TF_VAR_fail: "true" },
    );
    assert.notEqual(failed.status, 0);
    assert.match(failed.stderr, /local-exec provisioner error/);
    ok(repo, "just", ["persist-state"]);
    const encrypted = readFileSync(
      join(repo, "infra/production.tfstate"),
      "utf8",
    );
    assert.equal(
      encrypted.includes("local-state-rehearsal-sensitive-marker"),
      false,
    );
    assert.ok(JSON.parse(encrypted).encrypted_data);
    const persistedCommit = ok(repo, "git", ["rev-parse", "HEAD"]);
    ok(repo, "just", ["persist-state"]);
    assert.equal(ok(repo, "git", ["rev-parse", "HEAD"]), persistedCommit);
    ok(dir, "git", ["clone", remote, peer]);
    ok(peer, "git", ["config", "user.email", "test@example.invalid"]);
    ok(peer, "git", ["config", "user.name", "Local test"]);
    writeFileSync(join(peer, "unrelated.txt"), "concurrent main commit\n");
    ok(peer, "git", ["add", "."]);
    ok(peer, "git", ["commit", "-m", "main advanced"]);
    ok(peer, "git", ["push", "origin", "main"]);
    ok(repo, "tofu", [
      "-chdir=infra",
      "apply",
      "-input=false",
      "-auto-approve",
    ]);
    const rejected = run(repo, "just", ["persist-state"]);
    assert.notEqual(rejected.status, 0);
    assert.match(rejected.stderr, /rejected|fetch first/);
    assert.equal(
      rejected.stdout.includes("local-state-rehearsal-sensitive-marker"),
      false,
    );
    assert.equal(
      rejected.stderr.includes("local-state-rehearsal-sensitive-marker"),
      false,
    );
    const recovery = readFileSync(join(repo, ".recovery/production.tfstate"));
    assert.deepEqual(
      recovery,
      readFileSync(join(repo, "infra/production.tfstate")),
    );
    // Reconcile on fresh main without rebasing or replaying an apply.
    cpSync(
      join(repo, ".recovery/production.tfstate"),
      join(peer, "infra/production.tfstate"),
    );
    ok(peer, "tofu", ["-chdir=infra", "init", "-input=false"]);
    ok(peer, "just", ["verify-state"]);
    const state = JSON.parse(
      ok(peer, "tofu", ["-chdir=infra", "show", "-json"]),
    );
    assert.equal(
      state.values.root_module.resources.find(
        (r) => r.address === "terraform_data.changed",
      ).values.input,
      "local-state-rehearsal-sensitive-marker",
    );
    ok(peer, "just", ["persist-state"]);
    assert.deepEqual(
      readFileSync(join(peer, "infra/production.tfstate")),
      recovery,
    );
    writeFileSync(
      join(peer, "infra/production.tfstate"),
      '{"version":4,"resources":[]}',
    );
    const plaintext = run(peer, "just", ["persist-state"]);
    assert.notEqual(plaintext.status, 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("infrastructure history gate denies failure, missing or ambiguous history, and non-main runs", () => {
  const earlier = {
    id: 9,
    run_number: 9,
    conclusion: "success",
    status: "completed",
    head_branch: "main",
    path: ".github/workflows/infrastructure.yml@main",
    workflow_id: 77,
    event: "workflow_dispatch",
  };
  const gate = (runs) =>
    spawnSync(
      "jq",
      [
        "-e",
        "--argjson",
        "number",
        "10",
        "--argjson",
        "id",
        "10",
        "--argjson",
        "workflow",
        "77",
        "-f",
        join(root, "ops/prior-run.jq"),
      ],
      { input: JSON.stringify([{ workflow_runs: runs }]), encoding: "utf8" },
    );
  assert.equal(gate([earlier]).status, 0);
  for (const runs of [
    [],
    [earlier, earlier],
    [{ ...earlier, conclusion: "failure" }],
    [{ ...earlier, conclusion: "cancelled" }],
    [{ ...earlier, status: "in_progress" }],
    [{ ...earlier, head_branch: "feature" }],
    [{ ...earlier, run_number: 8 }],
    [{ ...earlier, workflow_id: 78 }],
  ]) {
    assert.notEqual(gate(runs).status, 0);
  }
});
