# Persistent tasks

Work from this directory. It is an independent Next.js project: do not import tooling or runtime files from sibling examples or the parent repository.

Use mise to install the pinned tools, then `just install`. Docker with Compose v2 is required even for `just check`, because persistence tests use real PostgreSQL. `just dev` starts and migrates the development database before starting loopback-only Next.js.

## Make changes

- Keep database operations server-only in `src/tasks/service.ts`. Server Actions in `src/app/actions.ts` validate form values and return safe errors. Validate titles and mutation IDs before executing writes.
- Generate SQL with `just db-generate`, review it, then apply with `just db-migrate`. Do not edit migrations already applied outside disposable local databases.
- Compose and `justfile` credentials are public local fixtures. Keep app/database access private; `config/Caddyfile` must authenticate every gateway path except `GET /up`. Health responses must not include task data or error details.
- Compose tests restart only this example's app and test database. Never truncate arbitrary databases, remove development volumes, or prune Docker globally. Do not run integration and browser tests concurrently.
- Reuse the installed Arc Button/Input and semantic tokens for UI changes. Preserve visible labels, keyboard access, inline errors, and narrow-screen wrapping.

## Verify

```sh
just check
just db-up
just db-migrate
just test-integration
just build
just test-browser
```

Install Chromium with `just install-browser` before browser checks. On Linux, Playwright's system libraries must be installed separately. `just format` applies formatting; `just check` does not.

For focused service checks, use `DATABASE_URL=postgresql://stateful_local:disposable-local-only@127.0.0.1:55433/stateful_test pnpm test` after `just test-db-up`. Browser configuration targets the real gateway on loopback port 8088, never a mocked backend or a reused development server. Run `just test-browser` to rebuild that topology before focused `pnpm exec playwright test` runs.

Run `just stop` to stop task-owned services while retaining data. Production deployment, SOPS credentials, Debian 13 host provisioning, and backups are outside this example's current boundary. Read the README before changing that boundary.
