---
name: setting-up-new-projects
description: Use when creating a repository, scaffolding an application or service, choosing a language or toolchain, or standardizing an existing project's development setup.
---

# Setting up new projects

## Approach

Deliver a maintainable, reproducible setup for the agreed scope. Use brainstorming to establish how much functionality, polish, automation, and operational support the user wants. Select the relevant categories from the preferred-stack tables below, then configure those pieces properly. Use the preferred choices for new work unless there is a concrete reason to depart. Keep established project conventions unless migration is authorized.

Simplicity comes from selecting the right scope and using supported capabilities. It does not mean omitting tests, leaving setup incomplete, or deferring essential safety work. A small script, package, or local installation can still have a small setup.

## Establish the boundaries

1. Inspect the destination, applicable instructions, Git status, and existing tooling. Preserve unrelated work and follow the repository's topology and conventions.
2. Identify what needs to run, who will use it, and whether it needs services, publication, or deployment. Make routine choices independently. Ask about unresolved choices that materially affect scope, cost, or risk.
3. Use a maintained official initializer when it fits. Check current documentation or installed help for the options you need. Keep lockfiles and remove unused demo code. Avoid incidental commits or changes to global settings.
4. Add the requested functionality before expanding the surrounding setup. Preserve working tooling and infrastructure unless migration is authorized.

## Preferred project stack

Use the following preferences as defaults for new work in the applicable category. Preserve established tooling, versioning, and infrastructure unless migration is authorized. Choose a language and toolchain for the actual workload, ecosystem, and maintenance needs. When departing from an applicable preference, briefly explain the concrete reason rather than treating all choices as interchangeable.

### Languages and toolchains

| Need | Preferred choice | When to use it |
| --- | --- | --- |
| Web applications and JavaScript ecosystem work | TypeScript, pnpm, strict types, ESLint, Prettier, framework-compatible tests | Browser code, Node.js services, and packages in that ecosystem |
| Scripting, automation, and data work | Python, uv, Ruff, Pyright, pytest | Python libraries and workflows; automation beyond simple shell commands |
| Standalone services and command-line tools | Go, modules, gofmt, go vet, built-in tests | Work benefiting from straightforward deployment as a compiled binary |
| Systems and performance-sensitive components | Rust, Cargo, rustfmt, Clippy, built-in tests | Work needing Rust's performance, memory safety, or ecosystem |
| Small command glue | Shell and native tool commands | Short orchestration without substantial application logic |

### Tooling and operations

| Need | Preferred choice | When to use it |
| --- | --- | --- |
| Tool versions and shared tasks | Mise over native package scripts and commands | New maintained projects needing reproducible tools and a shared task interface |
| Local backing services | Docker Compose | Development needs databases or other services |
| Continuous integration | GitHub Actions | Shared or maintained repositories needing automated checks |
| Versioning and release automation | SemVer, release-please, independent versions per app | Versioned packages or applications with recurring releases |
| Package publishing | Ecosystem-native registry and tooling | Distributing a library, SDK, or CLI |
| Container images | GHCR | Distributing containerized services |
| Containerized VPS deployment | Kamal | Deploying applications that fit its supported workflow |
| Host configuration | Ansible | Repeatable configuration of managed hosts |
| Provisioning and DNS | OpenTofu, Cloudflare DNS | Managing infrastructure and DNS through supported providers |
| Encrypted repository secrets | age or SOPS with age | Secrets need to be stored encrypted in Git |
| Runtime and CI secrets | Platform secret stores, protected CI secrets, ignored local environment files | Supplying secrets without committing plaintext |
| Task tracking | Beads | New projects with ongoing multi-step work that benefits from persistent tracking |

Use brainstorming to establish which categories the project needs. Once selected, configure them completely for the agreed scope. Libraries, local tools, game servers, and hosted applications have different needs; the table does not require every project to adopt every category. Small scripts can use native commands without a full project toolchain.

## Configure the selected tools

Prefer Mise for reproducible tool versions and tasks in new maintained projects. Keep ecosystem-native dependency management, scripts, and checks underneath it instead of duplicating their implementations. Preserve an already adequate established task interface. Small standalone scripts may use native commands directly.

Use Docker Compose when local backing services are needed. Document startup and shutdown, provide readiness checks, and use safe development credentials. Projects without services do not need Compose.

Configure formatting, linting, type checking, tests, and builds as applicable to the selected language and deliverable. Keep lockfiles and document tool versions and installation. Avoid overlapping tools and custom wrappers around capabilities the tools already provide.

Use the existing task tracker. In Beads-enabled projects, resolve the workspace with `bd where`, load context with `bd prime`, and follow project conventions. Prefer Beads for new projects with ongoing multi-step work that benefits from persistent tracking. A one-off script or installation does not need a tracker. Inspect initialization side effects before running it, especially changes to Git history, hooks, or instructions. Tracker setup should not become a prerequisite for unrelated implementation work.

## Add CI and releases when useful

Use GitHub Actions for new shared or maintained repositories needing automated checks. Run the same checks locally and in CI with reproducible dependency installation. Use least-privilege credentials, keep secrets away from untrusted pull requests, and add caching where it saves meaningful time.

Prefer SemVer and release-please for versioned packages and applications with recurring releases. Use ecosystem-native publishing and test the packaged artifact from a consumer's perspective. Preserve established versioning. Never overwrite a published version, and do not publish or tag merely because a workflow has been configured.

For hosted applications, choose a deployment path that fits the service and its operator. Prefer GHCR and Kamal for containerized VPS applications that fit their supported workflow, Ansible for repeatable host configuration, and OpenTofu with Cloudflare for provisioned resources and DNS. Use a native runtime or managed platform when it better fits the actual service, and explain that choice briefly. Local tools, libraries, and game servers do not automatically need web application infrastructure.

### Application versions, builds, and deployment identity

Default to independent SemVer versions and releases for each deployable app, including apps in a monorepo. Use release-please's supported per-component configuration and release outputs. A release of one app does not release or rebuild the others. Shared code, dependency, or build-input changes must be accounted for in each affected app's release.

Tie deployment identity to the app's released version. Tag its image with that version and record the source revision and immutable image digest. Build and publish a new release image only when that app has a new released version, from its exact released source. Gate publication on that component's release output, rather than an aggregate monorepo release flag or every merge to main. Pull requests can run validation builds without publishing release images.

Reuse the existing artifact for retries, staging-to-production promotion, and rollback. Verify the version resolves to the recorded digest and use the deployment tool's supported path to skip rebuilding or pushing. Never replace a released version with different bytes. Code, dependency, or base-image changes that require a different artifact require a new app version. Leave unchanged apps on their existing versions and images.

For example, releasing `apps/web` as `1.3.0` builds and publishes only the web image. `apps/api` stays on its current version. Promoting web to production tomorrow or retrying its deployment uses the same `1.3.0` digest without rebuilding it.

Verify component-specific release gates, unchanged-app behavior, and artifact reuse on retry when configuring the workflow. Use the release and deployment tools' built-in capabilities instead of creating a custom release framework.

### Operational readiness

Select staging, approval gates, and monitoring according to the consequences of failure. For persistent production data, establish backups and a tested recovery path before relying on the deployment. Verify rollout health and document rollback or recovery, accounting for data changes that an application rollback cannot undo.

## Keep operations straightforward and safe

Favor supported deployment, state backend, locking, and encryption features over building an operational framework. Choose state storage for the actual access and recovery needs; repository-stored state is not a default requirement. For infrastructure changes, protect sensitive state and avoid conflicting writers using the selected tool's supported workflow. If an explicit requirement would need substantial custom machinery, explain the trade-off and propose a simpler supported alternative before building it.

Keep plaintext secrets and sensitive state out of Git, images, caches, logs, and ordinary artifacts. Use the platform's secret store, protected CI secrets, or ignored local environment files as appropriate. Age or SOPS are useful when secrets need to live encrypted in the repository. Store decryption keys separately from the data they unlock. Document access and recovery enough for the project's operator to maintain them.

Confirm destructive or shared-system operations when their scope has not been authorized. Use safe local or disposable resources for setup verification; report unavailable access without treating unrelated work as blocked.

## Verify and document

Expose clear commands for all applicable checks. When several checks are required, provide a non-mutating aggregate `check` command that includes them all and fails on errors. Native commands are sufficient for a small setup with a single check. Keep formatting fixes, publication, deployment, and infrastructure mutation separate from validation. Confirm tests are discovered and cover observable success and relevant failure behavior; an empty test run is not verification.

Run the required checks and exercise the delivered entry point. A local smoke test may fully cover a small CLI; a service with important downstream effects needs evidence of those effects. Use verifying-end-to-end when lower-level checks leave a meaningful user-path or integration gap. Fix failures caused by setup and rerun affected checks. Report unavailable checks and their impact explicitly.

Document installation, development, checks, and non-obvious operational needs in concise repository guidance, including exact verified commands. Add `AGENTS.md` for maintained projects so future agents can find that guidance; preserve existing instructions. A relative `CLAUDE.md` symlink to `AGENTS.md` can avoid duplicate guidance when both tools are used, but it is not required project scaffolding.
