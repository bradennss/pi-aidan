---
name: project-stack
description: Choose tools, libraries, and project configuration when starting a project or adding tooling, infrastructure, CI, or deployment to an existing one. Provides defaults and self-contained reference projects to adapt.
---

# Project stack

Read project instructions, manifests, lockfiles, and deployment configuration first. Use these defaults to fill gaps; preserve established conventions unless asked to change them.

For relevant examples, read the task file first, then adapt the configuration and source needed. Check official documentation for chosen versions; example pins may be outdated.

Add only what's needed, run project checks, and exercise changed behavior. Ask permission before provisioning paid infrastructure or deploying.

## Development defaults

- TypeScript packages: pnpm with a committed lockfile.
- Tool versions: mise with pins in `mise.toml`.
- Local and CI tasks: shared commands in a `justfile`.
- Formatting: language-native formatters; Prettier for Markdown with `proseWrap: "never"`.
- Linting: strict or pedantic rules with warnings as failures.
- Versioning: SemVer for applications and packages.
- Local applications and dependencies: Docker Compose.
- CI and releases: GitHub Actions, with act for local workflow testing.

Keep lint exceptions narrow and explain them. Align release tags and artifact versions. Verify hosted-runner-specific behavior in GitHub Actions.

## Runtime and deployment defaults

- Persistent data: PostgreSQL.
- Messaging or queues, only when needed: NATS and JetStream, with durable consumers for queued work.
- Infrastructure: OpenTofu.
- Host configuration: Ansible before application deployment.
- Deployment: Kamal to a hardened VPS.
- External deployment credentials: SOPS with age.
- Local configuration: an ignored `.env`.

Commit encrypted OpenTofu state and keep its key recoverable outside Git. Serialize applies and commit updated state even after partial failure. Generate service credentials once and retain them in encrypted state across deployments. Commit only safe configuration examples and encrypted secrets.

## Example catalog

Examples are self-contained starting points. Omit anything the target project doesn't need.

| Example | Use when | Start here |
| --- | --- | --- |
| Rust stateful API | A Rust HTTP API needs PostgreSQL and deployment to an OVH VPS behind Cloudflare. | [Tasks](examples/rust-stateful-api/justfile), [libraries](examples/rust-stateful-api/Cargo.toml), [source](examples/rust-stateful-api/src/main.rs), [infrastructure](examples/rust-stateful-api/infra/main.tf), [host configuration](examples/rust-stateful-api/ansible/playbook.yml), [deployment](examples/rust-stateful-api/config/deploy.yml) |
