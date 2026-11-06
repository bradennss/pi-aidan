# Report API and worker

A standalone Go module with an HTTP API and a River worker. Submit text, read its
pending status, and retrieve a durable whitespace-separated word count from
PostgreSQL. No frontend or deployment configuration is included.

## Run locally

You need [mise](https://mise.jdx.dev/), Docker with Compose, and a native C compiler
for Go tooling and the race detector. Start Docker before setup. Run these commands
from this directory, including when you copy the example outside this repository:

```sh
mise trust
mise install
mise exec -- just setup
mise exec -- just api
```

In another terminal, run `mise exec -- just worker` from the same directory. The
API listens on `127.0.0.1:8080` by default. PostgreSQL uses loopback port `55434`,
Compose project `monorepo-reports`, database `monorepo_dev`, and a named local
volume. The credentials in `justfile` and `compose.yml` are disposable local
fixtures. No parent repository tools or packages are required.

Submit a report:

```sh
curl --fail-with-body -H 'Content-Type: application/json' \
  -d '{"text":"one two three"}' http://127.0.0.1:8080/api/reports
# {"id":"<report UUID>","status":"pending"}

REPORT_ID='paste-the-returned-id'
curl --fail-with-body "http://127.0.0.1:8080/api/reports/$REPORT_ID"
# {"id":"<report UUID>","status":"complete","wordCount":3}
```

Set `REPORT_ID` to the returned ID. Before the worker finishes, GET
returns `"status":"pending","wordCount":null`. A missing or malformed ID returns
404. POST accepts exactly one `text` string, trims Unicode whitespace, and requires
1–10000 Unicode code points after trimming. Requests are limited to 128 KiB, including JSON escaping and surrounding
whitespace; malformed JSON, wrong types, extra or duplicate keys, invalid UTF-8, and NUL are
rejected with 400 before database writes. `GET /up` checks database connectivity
and returns no report data; an unavailable database returns 503.

This API has no authentication. Keep it loopback-only. Do not publish its port or
bind `API_ADDR` to a public interface. An authenticated gateway must be implemented
before exposing mutations. `API_ADDR` and `DATABASE_URL` override local defaults;
use only local resources with these recipes.

Stop API and worker with Ctrl-C, then run `mise exec -- just stop` to stop this
example's database. The volume and reports remain for the next `just setup`.

## Change and verify

```sh
mise exec -- just format
mise exec -- just generate
mise exec -- just check
mise exec -- just build
mise exec -- just test-integration
mise exec -- just test-race
```

`check` runs formatting validation, sqlc generated-code comparison, `go vet`, and
`go test ./...`. Without `TEST_DATABASE_URL`, database integration tests explicitly
skip. `test-integration` and `test-race` start the local dependency and run all tests
against real PostgreSQL. To run Go directly after `just db-up`:

```sh
mise exec -- env \
  TEST_DATABASE_URL=postgresql://monorepo_local:disposable-local-only@127.0.0.1:55434/monorepo_dev \
  go test ./...
# Use the same environment for: go test -race ./...
```

Tests require the dedicated local role's database-creation permission. They accept
only this example's loopback server, create randomly named `monorepo_test_*`
databases, run both migration tools, build race-instrumented API/worker binaries,
exercise real HTTP and job execution, and drop their own databases. Bounded polling
and subprocess cleanup keep failures contained. Tests do not erase `monorepo_dev`.

## Source ownership

`cmd/api` and `cmd/worker` are separate executables. `internal/httpapi` validates
requests; `internal/reports` creates a report and calls River `InsertTx` within the
same pgx transaction. `internal/jobs` defines the report job and stores results
under a unique report ID. `strings.Fields` defines whitespace-separated words.

Goose owns `db/migrations`; sqlc reads those migrations and `db/queries` to generate
`internal/db/{db,models,reports.sql}.go`. Edit SQL and regenerate rather than editing
generated Go. `internal/db/connect.go` is handwritten pool setup. River owns its
schema and migration history through its pinned CLI. `just db-migrate` explicitly
runs both migration tools; neither service migrates at startup.

River uses its native retry policy. Delivery can repeat; completion uses the
result table's report-ID primary key and `ON CONFLICT DO NOTHING`. Worker shutdown
allows three seconds for running jobs, then cancels their contexts through River's
soft-stop lifecycle. Interrupted work remains available for another worker. The
integration tests induce a real constraint failure and use River's supported
`JobRetry` to bypass backoff, reexecute completed work, and hold a database lock to
make shutdown/restart deterministic. They do not establish abrupt host-loss
recovery timing, exactly-once execution, or production readiness.
