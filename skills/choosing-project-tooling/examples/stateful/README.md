# Persistent tasks

A small Next.js task tracker backed by PostgreSQL and Drizzle. Add tasks, mark them complete, and reload without losing your work. Caddy protects the containerized app with HTTP Basic authentication.

## Run locally

Install [mise](https://mise.jdx.dev/getting-started.html), activate it in your shell, and start Docker with Compose v2. From this directory:

```sh
mise trust
mise install
just install
just dev
```

Open <http://127.0.0.1:3000>. Development runs Next.js directly on loopback and starts and migrates its PostgreSQL database in Compose. This local development URL has no authentication. Do not expose it through a public interface or tunnel.

Tasks live in the `stateful-task-tracker_dev-data` Docker volume. Run `just stop` to stop this example's services without deleting tasks. If port 3000, 55432, 55433, or 8088 is occupied, stop the conflicting local service first. Run one copy of this example at a time.

## Contribute

```sh
just check
just build
```

`just check` runs types, lint, formatting checks, and service tests against real disposable PostgreSQL. Apply formatting with `just format`. Test fixtures use a separate `stateful_test` database on loopback port 55433, never the development database. Tests remove only their own task rows.

Review generated SQL before applying schema changes:

```sh
just db-generate
just db-migrate
```

Start the development database with `just db-up` if it is stopped. `just db-migrate` uses the local development database unless you explicitly supply `DATABASE_URL`. Migrations are explicit, not an application startup side effect. Application rollback does not undo a database migration.

## Exercise the access boundary

Install Chromium once, then run the integration and browser checks:

```sh
just install-browser
just test-integration
just test-browser
```

On Linux, install [Playwright's system libraries](https://playwright.dev/docs/intro#system-requirements) separately. These commands build and run the real Next.js app and Caddy gateway with PostgreSQL. Integration tests deny unauthenticated reads and replays of real writes, reject tampered mutations, interrupt and reconnect the database, and restart the app. Browser tests create, complete, reload, and reopen tasks on desktop and mobile-sized Chromium.

The gateway remains at <http://127.0.0.1:8088> after tests for inspection. Use username `stateful-test` and password `disposable-gateway-only`. These are public, disposable test fixtures, as are the local database credentials in Compose. Never use them for real access or production data. The test commands recreate the app and gateway to pick up changes, retain database volumes, and must not run concurrently. `just stop` stops everything when you finish.

`GET /up` is the only unauthenticated gateway route. It queries PostgreSQL and returns only a readiness status, never tasks or database errors. All other routes and methods, including Server Actions and React Server Component requests, pass through Caddy's built-in authentication. The app container has no published port. Only the gateway is the application entry point; database ports are loopback-only local tooling access.

## Production boundary

This Compose setup is local development and verification, not a production deployment system. Caddy requires `BASIC_AUTH_USER` and `BASIC_AUTH_HASH`; generate password hashes with [Caddy's native command](https://caddyserver.com/docs/command-line#caddy-hash-password). There is no application account, cookie, or session system. Authentication relies on every public request passing through the gateway and on keeping the app and database private.

Basic authentication over plain HTTP is appropriate here only for disposable loopback fixtures. Production must provide HTTPS through Kamal to the gateway, a private app/database network with no unauthenticated bypass, and a real operator credential supplied through SOPS. Never deploy the local Compose credentials. The required production host is Debian 13. Host setup, infrastructure, deployment, production credentials, migration compatibility, backups, and recovery remain separate work. This example does not establish production readiness or disaster recovery.

Implementation references: [Next.js Server Actions](https://nextjs.org/docs/app/guides/forms), [standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output), [Drizzle PostgreSQL](https://orm.drizzle.team/docs/get-started-postgresql), [Drizzle migrations](https://orm.drizzle.team/docs/migrations), [node-postgres pooling](https://node-postgres.com/features/pooling), [PostgreSQL image storage](https://hub.docker.com/_/postgres), and [Caddy Basic authentication](https://caddyserver.com/docs/caddyfile/directives/basic_auth).
