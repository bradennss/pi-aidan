# Word-count reports

A small React frontend, Go API, and Go worker backed by PostgreSQL. Submit text, watch a pending report complete, and keep its URL to retrieve the durable word count after a refresh. Words are separated by whitespace.

## Run locally

You need [mise](https://mise.jdx.dev/), Docker with Compose, and a native C compiler for Go tooling and the race detector. Start Docker, then run these commands from this directory. The same setup works when you copy the directory out of this repository:

```sh
mise trust
mise install
mise exec -- just dev
```

Open <http://127.0.0.1:5173>. Enter `one two three`, select **Generate report**, and wait for **3 words**. Refresh the page to retrieve the same report. Automatic checks stop after 30 seconds; **Check report again** retrieves the existing report without submitting another job. A request itself times out after five seconds.

`dev` installs frozen Node dependencies, downloads Go modules, starts PostgreSQL, applies application and River migrations, and runs Vite, the API, and the worker in parallel. Local requests use same-origin `/api` through Vite's proxy. The API stays on `127.0.0.1:8080`; this unauthenticated development path is loopback-only. Do not expose Vite or the API to a public network.

Stop the foreground services with Ctrl-C. Run `mise exec -- just stop` to stop this example's local containers in both profiles. Database volumes and reports remain for the next run. Local PostgreSQL uses port `55434`, database `monorepo_dev`, and Compose project `monorepo-reports`. The database credentials in the example are disposable local fixtures. `DATABASE_URL` and `API_ADDR` override native-service defaults; use only local resources with these tasks.

## Try the authenticated gateway

The gateway builds and serves the actual static assets and proxies `/api` to a private Go service. It requires Caddy's native Basic authentication for both UI and API access. Only exact `GET /up`, a non-sensitive database readiness check, is exempt. Neither the API nor the worker nor the gateway database publishes a host port. The development database is in a separate Compose profile.

```sh
mise exec -- docker compose --profile gateway up -d --build --wait --wait-timeout 180
```

Open <http://127.0.0.1:4184> and use username `demo` and password `disposable-local-only`. This fixture uses loopback HTTP, a disposable bcrypt hash, and its own persistent `gateway-data` volume. It is not a public deployment: production HTTPS and SOPS-managed credentials are not configured. Never use these credentials for production or expose this HTTP gateway publicly.

Stop it with `mise exec -- docker compose --profile gateway down`. This preserves both local volumes. Avoid running the gateway demo and browser tests together: they deliberately use the same loopback port.

## Change and verify

```sh
mise exec -- just format
mise exec -- just generate
mise exec -- just check
mise exec -- just build
mise exec -- just test-integration
mise exec -- just test-race
mise exec -- pnpm exec playwright install chromium
mise exec -- just test-browser
```

`check` validates frontend types, lint, unit tests, formatting, sqlc output, Compose configuration, Go vet, and Go tests. Formatting is owned by this example; Go formatting and generated-code checks use native Go tooling. `build` creates static assets in `apps/web/dist` and native binaries in `bin`. Use `just api`, `just worker`, or `just web` to run a single service after `just setup`.

Database tests skip without `TEST_DATABASE_URL`. `test-integration` and `test-race` start the local development database, then create, migrate, and drop only randomly named test databases on that server. They reject non-local targets and unsafe fallbacks. They exercise real Go processes, transactional enqueue, validation, retry, idempotent completion, and worker shutdown/restart without erasing `monorepo_dev`.

`test-browser` builds the gateway stack under the reserved `monorepo-browser` Compose project. Playwright uses real PostgreSQL, API, and worker containers. It stops the worker to observe pending state and the polling deadline, resumes it to complete the report, refreshes after API restart, exercises rejected input and an API outage, and verifies unauthenticated reads and writes are denied without creating reports or jobs. The task removes only this project's containers and volumes on exit. Do not use that reserved project for your own data or run two browser suites concurrently. Browser traces, video, and screenshots are disabled to avoid retaining credentials or submitted text.

## Find the code

`apps/web` owns the interface and API response validation. The root pnpm workspace owns shared frontend checks and Playwright; there is one Go module for both `cmd/api` and `cmd/worker`. No parent repository packages are needed.

`internal/httpapi` accepts `POST /api/reports` with exactly one `text` string and returns `{id,status:"pending"}` with HTTP 202. Text must contain 1 to 10000 Unicode code points after trimming. Invalid UTF-8, NUL, extra or duplicate keys, and requests over 128 KiB are rejected before writes. `GET /api/reports/{id}` returns `{id,status,wordCount}`: pending has a null count; complete has a non-negative integer. Missing or malformed report IDs return 404. The UI keeps the ID in the URL query, validates responses, and stops polling on errors or its deadline.

Goose owns `db/migrations`; sqlc reads those migrations and `db/queries` to generate `internal/db/{db,models,reports.sql}.go`. Edit SQL and regenerate rather than editing generated Go. `internal/db/connect.go` is handwritten. River owns its schema and migration history. Neither service migrates at startup.

`internal/reports` creates the report and River job within one pgx transaction. `internal/jobs` stores a result under its unique report ID using `ON CONFLICT DO NOTHING`. River retries can repeat delivery; exactly-once execution is not promised. Worker shutdown allows three seconds for running jobs before River cancels their contexts. Interrupted work remains available for another worker. Local tests do not establish abrupt host-loss recovery, production hardening, or backups.
