---
name: setting-up-new-projects
description: Use when creating a repository, scaffolding an application or service, or standardizing an existing project's development setup.
---

# Setting up new projects

## Approach

Deliver the smallest working setup that serves the project's current needs. Use established tools and supported configuration. Treat the options below as a menu; use judgment about which ones earn their place. A small script, package, or local installation may need little beyond its native toolchain and a few documented commands.

## Establish the boundaries

1. Inspect the destination, applicable instructions, Git status, and existing tooling. Preserve unrelated work and follow the repository's topology and conventions.
2. Identify what needs to run, who will use it, and whether it needs services, publication, or deployment. Make routine choices independently. Ask about unresolved choices that materially affect scope, cost, or risk.
3. Use a maintained official initializer when it fits. Check current documentation or installed help for the options you need. Keep lockfiles and remove unused demo code. Avoid incidental commits or changes to global settings.
4. Add the requested functionality before expanding the surrounding setup. Preserve working tooling and infrastructure unless migration is authorized.

## Choose tools by need

Prefer the project's native package manager, scripts, and checks. Mise can help with pinned tool versions or a shared task interface; it does not need to wrap an already adequate setup. Docker Compose is useful for local backing services, but projects without services do not need it.

For a new toolchain, these are reasonable starting points:

| Ecosystem | Options |
| --- | --- |
| TypeScript | pnpm, strict TypeScript, ESLint, Prettier, framework-compatible tests |
| Python | uv, Ruff, Pyright, pytest |
| Rust | Cargo, rustfmt, Clippy, built-in tests |
| Go | Modules, gofmt, go vet, built-in tests |
| Other | Maintained ecosystem recommendations |

Select checks that catch meaningful problems in the actual project. Avoid overlapping tools, duplicate task implementations, and custom wrappers around capabilities the tools already provide.

Use the existing task tracker. In Beads-enabled projects, resolve the workspace with `bd where`, load context with `bd prime`, and follow project conventions. For new projects, add Beads or another tracker when the work benefits from it or the user requests it. Inspect initialization side effects before running it, especially changes to Git history, hooks, or instructions. Tracker setup should not become a prerequisite for unrelated implementation work.

## Add CI and releases when useful

GitHub Actions is a good default when CI is needed. Run the same native checks locally and in CI. Use least-privilege credentials, keep secrets away from untrusted pull requests, and add caching where it saves meaningful time.

For published packages, consider SemVer and release-please when release automation is worthwhile. Use ecosystem-native publishing and test the packaged artifact from a consumer's perspective. Preserve established versioning. Never overwrite a published version, and do not publish or tag merely because a workflow has been configured.

For hosted applications, choose a deployment path that fits the service and its operator. GHCR and Kamal can suit containerized VPS applications; Ansible can configure hosts; OpenTofu can manage provisioned resources and DNS. A simple service may be better served by its native runtime or a managed platform. Local tools, libraries, and game servers do not automatically need web application infrastructure.

Use immutable release artifacts and reuse them across promotion or retries where practical. Add staging, approval gates, monitoring, backups, and rollback procedures according to the consequences of failure. Account for data changes that an application rollback cannot undo.

## Keep operations straightforward and safe

Favor supported deployment, state backend, locking, and encryption features over building an operational framework. Choose state storage for the actual access and recovery needs; repository-stored state is not a default requirement. For infrastructure changes, protect sensitive state and avoid conflicting writers using the selected tool's supported workflow. If an explicit requirement would need substantial custom machinery, explain the trade-off and propose a simpler supported alternative before building it.

Keep plaintext secrets and sensitive state out of Git, images, caches, logs, and ordinary artifacts. Use the platform's secret store, protected CI secrets, or ignored local environment files as appropriate. Age or SOPS are useful when secrets need to live encrypted in the repository. Store decryption keys separately from the data they unlock. Document access and recovery enough for the project's operator to maintain them.

Confirm destructive or shared-system operations when their scope has not been authorized. Use safe local or disposable resources for setup verification; report unavailable access without treating unrelated work as blocked.

## Verify and document

Expose clear commands for the checks the project needs. A non-mutating aggregate `check` command is useful when several checks need to run together; native commands are sufficient for smaller setups. Keep formatting fixes, publication, deployment, and infrastructure mutation separate from validation. Check that tests exercise real behavior and are actually discovered.

Run the required checks and exercise the changed entry point at an appropriate depth. A local smoke test may suffice for a small CLI; a service with important downstream effects needs evidence of those effects. Use verifying-end-to-end when it helps close that gap. Report what ran and any remaining uncertainty.

Document installation, development, checks, and non-obvious operational needs in concise repository guidance. Add `AGENTS.md` when useful; preserve existing instructions. A relative `CLAUDE.md` symlink to `AGENTS.md` can avoid duplicate guidance when both tools are used, but it is not required project scaffolding.
