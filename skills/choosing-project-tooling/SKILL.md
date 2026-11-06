---
name: choosing-project-tooling
description: Use when selecting or evaluating languages, frameworks, developer tooling, repository structure, task runners, CI/CD, packaging, releases, infrastructure, deployment, secrets, or operational workflows for new or existing projects, including scaffolding projects, adding services, deploying third-party software, and publishing libraries.
---

# Choosing project tooling

Use these opinionated defaults for open choices. Inspect existing conventions first; preserve them and obtain approval for consequential migrations. Fit the setup to the workload and configure the selected pieces completely for the agreed scope. For a narrow CI or deployment repair, apply only relevant guidance without rebuilding the project.

## Tooling and tasks

Pin developer and operational tools with mise, expose tasks with just, and manage Node/TypeScript dependencies with pnpm and committed lockfiles. Use existing ecosystem-native tools underneath. Prefer ordinary configuration and short recipes; custom wrappers, scripts, or orchestration need a concrete justification.

Keep non-mutating `just check` separate from mutating `just format`. GitHub Actions calls the same local tasks. Pin act through mise and expose `just ci-test` for checks/builds with a documented compatible runner image, without publishing, deployment, or production secrets. Source/tool pins and runner-image compatibility are independent requirements. act cannot establish GitHub permissions, environment protections, concurrency, or identity integrations; verify those on GitHub when authorized.

## Select and adapt a reference

For a concrete setup recommendation or implementation, read one matching README and its relevant linked runbooks before choosing configuration or operational steps. Each example is standalone; adapt its contracts and prerequisites rather than copying every component. Use Docker Compose for warranted local dependencies.

| Workload | Preferred stack and reference |
| --- | --- |
| Browser-only, no backend or persistent data | [Stateless](examples/stateless/README.md): React, Vite, strict TypeScript, Playwright |
| Persistent standalone app | [Stateful](examples/stateful/README.md): Next.js server capabilities, PostgreSQL, Drizzle, Vitest, Playwright |
| Mixed-language durable jobs | [Monorepo](examples/monorepo/README.md): pnpm workspaces, one Go module, standard HTTP router, pgx/sqlc/River, PostgreSQL, established migrations |
| Third-party server | [Minecraft](examples/minecraft/README.md): pinned upstream itzg image/game, private administration, coordinated backups, single world writer |
| Unhosted TypeScript package | [Library](examples/library/README.md): ESM/declarations, tsdown, Vitest, publint, Are the Types Wrong, packed consumer, Changesets, explicit npm trusted-publishing release; no VPS/container stack |

## Deployment and ownership

For VPS workloads, prefer one Debian 13 OVHcloud US/Vint Hill VPS with monthly no-commitment billing and Cloudflare DNS. Verify current catalog, capacity, and sizing. OpenTofu owns resources/DNS, Ansible hosts, and Kamal containers/accessories. Keep ownership distinct.

For VPS deployments, use SOPS/age secrets and OpenTofu-native-encrypted Git state. Bootstrap credentials, protected CI access, and independently recoverable keys precede production work. Production applies are CI-only, manually dispatched, serialized without cancellation, and use current main configuration/state; reject stale requests. Persist encrypted state after partial failure too. If persistence fails, freeze applies and reconcile state before retrying; Git/apply and runner survival are not atomic.

Applications automatically deploy immutable CI-built main images after checks; retries reuse images. Keep infrastructure credentials separate. Third-party upgrades are deliberate, with consistent backups and matching-data recovery. Libraries release explicitly, preserving the tested artifact.

The references provide configuration and local integration paths, not production guarantees. Verify workload-specific user, persistence, failure, and restore boundaries; local checks do not establish live cloud behavior, npm/GitHub identity, or licensed game-client outcomes.
