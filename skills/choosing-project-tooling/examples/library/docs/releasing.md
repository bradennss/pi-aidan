# Release operations

This is an unpublished, private example. No npm name has been claimed and no trusted publisher has been configured. The workflow is a design to adapt in a standalone public repository, not permission to publish. Registry ownership, GitHub protections, artifact service behavior, OIDC exchange, and actual npm publication must be verified separately when authorized. Local act and dry runs cannot prove them.

## Prepare the package and repository

1. Obtain explicit approval for a real public package name and publication. Create or use an npm account with a verified email address and two-factor authentication. Confirm ownership of the unscoped name or membership and publishing rights in the chosen user/organization scope. Public packages are available on npm's free plan; paid private packages are outside this example. An apparently unused name is not proof that npm will let you register it.
2. Copy this directory into its own public GitHub repository with default branch `main`. These workflows run at that project root, not inside pi-aidan. Protect `main` with reviewed pull requests and the Check job as a required status check. Restrict who can modify workflows or dispatch releases. Review workflow and dependency changes as privileged code.
3. In a reviewed source change, replace `name` and `description` in `package.json`, set `private` explicitly to `false`, and add `"repository": { "type": "git", "url": "git+https://github.com/OWNER/REPOSITORY.git" }` with the actual public repository. Update both public imports in `test/consumer/index.ts` and the README usage import to the chosen name. Do not automatically flip `private` in CI or edit metadata inside a packed artifact. Prepare the first nonzero stable version and changelog with Changesets, as described below. Prerelease versions are not supported by this workflow.
4. Create the GitHub environment **npm-release** before enabling releases. Set required reviewers, prevent self-review, restrict deployment branches to `main`, and disallow protection bypass where available. GitHub plan and visibility determine which controls are available. Required reviewers and wait timers are available for public repositories on current plans; verify the repository's actual settings and administrator bypass rights. If the required protection cannot be enforced, stop instead of silently weakening it. Set the environment variable `NPM_RELEASE_ENABLED` to `true` only after these prerequisites are satisfied. Do not set it at repository or organization scope. A missing variable stops publication, including if GitHub creates an unconfigured environment automatically. No registry token or environment secret is required by this example.

Artifacts contain public source-derived package contents and a revision/integrity receipt. GitHub repository readers can download them. They must contain no secrets; this example does not require a private production repository.

## Bootstrap the first npm version

Trusted publishing is configured in an **existing package's settings**. It cannot establish ownership of this placeholder or create an account. Bootstrap the first real version separately, with explicit publication authorization and interactive npm authentication. Do not install credentials or run these publication commands merely to validate the example.

On an authorized maintainer workstation, after preparing and reviewing the real name/version, use the pinned tools and build the artifact once:

```sh
pnpm install --frozen-lockfile
just check test-consumer
npm publish ./.artifacts/package.tgz --dry-run --ignore-scripts --access public
```

Inspect the dry-run name, version, file list, and SHA-512 integrity. A dry run does not check name ownership, authentication, or registry acceptance. Keep that exact verified tarball. For the separately authorized first publication, use npm's interactive login and native tarball publication:

```sh
npm login --registry=https://registry.npmjs.org
npm publish ./.artifacts/package.tgz --ignore-scripts --access public --registry=https://registry.npmjs.org
npm logout --registry=https://registry.npmjs.org
```

Follow npm's browser/2FA prompts. Use a private workstation credential store and remove temporary credentials afterwards. Never commit an `.npmrc` credential or upload it as an artifact. This manual bootstrap does not produce GitHub provenance; `--provenance` is not a local-workstation identity substitute. If publication fails, retain the original tarball and inspect the native error. Do not overwrite or repack the version. A package that already exists requires its owner's access; an E404 is not permission to claim a name.

In the real package's npm settings, add a **GitHub Actions** trusted publisher:

- **Organization or user**: the exact GitHub owner.
- **Repository**: the exact repository name.
- **Workflow filename**: `release.yml`, including the extension, without `.github/workflows/`. Do not configure `check.yml` or a reusable caller.
- **Environment name**: `npm-release`, case-sensitive and matching this workflow.
- **Allowed actions**: explicitly allow direct **npm publish**. Current npm configurations default to staged publishing, which this example does not use. No dist-tag permission is needed for a normal publish with its `latest` tag.

Current npm documentation requires a newly configured publisher's first successful publication within two days to bind its immutable repository identity. If it expires, delete and recreate the configuration before the next authorized release. Saving settings does not verify them. After validating trusted publishing, select **Require two-factor authentication and disallow tokens** in package publishing access and revoke obsolete automation tokens. Do not introduce a long-lived token fallback.

Use GitHub-hosted Ubuntu runners. npm trusted publishing currently requires Node 22.14+ and npm 11.5.1+; the pinned Node installation supplies npm 11.20.0. The package's repository URL must match the publishing GitHub repository. Public repository plus public package plus OIDC are prerequisites for automatic npm provenance. The workflow explicitly requests provenance so a failure stops the release. Self-hosted runners and act are not supported trusted identity proofs.

## Prepare a version, then request publication

For each user-visible change, run `pnpm changeset`, select the package and bump type, and commit the generated change description with the code. Documentation or tooling changes need no changeset unless they affect the published package. The config allows local versioning of the private placeholder for rehearsal; that does not make it publishable.

When ready to prepare a version:

```sh
pnpm version:prepare
just format
just check test-consumer
```

Review and commit the resulting `package.json`, `CHANGELOG.md`, consumed changeset removals, and lockfile. Merge through normal review. Version preparation does not approve a release. Do not run `changeset publish`: it would use package directories rather than the already-tested artifact.

After separate release approval, dispatch **Release** (`release.yml`) on the current `main` revision with `reuse_run` empty. The workflow rejects stale or non-default-branch revisions and GitHub job reruns. Its unprivileged prepare job installs from the lockfile without a cache, runs checks, builds once, packs once, and validates the actual tarball with strict publint, ATTW, and the isolated TypeScript-to-Node consumer. It records the source SHA and tarball SHA-512, checks packed metadata against source, and uploads an immutable Actions artifact named `release-SOURCE_SHA` with 14-day retention. It never uploads PR artifacts for publication.

The protected `npm-release` job has only `contents: read`, `actions: read`, and `id-token: write`. It downloads that exact run's named artifact, verifies the bytes and source metadata again, checks environment readiness and registry absence, then rechecks current `main` immediately before `npm publish` of the tarball. It installs no project dependencies and uses `--ignore-scripts` to prevent package lifecycle code from rebuilding. No `npm publish` of a directory is allowed. The fresh `main` check narrows a race; it cannot atomically lock GitHub branch updates with npm publication. Avoid advancing `main` while approving a release.

## Retry and recover without changing published content

Published npm versions are immutable. npm rejects reuse of a name/version even after unpublishing. Never replace an artifact, edit its metadata, or rebuild it for a publication retry. Concurrent external publishers can still race this workflow; npm's version conflict must stop publication, not trigger replacement. Release workflow concurrency serializes active runs and does not cancel a running release. GitHub may replace a pending concurrency run with a newer pending request; this is not a durable release queue.

If a publish fails or its result is uncertain:

1. Keep the original run ID and artifact. Do not use GitHub **Re-run all jobs** or **Re-run failed jobs**: all attempts after attempt 1 are explicitly refused to prevent accidental rebuilds. Do not start an empty-input dispatch as a retry.
2. Inspect npm read-only metadata with `npm view REAL_NAME versions --json` and, if the version exists, `npm view REAL_NAME@VERSION dist.integrity`. Compare its integrity with the retained `release.json`. The workflow refuses **all existing versions**, including exact matches. A matching integrity may confirm the prior publish completed, but does not authorize a replacement or a second publish. A mismatch is unrecoverable for that version: stop, investigate, and prepare a new version through Changesets after review. Do not automatically change tags.
3. If the version is affirmatively absent and the original revision is still current `main`, dispatch Release with `reuse_run` set to the **original** run ID. The workflow requires a completed first-attempt `release.yml` dispatch in this repository on that same default-branch SHA, with success or failure conclusion. It downloads only that run's exact artifact name, verifies revision, SHA-512, and source metadata, and tests the existing tarball without building or packing. The publisher downloads the original artifact again. A retry run does not create a replacement artifact, so use the original run ID for later retries too.
4. If the artifact is missing, deleted, expired, corrupt, or from another revision, stop. If `main` has advanced, this design also refuses the retry. It has no rebuild fallback or local-artifact upload path. Investigate the registry result, then prepare a new version from the reviewed current source when appropriate.

The automated lookup first requires a **successful** native `npm view NAME versions --json` from the public npm registry. Only a nonempty array of valid version strings that excludes the target permits publication. Network, TLS, authorization, API, E404, empty, malformed, or unfamiliar responses stop the workflow. A failed lookup never means “version missing”. This deliberately requires an existing bootstrapped package. Failures are not retried as writes.

Actions artifacts are immutable within the original run; repository administrators can still delete artifacts or runs. Retention is bounded by repository settings. The artifact service, run-history checks, permissions, environment reviews, and actual registry races need authorized GitHub verification. The local receipt is a byte/source check, not an independent build attestation. npm provenance identifies the publishing workflow invocation and source repository; a retry uses the original artifact from the recorded run rather than claiming it rebuilt those bytes. Record both run IDs during release review.

## Primary references

- [Changesets getting started](https://changesets.dev/guide/getting-started) and [configuration](https://changesets.dev/guide/config).
- [npm trusted publishers](https://docs.npmjs.com/trusted-publishers/), including exact identity fields, configuration expiry, allowed actions, and CLI minimums.
- [Creating scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/), [npm login](https://docs.npmjs.com/cli/v11/commands/npm-login), [npm publish](https://docs.npmjs.com/cli/v11/commands/npm-publish), and [provenance](https://docs.npmjs.com/generating-provenance-statements/).
- [GitHub environments and plan limits](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments), [workflow concurrency](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency), [immutable artifact upload and retention](https://github.com/actions/upload-artifact), and [cross-run artifact download](https://github.com/actions/download-artifact).
- [act runner images](https://nektosact.com/usage/runners.html). act exercises only the credential-free check workflow, not this release protocol.
