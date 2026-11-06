import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import process from "node:process";
import { test } from "node:test";

function lookup(input, version = "1.1.0") {
  return spawnSync(
    process.execPath,
    ["scripts/assert-version-absent.mjs", version],
    { input, encoding: "utf8", timeout: 5000 },
  );
}

test("accepts affirmative absence in native npm versions JSON", () => {
  const result = lookup('["1.0.0", "1.1.0-rc.1", "1.0.0+build.2"]');
  assert.equal(result.status, 0, result.stderr);
});

test("refuses an existing immutable version", () => {
  const result = lookup('["1.0.0", "1.1.0"]');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Refusing existing version/);
});

for (const input of [
  "",
  "not json",
  '{"error":{"code":"E404"}}',
  '{"error":{"code":"E401"}}',
  "null",
  '"1.0.0"',
  "[]",
  "[null]",
  '["garbage"]',
  '["01.0.0"]',
  '["1.0.0-01"]',
  '["1.0.0\\n"]',
]) {
  test(`rejects unknown or malformed lookup: ${input || "empty"}`, () => {
    assert.notEqual(lookup(input).status, 0);
  });
}

test("refuses a missing target version", () => {
  assert.notEqual(lookup('["1.0.0"]', "").status, 0);
});
