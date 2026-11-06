# Working in this example

This directory is an independent Go module. Run commands here with `mise exec --`;
use `README.md` for prerequisites and first-run setup. The only container is a local
PostgreSQL dependency, owned by Compose project `monorepo-reports` on loopback
port 55434. Preserve its volume and unrelated Docker resources.

Use `just format`, `just generate`, `just check`, and `just build`. Run
`just test-integration` and `just test-race` for real persistence and native-process
behavior. Plain `go test ./...` skips database tests without `TEST_DATABASE_URL`;
the README gives the guarded local URL. Tests own and drop only their randomly
named databases. Do not point them at shared or production databases.

Keep the API/worker as separate entrypoints in one module. Use standard-library
HTTP, native pgx transactions, sqlc queries, goose application migrations, and
River's own migrations/lifecycle. No queue wrapper or persistence mocks. Change
`db/queries` and `db/migrations`, then regenerate sqlc output in `internal/db`.
`internal/db/connect.go` is handwritten. A report and its River job must commit
together; duplicate execution must leave one result by report ID.

Preserve POST/GET response contracts and validate input before writes. Keep errors
free of SQL and connection details. The API is unauthenticated and defaults to
loopback; do not expose it publicly. Frontend, authenticated gateway, deployment,
backups, and infrastructure are outside this backend example's current scope.
