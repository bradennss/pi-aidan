# Mixed-Language Monorepo Reference Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a TypeScript frontend, Go API, and Go worker with durable PostgreSQL-backed report jobs.

**Architecture:** One Go module has separate API and worker entry points. River queues jobs in PostgreSQL, sqlc generates typed queries, and independent images deploy through separate Kamal configurations.

**Tech Stack:** React/Vite, TypeScript, pnpm workspaces, Go stdlib HTTP, pgx, sqlc, River, goose, PostgreSQL, shared operational stack.

**Spec:** `docs/superpowers/specs/2026-11-06-project-tooling-skill-design.md`

## Global Constraints

- All constraints and the shared operational contract in [the parent plan](2026-11-06-project-tooling.md) apply.
- This example is independently runnable; no dependencies on sibling projects or root node_modules.
- No paid provisioning, live deployment, domain changes, credential installation, or npm publication is authorized.

## Review Focus

1. Invalid report input never creates a report or job.
2. Worker death after job acceptance leaves retriable durable work.
3. Repeated job execution does not duplicate report results.
4. Mixed service versions can read the additive shared schema during deployment.
5. Private services stay inaccessible publicly; API/frontend still function through the intended boundary.

---

### Task 1: Go API and durable worker

**Files:**

- Create beneath `skills/choosing-project-tooling/examples/monorepo/`: `mise.toml`, `justfile`, `compose.yml`, `go.mod`, `go.sum`, `sqlc.yaml`, `cmd/{api,worker}/main.go`, `internal/{reports,jobs,httpapi,db}/`, `db/{migrations,queries}/`, `test/integration_test.go`.

**Interfaces:** `POST /api/reports` accepts `{"text": string}` with 1–10000 trimmed characters and returns 202 with `{"id": string,"status":"pending"}`. `GET /api/reports/{id}` returns `{"id":string,"status":"pending"|"complete","wordCount":number|null}`; missing IDs return 404. Count whitespace-separated words. Enqueue and report creation share a database transaction. Worker writes results by report ID idempotently. `GET /up` is the API readiness endpoint.

- [ ] Write Go integration tests against real disposable PostgreSQL: valid submission creates one report and one job atomically; blank/oversized text returns 400 without rows; missing report returns 404; completed report contains expected word count. Run `go test ./...` to observe missing implementation failures.
- [ ] Implement migrations with goose, sqlc queries, pgx access, API routing, and River job registration/execution. Use a unique report identity for idempotent completion; do not introduce a general queue wrapper.
- [ ] Add retry/restart integration tests: stop the worker after acceptance, restart it, and await completion with a bounded deadline. Execute equivalent work twice and assert one result. Record how River retries are triggered without production-only test hooks.
- [ ] Run Go formatting/checks, `go test ./...`, and `go test -race ./...` with documented integration setup. Commit the backend and local database setup.

### Task 2: Frontend and complete browser-to-worker path

**Files:**

- Create root `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `playwright.config.ts`, `test/browser.spec.ts`.
- Create `apps/web/{package.json,index.html,vite.config.ts,tsconfig.json,eslint.config.js,src/main.tsx,src/App.tsx,src/App.test.tsx}` beneath this example.
- Modify: example `justfile`.

**Interfaces:** Consumes Task 1's HTTP contract. Browser requests use same-origin `/api`, with Vite proxying locally and the production web server routing to the private API. Produces `just dev`, `just check`, `just build`, `just test-integration`, and `just test-browser`. API and UI share the chosen established access boundary; no public unauthenticated mutation service.

- [ ] Write browser test: submit known text, observe pending state, then await exact completed word count; refresh and retrieve the same report. Add API-unavailable and rejected-input assertions without infinite polling.
- [ ] Implement the small accessible form/status interface, bounded polling, and same-origin local routing. Use Caddy's built-in basic authentication at the production web gateway, covering both static UI and `/api` proxy routes; keep only the non-sensitive health endpoint exempt. Store the operator credential hash through SOPS; no custom auth framework.
- [ ] Run frozen pnpm install, frontend checks, Go checks, build, and browser tests through live API/worker/PostgreSQL. Verify unauthenticated production access is denied at the intended boundary. Commit the complete local monorepo.

### Task 3: Multi-service deployment and recovery

**Files:**

- Create parent operational files beneath this example.
- Create: `Dockerfile.api`, `Dockerfile.worker`, `apps/web/{Dockerfile,Caddyfile}`, `config/deploy.{web,api,worker}.yml`, `docs/recovery.md`, and backup service/timer templates.
- Modify: `justfile` to build all images and run migrations/ordered deployments without a custom orchestrator.

**Interfaces:** All images use one source revision. Web alone exposes public HTTP; API, worker, and PostgreSQL communicate privately. Produces explicit migration → API/worker compatibility-safe update → frontend deployment order, with recovery guidance for partially updated services.

- [ ] Build all three images and run the full flow using disposable local containers. Check public/private port exposure through actual connection attempts.
- [ ] Implement parent operational procedure, per-service Kamal configuration, shared private networking and database ownership, GHCR builds, serialized automatic deployments, and stale-revision prevention. Disable worker proxying.
- [ ] Rehearse old/new service compatibility around an additive migration; restart API/worker while queued work exists and assert reports eventually complete without duplicate results.
- [ ] Back up real report/job data to a disposable restic repository, restore into fresh PostgreSQL, run required River migrations, and verify completed records plus safe resumption of pending work. Document that restore can replay external effects in real workloads.
- [ ] Run infrastructure/Ansible/workflow validation, safe act jobs, local state failure recovery, all service checks and browser tests. Copy outside the repository and repeat the local build/integration path.
- [ ] Document live GitHub/OVH/Kamal/R2 checks still requiring authorization; commit the complete operational reference.
