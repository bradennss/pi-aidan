# Stateful Reference Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a standalone Next.js task tracker with persistent PostgreSQL data and recovery configuration.

**Architecture:** Next.js serves the UI and server-side mutations, Drizzle handles SQL access and migrations, and PostgreSQL runs locally in Compose and in production as a Kamal accessory.

**Tech Stack:** Next.js, TypeScript, pnpm, Drizzle, PostgreSQL, Vitest, Playwright, restic/R2, shared operational stack.

**Spec:** `docs/superpowers/specs/2026-11-06-project-tooling-skill-design.md`

## Global Constraints

- All constraints and the shared operational contract in [the parent plan](2026-11-06-project-tooling.md) apply.
- This example is independently runnable; no dependencies on sibling projects or root node_modules.
- No paid provisioning, live deployment, domain changes, credential installation, or npm publication is authorized.

## Review Focus

1. Blank/oversized task input is rejected at the server boundary without inserting data.
2. Restarting app/database preserves existing tasks and completion state.
3. Older app versions remain usable after the example's additive migration.
4. Unauthorized requests cannot mutate the publicly deployed reference.
5. Database restore works into a fresh database rather than overwriting live production.

---

### Task 1: Persistent application and access boundary

**Files:**

- Create beneath `skills/choosing-project-tooling/examples/stateful/`: `package.json`, `pnpm-lock.yaml`, `mise.toml`, `justfile`, `compose.yml`, `drizzle.config.ts`, `next.config.ts`, `tsconfig.json`, `eslint.config.js`, `vitest.config.ts`, `playwright.config.ts`.
- Create: `src/app/{layout.tsx,page.tsx,actions.ts}`, `src/app/up/route.ts`, `src/db/{schema.ts,client.ts}`, `src/tasks/{service.ts,service.test.ts}`, `drizzle/` generated SQL, `test/{browser.spec.ts,persistence.test.ts}`.

**Interfaces:** Task has `id: string`, `title: string`, `completed: boolean`; `createTask(title: string)`, `setTaskCompleted(id: string, completed: boolean)`, and `listTasks()` are server-only operations. Titles trim to 1–200 characters. `DATABASE_URL` configures PostgreSQL; `GET /up` checks readiness. Produces `just dev`, `just check`, `just build`, `just db-migrate`, `just test-integration`, `just test-browser`.

- [ ] Write tests for blank/201-character rejection, create/list/complete, nonexistent ID handling, and persistence after reconnection to real disposable PostgreSQL. Assert invalid requests leave row count unchanged. Observe failures before adding implementation.
- [ ] Implement schema, reviewed SQL migration, server-only service/actions, accessible UI, and health endpoint. Use Compose for local PostgreSQL; no separate backend or Redis.
- [ ] Add a separate Caddy gateway container using its built-in basic authentication and password hashing. Keep Next.js private on the container network; expose only the gateway through Kamal HTTPS. Exempt only the non-sensitive health endpoint. Use one operator credential from SOPS; do not build application accounts, session handling, or password cryptography. Extend Compose with this gateway for production-boundary tests.
- [ ] Write and run integration checks against the local gateway: unauthenticated requests receive 401 and cannot read/mutate data, valid credentials allow normal flows, and health probes do not expose data. Use disposable test credentials, never production secrets.
- [ ] Run `just check && just db-migrate && just test-integration && just build && just test-browser`. Exercise create/complete/reload through the browser against real PostgreSQL.
- [ ] Commit the functional app, local setup, and access boundary.

### Task 2: Deployment, migration compatibility, and database recovery

**Files:**

- Create remaining parent operational contract files beneath `skills/choosing-project-tooling/examples/stateful/`, plus `Dockerfile` and `config/Caddyfile`.
- Create: `test/migration.test.ts`; `ansible/templates/{database-backup.service.j2,database-backup.timer.j2}` using established PostgreSQL/restic commands; `docs/recovery.md`.
- Modify: `justfile` with `backup`, `restore DATABASE_URL`, and authorized deployment tasks.

**Interfaces:** Consumes Task 1's app, database URL, and access boundary. Produces prebuilt image deployment, private persistent PostgreSQL accessory, serialized migration/deployment, and documented backup/restore. Backups never restore over production by default.

- [ ] Write migration compatibility test: populate the previous schema, apply an additive migration, verify rows survive and the previous query shape still works. Observe missing migration failure.
- [ ] Build the Next.js standalone production image. Add PostgreSQL and Caddy gateway accessories, private stable app networking, an explicit migration step, and readiness checks. Use a serialized stop-before-start app replacement so the stable internal address has only one writer/target; document brief deployment downtime rather than promising zero downtime.
- [ ] Implement the parent operational procedure, including R2 backup resources, failure notifications, and application-independent backup credentials. Schedule `pg_dump` plus restic using native commands, restrict temporary dump permissions, and remove dumps after completion.
- [ ] Rehearse backup to a disposable local restic repository, destroy only a task-owned database, restore into a fresh database, and assert task IDs/titles/completion states match. Rehearse a failed backup and verify nonzero status and the configured notification path without sending unauthorized external notifications.
- [ ] Run app/container/infrastructure/Ansible checks, `just ci-test`, partial apply/state recovery rehearsal, and a local failed-release recovery that leaves persistent rows intact. Distinguish this from a live Kamal rollback.
- [ ] Copy outside the repository and rerun frozen install, checks, database/browser tests, and build. Document GitHub, R2, and real VPS boundaries still unverified.
- [ ] Commit the complete reference and recovery instructions.
