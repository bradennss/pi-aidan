---
name: project-stack
description: Choose tools, libraries, and project configuration when starting a project or adding tooling, infrastructure, CI, or deployment to an existing one. Provides defaults and self-contained reference projects to adapt.
---

# Project stack

Use these defaults to fill gaps, not to replace a working setup. Before choosing tools, read the project's instructions, manifests, lockfiles, and deployment configuration. Keep its established conventions unless the user asks to change them.

When an example fits the task, start with its task file to understand how the pieces work together. Then read the configuration and source files relevant to the change, and adapt them to the project. Check the official documentation for the versions you choose, since an example's pins may no longer be current.

Add only what the project needs, run its checks, and exercise the behavior you changed. Ask for permission before provisioning paid infrastructure or deploying.

## Development defaults

- Use pnpm for TypeScript packages and commit its lockfile.
- Pin development tools in `mise.toml` with mise. Expose common tasks through a `justfile` so local development and CI use the same commands.
- Use the language's own formatter where available. Format Markdown with Prettier and set `proseWrap: "never"` so the formatter does not reflow paragraphs.
- Enable strict or pedantic lint rules and make warnings fail checks. Keep exceptions narrow and explain why they are needed.
- Use SemVer for applications and packages. Keep release tags and artifact versions aligned.
- Use Docker Compose to run applications and their dependencies locally.
- Run checks and release workflows with GitHub Actions. Use act to exercise workflows locally, while checking behavior that depends on hosted runners in GitHub Actions itself.

## Runtime and deployment defaults

Use PostgreSQL for persistent data. Add NATS and JetStream only when the project needs messaging or queues. For queued work, use durable JetStream consumers.

Manage infrastructure with OpenTofu and configure hosts with Ansible before deploying applications to a hardened VPS with Kamal. Commit encrypted OpenTofu state to the repository and keep its encryption key recoverable outside Git. Serialize applies and commit the updated state even if an apply only partly succeeds.

Generate service credentials once and retain them in encrypted OpenTofu state rather than generating new values on each deployment. Use SOPS with age for external deployment credentials and an ignored `.env` for local configuration. Commit only safe configuration examples and encrypted secrets.

## Example catalog

Each example is a self-contained project. Use it as a starting point and leave out anything the target project does not need.

| Example | Use when | Start here |
| --- | --- | --- |
| Rust stateful API | A Rust HTTP API needs PostgreSQL and deployment to an OVH VPS behind Cloudflare. | [Tasks](examples/rust-stateful-api/justfile), [libraries](examples/rust-stateful-api/Cargo.toml), [source](examples/rust-stateful-api/src/main.rs), [infrastructure](examples/rust-stateful-api/infra/main.tf), [host configuration](examples/rust-stateful-api/ansible/playbook.yml), [deployment](examples/rust-stateful-api/config/deploy.yml) |
