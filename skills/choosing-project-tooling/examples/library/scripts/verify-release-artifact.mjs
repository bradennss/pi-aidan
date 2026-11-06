import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import process from "node:process";

const revision = process.argv[2];
assert.match(revision ?? "", /^[a-f0-9]{40}$/);
const receipt = JSON.parse(readFileSync(".artifacts/release.json", "utf8"));
assert.equal(
  receipt.revision,
  revision,
  "Artifact is from another source revision",
);
const bytes = readFileSync(".artifacts/package.tgz");
assert.equal(
  receipt.integrity,
  `sha512-${createHash("sha512").update(bytes).digest("base64")}`,
  "Artifact integrity mismatch",
);
const packed = JSON.parse(
  execFileSync(
    "tar",
    ["-xOf", ".artifacts/package.tgz", "package/package.json"],
    {
      encoding: "utf8",
      timeout: 5000,
      maxBuffer: 1024 * 1024,
    },
  ),
);
const source = JSON.parse(readFileSync("package.json", "utf8"));
// pnpm pack omits the source-only packageManager field.
const publishableSource = { ...source };
delete publishableSource.packageManager;
assert.deepEqual(
  packed,
  publishableSource,
  "Packed package metadata differs from source",
);
assert.equal(source.private, false, "Explicit source preparation is required");
assert.notEqual(source.name, "unpublished-aidan-duration-example");
assert.match(
  source.version,
  /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/,
);
assert.notEqual(source.version, "0.0.0");
assert.equal(
  source.repository?.url,
  `git+https://github.com/${process.env.GITHUB_REPOSITORY}.git`,
  "Set repository.url to the publishing repository",
);
console.log(`Verified ${source.name}@${source.version} from ${revision}`);
