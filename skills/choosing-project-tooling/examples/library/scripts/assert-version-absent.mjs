import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import process from "node:process";

// Only a successful native npm versions lookup can reach this guard.
// An error object, empty response, or unfamiliar schema is never absence.
const versions = JSON.parse(readFileSync(0, "utf8"));
const number = "(?:0|[1-9][0-9]*)";
const identifier = "(?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*)";
const semver = new RegExp(
  `^${number}\\.${number}\\.${number}(?:-${identifier}(?:\\.${identifier})*)?(?:\\+[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?$`,
);
const version = process.argv[2];
assert.ok(typeof version === "string" && semver.exec(version)?.[0] === version);
assert.ok(Array.isArray(versions) && versions.length > 0);
assert.ok(
  versions.every((v) => typeof v === "string" && semver.exec(v)?.[0] === v),
);
assert.ok(!versions.includes(version), `Refusing existing version ${version}`);
console.log(`Registry confirms ${version} is absent from the existing package`);
