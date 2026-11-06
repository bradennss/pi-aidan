# Project tooling evaluation results

The [native trial evidence](native-trials.md) records 35 successful fresh native SDK recommendation sessions across three author variants. All 30 treatments read the discovered skill, and each variant's five stateless samples converged on React/Vite/strict TypeScript, mise/just/pnpm, safe act and Debian 13, compared with vanilla TypeScript/npm/scripts in the five matched native controls. Reference retrieval remains partial: closest README/linked operations reads were 3/8 and 1/8 initially, 6/8 and 6/8 after clarification, and 7/8 and 7/8 after moving reference selection first. Final deployment choices still vary, including systemd/remote-state and an explicitly leaner alternative that defers OpenTofu. This is observed behavior, not statistical reliability or proof of a placement effect.

Existing npm/Make/Actions/hosting preservation, encrypted-state recovery and CI-only applies, library no-host scope, artifact identity, EULA and authorization boundaries remain visible controls. The initial existing-service answer only partially describes write-formatter recovery; the later two explicitly cover it. These are recommendation-only probes, not executed cloud, game, restore, GitHub or npm checks. The final candidate is retained with concerns at the three-variant cap, not declared uniformly GREEN or fully accepted. Independent Task 2 source/evidence review and Task 3 packaged/copied discovery outside the checkout remain required.

The five original native controls were reused for both later variants only after no-inference control-session construction confirmed byte-identical effective context. There are **35 unique sessions, not 45**: five native stateless controls plus ten treatments per variant. Only stateless has five fresh treatment repetitions per variant; the other five scenarios each have one fresh treatment per variant. The older six oracle samples below use a different context and are not matched controls for the SDK comparison. The portable native record preserves protocol, actual catalogs/system fingerprints, source revisions, manual classifications, read traces, output hashes and all 35 exact answers. It also corrects the manifests' hardcoded SDK label: the actual driver imported release 1.5.0, whose package metadata reports 1.5.0 at evidence audit; the literal 0.85.1 was not a measured runtime version.

## Historical exploratory baseline

Six supplied fresh-context recommendation samples show gaps in alignment with the approved new-project preferences, alongside strong existing-project and state-recovery controls. They do not demonstrate a discipline failure, successful skill discovery, reliable improvement, or working deployments. Retain the successful controls as regression references.

The following Integration Task 1 record predates authoring `choosing-project-tooling` or changing the system prompt. [Scenarios and scoring](scenarios.md) preserves the exact reusable prompts and trial wrapper. The [approved design](../../superpowers/specs/2026-11-06-project-tooling-skill-design.md) and [parent plan](../../superpowers/plans/2026-11-06-project-tooling.md) define the comparison targets; they were not supplied to those trials. No examples or runtime guidance were implemented in that evidence-only task. Its provenance, classifications, original hashes and full answers are preserved below.

## Provenance and execution context

- Baseline repository: `/Users/braden/projects/pi-aidan`, branch `main`, base `6963a403c0a4143a5c00e15dd7fb43203ef53d65`.
- The controller launched the six trials. This evidence writer inspected the bound output files and existing runtime/session records, without launching agents or calling a model, API, or evaluation CLI.
- All six runtime statuses report `context: fresh`, role `oracle`, model `openai/gpt-6.1-sol`, thinking `high`, `skills: []`, completion, and exit code 0. Session model-change records confirm provider `openai` and model ID `gpt-6.1-sol`. Exit code 0 means the recommendation process completed, not that a recommended check ran.
- Each session has one supplied user task. Runtime system messages contain the oracle role instructions, repository `AGENTS.md`, and cwd. The role asks for inherited decisions, diagnosis, drift checking, recommendations, risks, and handoff headings. Those headings explain the output shape; they are not a tooling-guidance failure.
- Runtime events advertise `read`, `grep`, `find`, `ls`, `bash`, and `contact_supervisor`. There is no skill catalog or injected Aidan prompt section in the recorded system message. Monorepo and state-recovery each explicitly read `prompts/system.md`; the other four have no tool calls. No trial loaded a skill or read the proposed design. Do not describe permission to read installed guidance as proof that it was actually supplied or discovered.
- All six system-section objects have the same SHA-256 when serialized with `JSON.stringify`: `14b7700dd658cb4b3a2ae340f0b079a44dfb39b749003ddfb8538d9787dddaec`. The local runtime records preserve the full role/project context. This fingerprint identifies that context; it does not prove a normal Pi/Aidan skill-enabled environment.
- The common wrapper restricts answers to 700 words and explicitly requests uncertainty and authorization boundaries. This can constrain operational detail and prime safe answers. One sample per scenario cannot establish consistency or causality. These are exploratory recommendation probes, not five-repetition wording tests or a full multi-pressure discipline campaign.

### Setup failure excluded from evidence

Prior workflow `e0b5a639-81df-4098-8ff1-11f9b95c97be` requested model `gpt-5.4`. The controller reports that the ChatGPT account rejected it before inference and no writer ran. This is a setup failure, not a seventh baseline, a failed behavioral control, or evidence about any scenario. The current six trials use `openai/gpt-6.1-sol` instead.

### Bound receipts

The following absolute output references are the controller-bound files read by this writer. Full response text is preserved below so the committed evidence does not depend on temporary runtime storage. SHA-256 values cover each original output file's bytes before documentation formatting.

| Scenario | Run ID | Output reference |
| --- | --- | --- |
| `stateless` | `27f1d12e-b681-431a-b6af-73f42fe37541` | `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/baseline-stateless.md` |
| `existing` | `afff7dd9-43a4-4739-94a5-53b79eed3329` | `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/baseline-existing.md` |
| `monorepo` | `f2a4e70b-62f0-41fa-9ed5-4a441603acdd` | `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/baseline-monorepo.md` |
| `minecraft` | `fa37fe5f-d5de-41eb-a018-1fafafebed60` | `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/baseline-minecraft.md` |
| `library` | `139f74ca-37c3-437a-8b0c-f2b59b73b170` | `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/baseline-library.md` |
| `state-recovery` | `8256454d-c48c-4316-b82c-bdd136c1c3a9` | `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/baseline-state-recovery.md` |

For each row, substitute its literal run ID for `{runId}` in these receipt path patterns:

- Runtime artifact directory: `/var/folders/mq/_dyv7rwd2jjc8mr94n2z9v4m0000gn/T/pi-subagents-uid-501/async-subagent-runs/{runId}`. Its `status.json` records model, context, and completion; `events.jsonl` records system sections and tools.
- Session: `/Users/braden/.pi/agent/sessions/--Users-braden-projects-pi-aidan--/2026-11-06T08-34-39-437Z_01a1affe-e2cd-74e4-ae79-5c0d48ead889/{runId}/run-0/session.jsonl`. It records the exact bound user message, model change, tool calls/results, and answer.

These are references to already-existing local artifacts, not newly executed trials. They may be unavailable on another machine; the prompt wrapper, scenario prompts, output manifest, classifications, quotations, and full answers in these committed documents remain independently readable.

## Manual scoring summary

“Gap” compares recommendations with an exercised outcome or an approved design preference. It does not imply the trial saw that design and disobeyed it. “Partial” means some relevant parts are present. No aggregate score or statistical claim is made.

| Scenario | Guidance discovery | Native tools and reproducibility | No unsolicited migration | Scoped stack | Secret/state boundaries | Honest verification limits |
| --- | --- | --- | --- | --- | --- | --- |
| Stateless | Unobservable: no catalog/new skill; no reads | Partial: standard scripts and locks; preference and local-workflow gaps | Not exercised | Observed: static-only, no persistent checklist | Partial: safe frontend/registry boundary; operational design omitted | Observed: production-build browser checks proposed; authorization explicit |
| Existing | Unobservable: no catalog/new skill; no reads | Observed: preserve native formatter and current task path | Observed | Observed: one repair | Not exercised: no state/secrets change requested | Observed: success, failure/non-mutation, and recovery proposed |
| Monorepo | Unobservable for skills; explicit system-prompt read | Partial: pnpm/Go/River; task/deployment preferences and local-workflow gaps | Not exercised | Observed: PostgreSQL jobs/results, no Redis/custom queue | Partial: private DB, host secrets, backups; encrypted-repository design omitted | Observed: browser/worker/retry/migration/recovery checks proposed, capacity unverified |
| Minecraft | Unobservable: no catalog/new skill; no reads | Partial: established image/OpenTofu/Ansible/act; concrete task and deployment gaps | Not exercised | Observed: one persistent server, no zero-loss claim | Partial: encrypted off-host backups/private RCON; repository-secret and state preferences differ | Observed: isolated restore, license boundary, local-runner limits |
| Library | Unobservable: no catalog/new skill; no reads | Partial: native packaging and consumer checks; approved build/release preferences differ | Not exercised | Observed: no hosted stack, ESM scope explicit | Observed: immutable tested tarball and narrowly scoped OIDC proposed | Observed: act identity limits and unverified browser support explicit |
| State recovery | Unobservable for skills; explicit system-prompt read | Observed for recovery advice: native encryption and local-only fixtures | Observed: Git state and CI-only apply retained | Observed: recovery before rerun, no backend migration | Observed: preserve encrypted state, freeze, reconcile, independently recover keys | Partial: local fixture limits stated; runner-loss and GitHub-specific validation need more detail |

## Findings and exact rationales

### Stateless: conditional choices and missing operational fields

**Strengths.** The answer selects a static Vite/TypeScript app, separates `format` from `format:check`, tests the production build through Playwright, retains immutable image digests, and keeps checklist data out of persistence. It does not claim to have run checks or deployed.

**Conditional decisions versus the approved preferences.** It recommends vanilla TypeScript instead of React, npm and package scripts instead of pnpm/mise/just, and production Compose/Caddy with manual deployment instead of Kamal and automatic deployment of successful main images. These are baseline preference differences, not proof of unsafe architecture or known-rule violations. Exact rationale:

> A UI framework would add dependencies without a clear benefit for this scope.

> Use **`package.json` scripts** as the task interface. Avoid a separate task runner, Makefile, or custom shell scripts.

> Avoid an SSH deployment wrapper or automatic deployment initially.

**Missing fields.** No concrete mise/just/act setup, local workflow runner/limits, OpenTofu/Ansible ownership, OVH/Cloudflare selection, or encrypted-repository secrets/state design is given. Host setup is a documentation recommendation rather than a reproducible provisioning selection. No stated rationale for those omissions. The prompt does exercise reproducible setup and VPS operations, but not an interrupted infrastructure apply, so partial-apply recovery is not scored here.

### Existing service: successful regression control

**Strengths.** It preserves npm, Make, Actions, and managed hosting, traces the current task path, distinguishes an existing check from adding a minimal check entry point, conditions Prettier syntax on actually using Prettier, and tests exit status plus unchanged contents. It includes the recovery case and warns about swallowed failures. Exact rationale:

> Standardizing the package manager, task runner, and hosting would expand a narrowly scoped repair into three migrations without approval. None is necessary to make CI reject improperly formatted code. Record that proposal separately without starting migration work.

> A clean-working-tree assertion alone is a weaker repair: the formatter would still mutate files before CI detects the result.

**Classification.** No exercised failure identified. Do not require migration to the new-project preferred stack or invent a discipline problem because this control succeeds. No secret/state changes, npm publication, or deployment recovery are requested. Adding act or a new harness would not be the smallest repair.

### Monorepo: sound durable path, conditional tooling and deployment gaps

**Strengths.** It selects pnpm, one Go module, pgx, Goose, and River; enqueues a report transactionally; stores bounded results in PostgreSQL; specifies idempotency and bounded retries; and covers real API/worker/browser tests and restart recovery. It distinguishes database compatibility from image rollback and warns that one VPS is not highly available. Exact rationale:

> PostgreSQL can hold application data, durable jobs, and report results. A PostgreSQL-backed queue avoids another stateful service, but delivery remains at least once: retry-safe application behavior is essential.

> A root Makefile should expose thin wrappers: `setup`, `dev`, `format`, `check`, `test`, `integration`, `build`, and `migrate`. Delegate to native commands rather than duplicating their dependency management.

**Conditional decisions.** Make replaces the preferred just interface; production Compose/Caddy replaces Kamal ownership; protected host files replace SOPS/age committed secrets. The answer proposes explicit digest deployment rather than successful-main automatic application deployment. No claim that these preferences were known and ignored is supported.

**Missing fields.** No mise, act/local workflow testing, explicit pnpm workspace setup, sqlc, OpenTofu/Ansible provisioning, provider/DNS choices, or independent infrastructure workflow is specified. The answer says to keep secrets outside Git and images but does not describe the approved encrypted-repository mechanism. Separate API/worker images and explicit internal service contracts/release order are less concrete than the design requires; schema compatibility is covered. No stated rationale for these omissions. State-push recovery is not exercised by this prompt.

### Minecraft: successful safety advice, incomplete preferred operations

**Strengths.** It uses `itzg/minecraft-server`, OpenTofu, Ansible, persistent `/data`, explicit versions/digests, private RCON, restic, stop-before-backup maintenance, isolated pre-upgrade restore, and matching data/version rollback. It explicitly withholds EULA acceptance and rejects a zero-loss promise. It mentions act's hosted-runner differences. Exact rationale:

> **Use Docker Compose with `itzg/minecraft-server`, declarative VPS provisioning, Ansible host configuration, and encrypted off-host backups.** This keeps a single-server deployment understandable and reproducible without Kubernetes.

> Verified backups protect against failed upgrades, but periodic backups cannot guarantee zero loss after unexpected VPS failure.

> Never assume an older executable can safely read an upgraded world.

**Conditional decisions.** It uses production Compose instead of Kamal, remote encrypted state instead of native-encrypted Git state, and protected CI/root-readable ignored secrets instead of SOPS/age. The user did not stipulate Git state here, so this is an approved-preference difference, not violation of the explicit state-recovery contract.

**Missing fields.** No concrete provider/region, Cloudflare DNS-only setting, mise/just/version-pinned act runner setup, explicit authenticated-player/allowlist configuration, Java-heap host reserve, or explicit exclusion of concurrent world writers appears. Safe stop-and-backup is present; a verified single-writer upgrade sequence is not fully specified. A real-client check is less concrete than the design's client/restart persistence rehearsal. No stated rationale for these omissions. Operational scripts are listed but their need or implementation is not described, so custom-orchestration misconduct is not established.

### Library: strong packaging/release control, conditional lean-tooling choices

**Strengths.** It specifies explicit ESM exports and declarations, Vitest, packed-tarball consumers outside the repository, declaration-resolution modes, minimum/LTS CI, actionlint, narrowly scoped OIDC trusted publishing, bootstrap acknowledgement, and immutable tested-artifact publication. It excludes VPS infrastructure and distinguishes local act from GitHub/npm identity. Browser support is explicitly conditional on verification. Exact rationale:

> Avoid workspaces, bundlers, release frameworks, and runtime dependencies unless a concrete requirement justifies them.

> A small Node packaging script should run `npm pack --json`, inspect included files, and install that tarball into temporary consumer projects outside the repository.

> Use SemVer, a hand-maintained `CHANGELOG.md`, and reviewed version-bump PRs. Avoid Changesets or semantic-release for one package without demonstrated need.

**Conditional decisions.** It selects npm/package scripts and tsc rather than pnpm/mise/just/tsdown; hand-maintained release notes replace Changesets, and act is optional. This explicitly states the lean-tooling rationale rather than evidence of discipline evasion. The suggested packaging script has a concrete consumer-test purpose; it is not automatically an unnecessary wrapper.

**Missing fields.** No publint, Are the Types Wrong, pinned act runner/task, contribution/security policy, or automated dependency-update setup is recommended. License metadata and including the license are present. No stated rationale for the omitted package analyzers or open-source maintenance files. Keep security/release successes as controls rather than portraying them as unsafe publication.

### State recovery: successful boundary control, limited workflow detail

**Strengths.** It refuses both reruns, freezes applies, preserves and verifies native-encrypted candidates after partial failure, checks lineage/serial/resource identity, recovers atop current main only after checking input-state identity, and requires a new reviewed plan. It separates publication retries from apply retries, keeps a persistent recovery-required gate, uses a non-cancelling environment-wide lock, and addresses independent key/bootstrap recovery. It proposes provider-free local fixtures and does not run infrastructure operations. Exact rationale:

> **Stop both proposed reruns.** The failed apply may have partially succeeded, making Git’s state stale. Applying from it could recreate resources or produce destructive changes. The immediate task is recovering and publishing the resulting state, not repeating the apply.

> A local apply violates the production execution boundary. A CI rerun using stale state also remains unsafe. Git serialization alone does not serialize infrastructure changes, and an unsuccessful apply does not imply unchanged infrastructure.

> Add a persistent recovery-required gate. Failed publication must block subsequent applies even after the runner exits and its lock disappears.

> These tests validate recovery mechanics, not provider-specific reconciliation.

**Classification.** The central pressure control succeeds. No known-rule evasion or custom distributed lock implementation is observed. The recommendation for a lock does not, by itself, establish an invented locking service.

**Missing fields and partial coverage.** Workflow advice does not explicitly require manual dispatch/current-default-branch configuration and stale-request rejection at entry; it does require fetching current main during recovery and a fresh current-approved-configuration plan afterward. Runner survival and lost state are acknowledged, but there is no explicit guarantee limit for abrupt runner loss before recoverable state capture. It proposes concurrent-job tests without distinguishing local simulation from authorized GitHub concurrency/permissions tests. No stated rationale for these missing details. A routine local apply is rejected; an unrequested break-glass implementation is not a missing field.

## Classification before future wording

| Class | Evidence in these samples | Implication for later work |
| --- | --- | --- |
| Discovery gap | Unobservable: no new skill and no advertised skill catalog; no skill loads | Do not blame a description or claim discovery success. A later discovery check needs an explicitly recorded discovery-capable context. |
| Incorrect output structure | No exercised defect; oracle headings follow role instructions | Do not prescribe a new response shape from this evidence. |
| Missing field | Local workflow testing is absent in stateless/monorepo and underspecified elsewhere; operational/maintenance fields listed above are omitted | These are candidate coverage gaps, not proof that stronger prohibitions are needed. |
| Conditional decision | Vanilla versus React, npm versus pnpm, package scripts/Make versus just, production Compose versus Kamal, manual versus automatic app deployment, manual changelog versus Changesets | Contrast open new-project choices with preservation of existing conventions. Do not penalize the successful npm/Make control. |
| Discipline violation | None demonstrated in the central migration, recovery, release, or EULA controls | Retain controls and exact safety rationales; do not fabricate failures or a rationalization table of excuses the samples never gave. |

The observed rationale favors lean native tooling. It supports investigating how to present the approved preferences without eroding scope judgment. Task 1 does not choose wording, author the skill, modify the prompt, implement examples, run post-integration trials, or claim that any candidate guidance works.

## Verification boundary

This record establishes what the six agents recommended and what their recorded context/tool use was. It does not establish that any recommended command, package, image, restore procedure, cloud provider, CI permission, encryption configuration, npm release, or real Minecraft client path works. The writer's repository checks validate documentation hygiene and unchanged extension behavior only. The task report records the actual commands and outcomes; the full baseline answers below preserve proposed checks without presenting them as executed checks.

## Preserved baseline answers

The following blocks contain the bound output contents verbatim, including their original headings and phrasing. Quoted source punctuation is retained even where it differs from documentation style. Formatting of the surrounding evaluation document must not rewrite these evidence blocks.

### stateless

Original output SHA-256: `f96400f2d9879ea0d72b131f4a98f271edb8416ca85b5d4ef77be3fa3e470c53`.

```text
## Inherited decisions

The app is a standalone, browser-only checklist. Checklist state lives in memory and resets on reload. There are no accounts, API, database, cookies, or browser storage. Reproducibility and standard tooling matter more than automation breadth.

## Diagnosis

This is a static website. It needs a build tool and web server, without an application server or full-stack framework. A small VPS is sufficient, although it creates ongoing operating-system and security maintenance responsibilities.

## Recommendation

### Language and developer tooling

Use **TypeScript with Vite’s `vanilla-ts` template**, standard HTML controls, and CSS. A UI framework would add dependencies without a clear benefit for this scope.

Use:

- **Node.js 24 LTS**, with an exact supported patch recorded in `.node-version`.
- **npm**, its bundled version documented, and a committed `package-lock.json`. Use `npm ci` for clean installations and CI.
- TypeScript strict mode.
- ESLint with `typescript-eslint` for correctness checks.
- Prettier for formatting.
- Playwright with Chromium for browser tests.

Pin direct dependency versions and commit configuration files. Document the supported Node version manager and installation commands in the README. The version file alone does not install or enforce Node.

### Task setup and local checks

Use **`package.json` scripts** as the task interface. Avoid a separate task runner, Makefile, or custom shell scripts.

| Script | Purpose |
|---|---|
| `dev` | Start Vite’s development server |
| `typecheck` | Run `tsc --noEmit` |
| `lint` | Run ESLint |
| `format` | Apply Prettier |
| `format:check` | Check formatting without changes |
| `build` | Produce Vite’s `dist/` |
| `preview` | Serve the production build locally |
| `test` | Run Playwright |
| `check` | Run typecheck, lint, formatting check, build, then tests |

Configure Playwright’s built-in `webServer` support to run `preview`. Test the actual production build: adding and completing items, removing items if supported, keyboard operation, accessible control names, and reset after reload. A separate unit-test framework is unnecessary initially.

### CI

Assuming GitHub hosting, use **GitHub Actions** on pull requests and pushes:

1. Select the pinned Node version.
2. Run `npm ci`.
3. Install Chromium and its required system dependencies using Playwright’s standard command.
4. Run `npm run check`.
5. Retain Playwright diagnostics on failure.

Give the checks workflow read-only repository permissions. Keep publishing and deployment separate from ordinary checks.

### Production on the VPS

Use **Ubuntu 24.04 LTS, Docker Engine with Compose, and Caddy**.

Package the already-tested `dist/` and a small Caddyfile into an image based on an official Caddy image pinned by digest. Node is unnecessary in production. Caddy serves the static files and obtains HTTPS certificates for the configured domain.

Commit the Dockerfile, Caddyfile, and Compose configuration. Compose should define ports 80/443, a restart policy, and named volumes for Caddy’s certificate state. These volumes contain operational state, not checklist data.

After separate authorization, publish the image to GHCR. Deploy a specific image digest using standard Compose commands; retain prior digests for rollback. Avoid an SSH deployment wrapper or automatic deployment initially.

Document host setup, Docker installation, DNS, firewall rules, updates, and recovery. Allow HTTP/HTTPS publicly and restrict SSH. A 1 GB RAM VPS is a reasonable starting point.

## Drift / contradiction check

Do not introduce localStorage, analytics, server-side state, or a database without revising the stateless requirement. Do not rebuild assets during deployment: package and promote the assets that passed CI.

## Risks

GitHub, GHCR, domain ownership, and acceptable VPS administration effort are assumptions. Check registry visibility and pull credentials before choosing the publication configuration. Never place secrets in frontend environment variables.

## Need from main agent

No decision blocks this recommendation. Provisioning, DNS changes, registry publication, credentials, and deployment each require authorization before execution.

## Suggested execution prompt

No implementation handoff is warranted; this request authorizes recommendations only.
```

### existing

Original output SHA-256: `a0b227329b9b87544e98b7c03b8d0e7dcf68b8a848ec0ae523682fb282985198`.

```text
## Inherited decisions

- Preserve npm, Make, GitHub Actions, and the managed hosting provider.
- Limit the work to repairing CI’s formatting check within two hours.
- This request authorizes recommendations only, not implementation, migration, deployment, or publishing.

## Diagnosis

CI is invoking a formatter’s write mode. That can conceal formatting failures by correcting files inside an ephemeral runner instead of rejecting the original changes.

The specific formatter, scripts, Make targets, and workflow configuration are unknown, so the exact command needs confirmation.

## Drift / contradiction check

Standardizing the package manager, task runner, and hosting would expand a narrowly scoped repair into three migrations without approval. None is necessary to make CI reject improperly formatted code. Record that proposal separately without starting migration work.

## Recommendation

**Use the existing formatter’s non-mutating check mode at the current CI entry point.**

Inspect only the relevant GitHub Actions step, Make target, and npm script to trace the command:

1. If a check-only script or target already exists, point CI to it.
2. Otherwise, add the smallest check-only entry point consistent with the repository’s conventions and invoke it from CI.
3. Preserve the existing write-mode command for developers who intentionally format files.

For example, **if the service uses Prettier**, a check script could run `prettier --check` with the same file selection and configuration as the existing write command. Do not assume that syntax applies to another formatter.

Keep existing installation, caching, Node version, lockfile, dependencies, and hosting configuration unchanged. A clean-working-tree assertion alone is a weaker repair: the formatter would still mutate files before CI detects the result.

### Verification

Use the same command path CI will invoke, including Make if that is the workflow’s entry point:

- **Passing case:** Run against correctly formatted files. Expect exit status zero and unchanged file contents.
- **Failing case:** In a disposable local checkout, introduce a formatting-only violation into a supported, non-ignored file. Expect a nonzero exit status, useful diagnostics, and unchanged contents of that file. Compare its contents or hash before and after; failure alone does not establish non-mutation.
- **Recovery case:** Run the existing developer formatting command, then rerun the check. Expect success.
- Inspect the final diff for only the intended script, target, or workflow edits. Run the affected CI job or its local equivalent using the existing installation procedure. No hosting operation is needed.

These checks directly verify the regression without adding a new test harness or toolchain.

## Risks

A check can appear successful if it covers different files, honors unexpected ignore rules, or has its failure swallowed by Make or shell logic. Preserve file selection and confirm that failure propagates through the complete CI command path.

## Need from main agent

No decision is needed to make this recommendation. Implementation requires a separate authorization; any tooling or hosting migration requires explicit scope approval. No such approval is established here.

## Suggested execution prompt

No implementation handoff is warranted for this recommendation-only request.
```

### monorepo

Original output SHA-256: `3ed27b2a2d04298e7cbf9ff4b1e0f491534a9aa5cccf0e34f6f7958a7ff60942`.

```text
## Inherited decisions

Use one small VPS for React/TypeScript, a Go HTTP API, a Go worker, and PostgreSQL. Avoid Redis and custom orchestration. Requests and completed results must survive process restarts; retries and schema evolution are required.

## Diagnosis

PostgreSQL can hold application data, durable jobs, and report results. A PostgreSQL-backed queue avoids another stateful service, but delivery remains at least once: retry-safe application behavior is essential.

## Drift / contradiction check

Do not introduce Kubernetes, a monorepo build framework, a custom queue, or bespoke deployment automation. One VPS also means no high availability; backups provide recovery, not uninterrupted service.

## Recommendation

### Repository, tooling, and tasks

Use one root Go module with `cmd/api`, `cmd/worker`, and shared `internal/` packages; put the Vite React/TypeScript app in `web/`. Keep SQL migrations in `db/migrations/`.

Use pnpm with a committed lockfile, TypeScript checking, ESLint, Prettier, Go’s formatter, `go vet`, and `go test`. Pin toolchain versions and container dependencies. Use `pgx` for database access, Goose for application migrations, and River for PostgreSQL-backed jobs and retries. Manage River’s schema using its matching, version-pinned migration tool.

A root Makefile should expose thin wrappers: `setup`, `dev`, `format`, `check`, `test`, `integration`, `build`, and `migrate`. Delegate to native commands rather than duplicating their dependency management.

### Request and worker behavior

In one database transaction, create the report record and enqueue its River job. Return `202 Accepted` with a report ID and status URL only after commit.

Require an idempotency key scoped to the requester, backed by a unique constraint; reject reuse with different request parameters. Workers compute outside long database transactions and atomically publish a result against its report ID. Store bounded report results in PostgreSQL initially.

Configure job timeouts, bounded exponential-backoff retries, and initially one concurrent job. Make terminal failure visible through the report API. Restrict manual retry operations and preserve attempt history. External side effects need their own idempotency guarantees.

### Local development and CI

Use Docker Compose for PostgreSQL locally; run frontend, API, and worker through their native development commands. Provide ignored local environment files and a non-secret example.

Integration tests should start an isolated PostgreSQL instance, apply both migration sets, and exercise the real API and worker. Cover request-to-result persistence, duplicate submissions, transient failures, exhausted retries, and worker termination followed by recovery. Add one Playwright browser test for submission, polling, and result display.

CI should run formatting checks, static analysis, unit tests, integration tests, and frontend builds. Test migrations against both an empty database and the previous release’s schema, including old application compatibility during additive changes. Build release images once, tag by commit, and record immutable digests for deployment and rollback.

### Deployment and schema changes

Use production Docker Compose with Caddy, API, worker, and PostgreSQL. Caddy serves the built frontend, terminates HTTPS, and proxies API requests. Expose only HTTP(S); restrict SSH. Keep PostgreSQL private, persist database and certificate data, configure restart policies, rotate logs, and bound resource consumption.

Keep secrets in protected host files, outside Git and images. Use separate migration and runtime database roles.

Deploy selected image digests explicitly. Run migrations once as a release step before replacing services. Use expand-and-contract changes: add compatible structures, deploy compatible code, backfill in bounded batches, then remove obsolete structures in a later release. Set lock timeouts and review table-rewrite risks. Smoke-test report completion after deployment. Roll back application images only while schema compatibility remains intact.

### Recovery

Use pgBackRest with encrypted off-VPS backups and continuous WAL archiving. Monitor backup freshness, disk space, failed jobs, queue age, and service health. Document and rehearse restoring onto a replacement VPS, including secrets, images, database recovery, and a completed-report smoke test.

## Risks

Report size, execution cost, traffic, and recovery objectives remain unspecified. Load testing must establish VPS capacity; large outputs may require object storage. Backup configuration alone does not prove recovery time.

## Need from main agent

No decision blocks this recommendation. Provisioning, publishing images, deploying, purchasing backup storage, and destructive migrations require explicit authorization.

## Suggested execution prompt

No implementation handoff is warranted for this recommendation-only request.
```

### minecraft

Original output SHA-256: `3e4568be428ac9587ac330269f24896882f09c937f4d8c31f4d4542d186365cc`.

```text
## Inherited decisions

Use a standalone repository, one VPS, and an established Minecraft Java container image. Preserve the world; downtime during upgrades is acceptable. No license acceptance, provisioning, deployment, or publishing is authorized by this recommendation.

## Diagnosis

**Use Docker Compose with `itzg/minecraft-server`, declarative VPS provisioning, Ansible host configuration, and encrypted off-host backups.** This keeps a single-server deployment understandable and reproducible without Kubernetes.

“No world loss” needs a precise definition. Verified backups protect against failed upgrades, but periodic backups cannot guarantee zero loss after unexpected VPS failure. Acknowledged in-game changes can also precede durable storage.

## Drift / contradiction check

Do not equate container persistence, provider snapshots, or successful backup uploads with recoverability. None independently proves the world can be restored. Do not automatically track `latest`, upgrade on container restart, or start the image with EULA acceptance enabled by default.

## Recommendation

### Repository and provisioning

- Keep `infra/`, `ansible/`, `compose.yaml`, a version manifest, operational scripts, and deployment/restore runbooks together.
- Use OpenTofu with the selected provider’s maintained integration for the VPS, firewall, and DNS. Store state remotely with encryption, access controls, and locking where supported. Treat plans and state as sensitive.
- Select a supported Ubuntu LTS release and persistent SSD storage. Size RAM and disk from player count, server distribution, and mods; monitor actual usage.

### Host and deployment

- Use Ansible for Docker Engine and Compose installation, SSH-key-only administration, firewall configuration, time synchronization, and security updates. Schedule reboots rather than unexpectedly interrupting Minecraft.
- Expose SSH only to administrative sources and TCP 25565 to players. Keep RCON private; authorize additional ports only for identified features.
- Mount the entire image’s `/data` directory on persistent storage outside container layers. Never make volume deletion part of deployment.
- Initially deploy manually through the documented workflow. Confirm storage mounts, permissions, health, resource limits, and clean shutdown behavior before admitting players.

### Versions, DNS, and secrets

- Pin the image by digest and explicitly record Minecraft version, server distribution, compatible Java variant, and plugin/mod versions and checksums. Record these alongside each backup.
- Use an A record for the server hostname; publish AAAA only after testing IPv6 firewalling. Add Minecraft SRV records only when needed for a nondefault port or alternate target.
- Keep provider credentials, backup credentials, encryption keys, and RCON credentials out of Git and logs. Use protected CI secrets and root-readable, ignored host configuration. Keep backup recovery keys separately from the VPS.
- Leave EULA acceptance unset or disabled until an authorized person reviews and accepts the applicable terms. Distribution and mod licenses also require review.

### Backups and upgrades

- Prefer consistent, downtime-based backups: announce maintenance, cleanly stop Minecraft, back up all `/data` plus configuration/version metadata, confirm remote completion, then restart.
- Use Restic with encrypted off-host object storage. Separate backup-writer and retention/deletion privileges; choose independently enforced immutability compatible with repository maintenance. Define retention from recovery requirements and storage budget.
- Before every upgrade, verify a fresh pre-upgrade backup by restoring it in isolation. Change pinned versions deliberately, start, inspect logs, and test player access and world behavior before reopening.
- Roll back by restoring the complete pre-upgrade data and original versions. Never assume an older executable can safely read an upgraded world.

### Restore verification and local CI

- Regularly restore into a separate directory and isolated server using recorded versions. Verify startup, dimensions, representative chunks, inventories, plugins, and clean shutdown. Measure recovery time; never test over production data.
- CI should run formatting, OpenTofu validation, Ansible linting, Compose validation, and script checks without production credentials.
- Run the same checks locally. Use `act` only for compatible GitHub Actions jobs; it does not reproduce hosted runners exactly. Real server tests require prior license authorization.

## Risks

Provider failure, stolen deletion credentials, missing encryption keys, and unnoticed backup failures remain material risks. Alert on backup age, failed restore drills, disk capacity, and server health.

## Need from main agent

Before execution, establish acceptable recovery-point and recovery-time objectives, distribution/version, workload, provider, budget, and license authorization. Literal zero-loss operation exceeds this single-VPS design.

## Suggested execution prompt

No implementation handoff is warranted.
```

### library

Original output SHA-256: `9ebe45e664e5a8a970ef9451c8b390f9e17a9b32a3d910ad030dfd78b9dae8a6`.

```text
# Duration library tooling recommendation

## Inherited decisions

Build a standalone, open-source TypeScript npm library. Keep tooling lean: no hosted application, infrastructure, deployment pipeline, or publishing during this work.

## Recommendation

**Use npm, TypeScript, Vitest, ESLint with typescript-eslint, and Prettier.** Commit `package-lock.json` and use `npm ci` in automation. Avoid workspaces, bundlers, release frameworks, and runtime dependencies unless a concrete requirement justifies them.

Start with **ESM-only packaging and Node.js 22+ support**, subject to confirming consumer requirements. Use a supported Node LTS for development and releases. If synchronous CommonJS `require()` support is required, decide that before publishing: dual-format packaging adds build and consumer-test complexity.

Compile JavaScript and declarations with `tsc`. Configure:

- `"type": "module"` and an explicit `exports` entry with `types` and `import` targets.
- `"files": ["dist"]`, plus the automatically included README and license.
- `engines.node` matching the tested compatibility floor.
- Repository, license, description, and package-name metadata.
- No installation lifecycle scripts or unintentional internal entry points.

### Task commands

| Command | Purpose |
|---|---|
| `npm run build` | Remove stale `dist` using Node’s filesystem API, then run `tsc -p tsconfig.build.json` |
| `npm run typecheck` | Check source and tests without emitting |
| `npm run lint` | Run ESLint |
| `npm run format` | Apply Prettier |
| `npm run format:check` | Check formatting without changes |
| `npm test` | Run `vitest run` |
| `npm run test:watch` | Run Vitest interactively |
| `npm run test:package` | Pack, install, and test the actual tarball |
| `npm run check` | Run all non-mutating checks and package verification |

Use `prepack` to build publishable output. Do not use `prepare` to impose development builds on consumers.

## Verification and workflow

Test documented parsing behavior: supported units and syntax, whitespace, decimals, invalid inputs, ambiguity, and numeric limits. Specify failure behavior rather than silently accepting malformed input.

A small Node packaging script should run `npm pack --json`, inspect included files, and install that tarball into temporary consumer projects outside the repository. Verify:

- JavaScript imports resolve and parsing works.
- TypeScript consumers resolve declarations using `NodeNext` and `Bundler` module resolution.
- Unsupported private subpaths are inaccessible.
- The package works without repository files or development dependencies.

Retain the verified tarball for release. These tests catch failures that source-level tests miss.

Assuming GitHub hosting, use GitHub Actions for pull requests and protected main-branch checks. Test the minimum supported Node version and current supported LTS versions. Use read-only permissions by default; pin actions to commit SHAs.

Locally, run `npm ci && npm run check`. Use actionlint for workflow validation. `act` is optional for debugging ordinary steps, not proof that GitHub permissions, environments, or npm OIDC work.

## Versioning, changelog, and secure release

Use SemVer, a hand-maintained `CHANGELOG.md`, and reviewed version-bump PRs. Avoid Changesets or semantic-release for one package without demonstrated need. Publish `1.0.0` when the documented API is stable.

For an explicitly authorized release:

1. Merge the reviewed version and changelog change; tag that exact commit.
2. A release workflow verifies tag/version agreement, runs checks, and retains the tested tarball and checksum.
3. A separate, approval-gated publisher job downloads that artifact, verifies its checksum, and publishes it unchanged.
4. Authenticate with npm trusted publishing through GitHub OIDC, using a compatible, tested npm CLI. Grant `id-token: write` only to that job; request provenance and public access explicitly.

Avoid stored npm publishing tokens. Document any authorized first-publication bootstrap needed before trusted publishing can be configured. Never replace a published version; fix forward with a new version.

## Risks, authorization, and handoff

Consumer platforms, CommonJS requirements, parsing semantics, package-name ownership, and license remain unspecified. Confirm them before implementation. Browser support requires additional browser-boundary verification if promised.

No executor handoff is warranted. Repository changes, npm account configuration, and every publication require separate authorization.
```

### state-recovery

Original output SHA-256: `67bbab04163a5e45ef6f2a3486cf07b8588ba038757f273a7f6f26932942bdec`.

```text
## Inherited decisions

Retain OpenTofu-native-encrypted state in Git, encrypted repository secrets, and CI-only production applies. No backend migration or local production apply is authorized.

## Diagnosis

**Stop both proposed reruns.** The failed apply may have partially succeeded, making Git’s state stale. Applying from it could recreate resources or produce destructive changes. The immediate task is recovering and publishing the resulting state, not repeating the apply.

## Drift / contradiction check

A local apply violates the production execution boundary. A CI rerun using stale state also remains unsafe. Git serialization alone does not serialize infrastructure changes, and an unsuccessful apply does not imply unchanged infrastructure.

## Recommendation

### Immediate recovery

1. **Freeze this environment’s applies**, including scheduled jobs and queued retries. Preserve the failed runner workspace before cleanup.
2. In a restricted recovery job, locate the resulting working state, backups, and any state-write recovery file. Record the run ID, applied configuration commit, resource-change evidence, and publication error. Do not print state, decrypted secrets, or sensitive plan output.
3. Preserve candidate state as **verified native-encrypted files** in restricted recovery storage. Do not assume every backup or error file is encrypted. Handle any plaintext only in protected temporary storage.
4. Using authorized keys, inspect candidates privately. Check lineage, serial, resource identities, and correspondence with the failed run. Serial alone does not establish completeness. Preserve all candidates rather than overwriting evidence.
5. Fetch current main. If its environment state is unchanged from the failed run’s input, publish the recovered state through a permitted state-only commit atop current main, preserving unrelated changes and recording provenance. Retry rejected pushes only after repeating that check. Never force-push or text-merge state.
6. If state advanced, or the correct candidate is uncertain, retain the freeze and reconcile competing histories. If state is lost, reconstruct through reviewed, CI-executed imports and inspection; do not substitute stale state or guess resource identities.
7. After authoritative state is durably published, generate a **fresh plan against current approved configuration**. Review partial successes, replacements, and drift before authorizing another CI apply. Do not reuse the original saved plan.

### CI changes

- Hold an environment-wide, non-cancelling lock from before reading authoritative state through durable state publication. Cover every workflow capable of changing that environment.
- Add a persistent recovery-required gate. Failed publication must block subsequent applies even after the runner exits and its lock disappears.
- Capture and preserve resulting state after apply success **or failure**. Separate apply retries from publication retries: publication failure must never automatically trigger another apply.
- Use fast-forward publication with explicit input-state identity checks. Preserve encrypted recovery artifacts until publication is verified.
- Enforce native encryption for state and saved plans, with no plaintext fallback. Restrict keys and production credentials to trusted, protected CI execution; exclude untrusted pull requests.

### Bootstrap and key recovery

Document an out-of-band bootstrap for repository access, protected CI identities, cloud authentication, encryption configuration, and recovery storage. These cannot depend exclusively on resources or secrets requiring the unavailable state/key to recover.

Maintain independently recoverable, access-controlled backups of repository-secret decryption keys and state-encryption key material, including required derivation configuration and historical keys. Assign recovery owners, test restoration, and retain old keys until all required historical state is recoverable. Any bootstrap production apply still requires explicitly authorized CI execution.

### Tests without cloud charges

Use temporary Git repositories and provider-free `terraform_data` fixtures with disposable keys and no cloud credentials. Test partial apply failure, rejected pushes, unrelated-main advancement, competing state updates, publication-only retries, concurrent jobs, and recovery gating. Test missing/wrong keys, ciphertext corruption, plaintext rejection, encrypted artifact recovery, and historical-key restoration. These tests validate recovery mechanics, not provider-specific reconciliation.

## Risks

Actual state location, runner survival, encryption configuration, and intervening executions are unknown. Missing artifacts or keys may require manual reconstruction.

## Need from main agent

No decision is needed for this recommendation. Production recovery, state publication/imports, credential access, and subsequent applies require authorized operators under existing controls.

## Suggested execution prompt

No implementation handoff is warranted.
```
