---
name: setting-up-new-projects
description: Use when creating a repository, scaffolding an application or service, or standardizing an existing project's development setup.
---

# Setting up new projects

## Overview

Deliver the smallest working project with reproducible setup and one non-mutating `check` command covering every required check. Select tools by project needs, using the preferred stack where it fits. Generated files are a starting point; successful verification establishes readiness.

## Establish the boundaries

1. Inspect the destination, applicable instructions, Git status, workspace configuration, and existing tooling. Preserve unrelated changes. Ask only about unresolved choices that affect the result or risk.
2. Establish the repository boundary before scaffolding. For a new standalone destination outside an existing repository, defer `git init` until scaffolding and the Beads initialization below are complete. Some Beads versions automatically commit during initialization when Git already exists. Keep services inside the existing repository's topology and use that repository's tracker.
3. Follow established project conventions. For a new stack, check current official documentation for maintained initializers, configuration, and supported options. If network access is unavailable, inspect installed versions and local help; report what you could not confirm.
4. Run the official initializer when it fits, before populating the destination with Beads files. Use a supported option to skip automatic Git initialization when available; otherwise follow the already-initialized Git safeguard below. Keep the lockfile, remove unused demo code and dependencies, and add only the requested functionality. Add CI when requested or already conventional.

## Set up Beads for new projects

Use Beads (`bd`) as the task tracker for new projects. When standardizing an existing repository, use its configured tracker; do not initialize Beads or replace another tracker without authorization. Inspect project instructions and configuration, and use `bd where` to resolve existing Beads workspaces, including redirects and Git worktrees. A missing or inaccessible database is a setup problem, not permission to reinitialize it.

1. Check `command -v bd` and `bd version`. If the CLI is missing for a new project, use the current [official installation instructions](https://github.com/steveyegge/beads#installation) and the supported platform package manager. For example, use `brew install beads` where Homebrew is the established package manager, or `npm install -g @beads/bd` where global npm installs are supported. Check local help and requirements rather than assuming a particular storage backend or external service is needed. Report unavailable installation access, network access, or permissions explicitly.
2. Inspect `bd init --help` and the installed version's initialization side effects. For a new standalone project outside any Git repository, initialize before `git init`: run `BEADS_DIR="$PWD/.beads" bd init --non-interactive --skip-agents --skip-hooks` at the project root when these flags are supported, then initialize Git. The explicit directory supports Git-free initialization. The skip flags avoid generated agent integrations, instruction changes, and Git hooks, but do not prevent automatic Git commits. If a scaffold already initialized Git, use a documented commit-free option supported by that version or report the blocker and ask before allowing the initialization commit. Preserve existing hooks and instructions; do not force reinitialization, change global Git settings, configure remotes, or install integrations for unrelated agents. Do not silently select stealth mode or bypass Git to evade these safeguards.
3. Run `bd where` and `bd prime` to confirm the selected workspace is usable. Inspect existing issues before creating or claiming the setup work. Keep actionable task status, dependencies, blockers, and progress in Beads. Close the setup issue only after the required project checks and applicable end-to-end verification succeed. Keep useful plans and design documents without maintaining competing status checklists.

Treat CLI and database failures as explicit blockers to tracker setup or use. Do not silently substitute Markdown TODO lists. Beads workflow output does not authorize Git commits, pushes, destructive operations, or unrelated work. Follow the user's scope and existing project instructions.

## Choose a coherent toolchain

Use these defaults when the project has no established choices. Confirm current configuration before installing tools; avoid overlapping tools without a framework requirement. For existing projects, improve the relevant setup without replacing established tooling unless migration is authorized.

Prefer Mise for pinned tool versions and reproducible tasks in `mise.toml`. Keep ecosystem-native dependency management, lockfiles, and scripts, and delegate to them from Mise rather than maintaining duplicate implementations. Expose development and verification through `mise run dev` and `mise run check` where applicable. Pin maintained tool versions and document installation and trust requirements.

Use Docker Compose for local backing services and containerized development when useful. Include health checks, persistent development volumes where needed, and documented startup, migration, seed, and shutdown tasks. Use isolated local credentials and ports. A library or local assistant installation without services does not need Compose.

| Ecosystem | Defaults |
| --- | --- |
| TypeScript | pnpm, strict TypeScript, ESLint, Prettier, framework-compatible test runner |
| Python | uv, Ruff, strict Pyright, pytest |
| Rust | Cargo, rustfmt, Clippy with warnings denied, built-in tests |
| Go | Modules, gofmt, go vet, Staticcheck, built-in tests |
| Other | Maintained official recommendations |

## Select CI and release scope

| Project | Preferred release and operations path |
| --- | --- |
| Publicly deployed application, including a hosted API | SemVer, release-please, GHCR, staging and production, Kamal, OpenTofu, Cloudflare DNS, Ansible |
| Library, SDK, CLI, or other open source package | SemVer, release-please, ecosystem-native package or binary publishing, consumer compatibility checks |
| Game server, assistant installation, or specialized tool | Only the applicable tools and operational pieces; no automatic web application infrastructure |

Public source availability does not make a project a deployed application. For existing projects, preserve the current release scheme and infrastructure unless migration is authorized.

Prefer GitHub Actions for applicable CI/CD. Run the same Mise verification tasks locally and in CI. Pin third-party actions to reviewed commit SHAs, minimize token permissions, and keep privileged release/deployment jobs separate from untrusted pull-request code. Cancel superseded validation jobs, but serialize releases, state operations, and deployments without canceling in-flight mutations.

Cache dependency downloads using lockfile, OS/architecture, and toolchain identity. Use frozen lockfile installs; a cache hit never replaces verification. Use BuildKit layer caching through GitHub Actions or a registry, scoped per image/platform, with multi-stage Dockerfiles, stable dependency layers, and a small `.dockerignore`-filtered context. Parallelize independent checks, avoid redundant builds, and avoid unnecessary multi-architecture builds. Keep secret material out of caches and image layers; use build secret mounts when needed. Verify cache permissions and trust boundaries against current documentation.

### Versioning and release automation

Default new versioned projects to [SemVer](https://semver.org/). Document the public compatibility contract, initial version, prerelease policy, and breaking changes. Preserve established versioning unless migration is authorized. Replace scaffold placeholder versions consistently through supported toolchain commands without incidental commits or tags. Never reuse a published version.

Prefer release-please release PRs, version updates, tags, and changelogs driven by Conventional Commits. For monorepos, use manifest configuration with explicit component paths, release types, and independent or coordinated versioning chosen for the dependency graph. Account for shared code and dependency changes in affected component versions. Document squash-merge commit expectations and release permissions. Setup does not authorize publishing, tagging, or deploying.

Use release-please's actual release-created outputs to gate publication: the root component output for a single project and per-path outputs or `paths_released` for a monorepo. Do not gate solely on the aggregate release flag, a source path diff, or a merge to main. Release-please does not publish packages or images itself. Handle GitHub token event suppression explicitly: downstream jobs in the same workflow can consume outputs; workflows triggered by bot-created PRs or releases need an appropriately scoped GitHub App token or another documented trigger strategy. Ensure release PR checks actually run.

### Public application images and deployment

1. Validate pull requests without publishing release images. After an authorized release, check the component's version and existing GHCR artifact. Build a new image only for a new application version, from its exact released source. Reuse an existing immutable image on retry; reject attempts to replace it with different bytes. Security or base-image rebuilds require a new application version too.
2. Record the release version, source revision, image digest, and deployment identity. Publish only released deployable components, not every monorepo package. Keep unchanged services on their recorded images. Keep environment-specific configuration and secrets outside the image.
3. Promote the same recorded image digest through staging and production. Use GitHub environments with scoped secrets, branch restrictions, and approvals where supported; check plan, repository visibility, permissions, and feature availability first. If unavailable, use separate credentials, protected workflow/branch controls, and an explicit authorized promotion step. Document any weaker isolation; separate trusted runners or manual promotion may be necessary.
4. Use Kamal destinations for staging and production on Ansible-configured VPS hosts. Kamal builds and pushes by default: use the documented skip-build/push deployment path (`--skip-push`) and explicit released version. Ensure its version tag resolves to the recorded immutable digest before each rollout, including retries and rollback. Verify selected Kamal version behavior rather than assuming it accepts a digest as a version.
5. Verify staging health and the public HTTPS user path before production promotion, then verify production. Include backing-service effects, monitoring, backups and restore tests, and rollback to a previously verified image. Plan backward-compatible database migrations; an image rollback does not undo data changes.

### Infrastructure and encrypted repository state

Use OpenTofu for every provisionable resource supported by maintained providers, including VPS resources, firewalls, and Cloudflare DNS. Verify provider coverage and permissions; document unavoidable manual bootstrap steps. Use Ansible for idempotent host configuration: restricted SSH and administration, firewall policy, updates, Docker prerequisites, users, and backup/monitoring setup as applicable. Give each resource one owner; avoid competing OpenTofu, Ansible, and Kamal configuration. Configure authenticated origin TLS and expose only required ports.

Keep separate staging and production resource identities, credentials, and encrypted state. Use OpenTofu's supported state and plan encryption with enforcement enabled for new state. Store the encryption passphrase as an age-encrypted secret, decrypting only for the operation. OpenTofu encryption is separate from age; do not assume age is a built-in key provider. Keep plaintext state, backup state, saved plans, and `.terraform/` out of Git and ordinary artifacts. Migrate existing state only through a documented, authorized procedure.

Git history is not a distributed state lock. Before enabling apply, establish one exclusive writer across CI and manual operations, fetch the latest authoritative encrypted state under that lock, and plan against it. Serialize the complete read/plan/apply/persist sequence; CI concurrency alone does not lock manual applies. Persist the resulting ciphertext through an authorized, guarded Git update and verify it is durable before allowing another operation. Never merge ciphertext or force-push around a conflict. Branch protection and state-write permissions need an explicit design, not an automatic bypass.

Capture changed state even after a partial apply failure. If persistence fails after resources change, stop dependent deployment, retain a durable encrypted recovery copy, block subsequent applies, and report the recovery steps. Reconcile infrastructure and the latest state before resuming; do not reapply the stale repository copy. Establish recovery storage and key backup before the first mutation, and test restore. Do not silently replace repository state with a remote backend.

### Secrets and bootstrap

Store secrets in the repository encrypted with age, directly or through SOPS with age recipients. Commit public recipient configuration and ciphertext only. Keep age private keys and other secrets that cannot live under age encryption in a gitignored repository-root `.env` with restrictive permissions. Include a value-free `.env.example`; verify `.env` is ignored before adding credentials. Document explicit loading into the selected tools without printing values.

Provision CI's decryption identity separately through protected GitHub secrets or a trusted runner; a developer's `.env` is not automatically available in CI. Reconstruct a restrictive temporary `.env` only when needed, and remove it after use. Scope decryption and deployment access by environment, keep keys unavailable to untrusted PRs, and avoid printing decrypted tool outputs. Document recipient changes, rotation, revocation limits for Git history, and an independently recoverable key backup. Missing secure bootstrap access blocks deployment; committing the key is not a fallback.

### Open source packages

Publish libraries and tools through their ecosystem's registry or release assets. Test the packed artifact from a consumer project and across supported runtimes; check exports, types, API compatibility, licensing, and included files. Use release-created gates, immutable versions, least-privilege permissions, trusted publishing where supported, and provenance or signed checksums appropriate to the ecosystem. Retry publication by checking what already exists, not overwriting a released artifact. Do not add GHCR images, staging/production services, VPS provisioning, or application deployment jobs unless the package has an actual operational need.

## Define the verification contract

Expose focused commands for formatting validation, linting, type checking, tests, and build wherever applicable. The aggregate `check` command runs **all** applicable checks, stops on failure, and leaves source files unchanged. Keep formatting fixes in a separate command. Configure Markdown formatting to disable automatic prose wrapping: set Prettier's `proseWrap` to `"never"`, or use the equivalent setting in the chosen formatter. Configure checks to fail on warnings where supported.

For a TypeScript project with configured Prettier, ESLint, TypeScript, and Vitest:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "eslint . --max-warnings 0",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "build": "tsc",
    "check": "pnpm run format:check && pnpm run lint && pnpm run typecheck && pnpm test && pnpm run build"
  }
}
```

Use the framework's build command when it provides one. Expose this aggregate through `mise run check` when using Mise, without copying or omitting checks. Mise task dependencies can run concurrently; use explicit ordered steps where one check depends on another. Keep deployment, publication, infrastructure mutation, and formatting fixes outside `check`. Add meaningful tests for the scaffold's observable behavior; confirm tests are discovered and remove settings that pass with zero tests.

## Document and hand off

1. Write concise, repository-specific `AGENTS.md` guidance: purpose, layout, exact commands, non-obvious conventions, the selected versioning scheme and release rules, generated files, environment requirements, and external services. For Beads-enabled projects, document how to load context with `bd prime`, inspect and claim issues, record dependencies and blockers, and close verified work. Identify Beads as the task-status source of truth while retaining useful design documents. Preserve existing guidance and distinguish verified commands from blocked ones.
2. Create `CLAUDE.md` as a relative symlink to `AGENTS.md`. Preserve existing files and unexpected links; ask before replacing them. Verify the target with `test -L CLAUDE.md` and `test "$(readlink CLAUDE.md)" = AGENTS.md`. If symlinks are unsupported, report the limitation instead of copying the file.
3. Run every required check, fix failures, then rerun the complete `check` command. Use verifying-end-to-end for applicable public-interface and backing-service verification.
4. Report what works, the commands actually run, and remaining blockers. Missing dependencies, credentials, or services leave affected verification blocked.

## Common mistakes

A separate passing build does not make `check` complete. Include it in the aggregate command. A successful initializer or an empty test run does not establish working behavior. Preserve team guidance rather than replacing it to satisfy the symlink convention.
