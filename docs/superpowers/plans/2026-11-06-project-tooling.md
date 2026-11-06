# Project Tooling Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a concise opinionated skill backed by five independently runnable reference projects.

**Architecture:** Each example owns its dependencies, tasks, checks, workflows, and applicable infrastructure. Separate plans keep application and operational verification bounded; integrate the skill only after reference checks and baseline behavior evaluation.

**Tech Stack:** Pi skills, mise, just, pnpm, act, TypeScript, Go, PostgreSQL, OpenTofu, SOPS/age, Ansible, Kamal, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-11-06-project-tooling-skill-design.md`

## Global Constraints

- Use mise to pin developer and operational tooling, just to expose tasks, and pnpm for Node/TypeScript dependencies.
- No Python, Redis, Nx, or custom build orchestrator in the monorepo application.
- Production applies run only through a manually dispatched GitHub workflow.
- Keep infrastructure credentials out of application deployment jobs.
- Published versions and image identifiers must not be overwritten with different contents.
- No paid provisioning, live deployment, domain changes, credential installation, or npm publication is authorized.
- Every subplan consumes this plan's operational contract and the full spec. Repeat configuration in each example; do not introduce shared runtime modules, generators, or reusable workflows.
- Keep root pi-aidan tooling intact. Do not treat adding examples as permission to migrate this repository.
- Read relevant skills before implementation, especially test-driven-development, writing-skills, verifying-end-to-end, writing-documentation, and using-the-browser where applicable.

## Review Focus

1. Interrupted or partially failed apply: preserve encrypted state and halt later applies pending recovery; operational task in each deployed plan owns this rehearsal.
2. Pull-request or local act execution: cannot publish, deploy, or obtain production secrets; workflow verification in every example owns this check.
3. Older main revision completes late: cannot replace a newer deployed revision; application deployment verification owns this check.
4. Fresh checkout or copied example: no dependence on parent node_modules, paths, state, or secrets; final verification in each subplan owns this check.
5. Persistent data and schema changes: restart/retry/rollback cannot silently discard data; stateful, monorepo, and Minecraft recovery tasks own these checks.

---

## Plan map and execution order

This scope has six independently reviewable deliverables. Do not run their operational work concurrently against shared paid resources.

1. Run Task 1 of [skill integration](2026-11-06-project-tooling-integration.md): record behavior baselines before authoring the skill.
2. [Stateless reference](2026-11-06-project-tooling-stateless.md): establish the first complete operational example.
3. [Stateful reference](2026-11-06-project-tooling-stateful.md).
4. [Mixed-language monorepo](2026-11-06-project-tooling-monorepo.md).
5. [Minecraft deployment](2026-11-06-project-tooling-minecraft.md).
6. [Open-source library](2026-11-06-project-tooling-library.md).
7. Finish Tasks 2–3 of skill integration and run the complete repository checks.

Commit each task's independently verified deliverable. Do not claim the whole project complete if cloud, GitHub, or real-client checks remain blocked. Partial verification is acceptable evidence, not a substitute for the missing checks.

## Shared operational contract

Each deployed example contains these files, implemented independently:

- `mise.toml`: exact tested tool versions, including Ruby/Kamal dependencies where required.
- `justfile`: public commands listed below; recipes delegate to established tools.
- `.actrc`: compatible explicitly selected runner image, with no secrets or privileged event defaults.
- `.github/workflows/check.yml`: unprivileged PR/main validation.
- `.github/workflows/infrastructure.yml`: manual production plan/apply and encrypted-state persistence.
- `.github/workflows/configure-host.yml`: manual Ansible configuration.
- `.github/workflows/deploy.yml`: app build/deploy or deliberate third-party upgrade.
- `infra/{versions,providers,variables,main,outputs,encryption}.tf`, `infra/.terraform.lock.hcl`: pinned OVH/Cloudflare providers, native encryption, VPS, DNS, applicable backup resources.
- `ansible/{ansible.cfg,inventory.yml,requirements.yml,playbook.yml}`: host configuration, pinned maintained roles/collections where used, inventory populated through supported tool output.
- `config/deploy.yml` (or per-service variants in the monorepo), `.kamal/secrets`: Kamal configuration and supported SOPS-backed secret integration.
- `.sops.yaml`, `secrets/README.md`: recipient rules and secret creation/bootstrap instructions. Do not commit usable credentials, a fake encrypted file, or a nonfunctional pretend state file.
- `README.md`, `.gitignore`, `.dockerignore`: standalone usage, verification limits, ignored generated output, restricted image context.

Public commands: `just check`, `just dev` where applicable, `just build` for apps, `just ci-test`, `just infra-validate`, `just infra-plan`, `just host-check`. Remote `just deploy REVISION` and backup/recovery commands must document explicit authorization requirements. No routine local `infra-apply` command. `ci-test` runs only local-safe jobs, not the whole privileged workflow graph.

### Operational implementation procedure

1. Read current primary documentation for mise, just, act, OpenTofu encryption, OVH US VPS ordering, Cloudflare resources, SOPS exec inputs, Kamal prebuilt images/secrets/roles, and chosen Ansible components. Record relevant links in the example README. Do not copy unverified schema from historical designs.
2. Pin currently supported versions and real catalog identifiers where independently discoverable. Account-dependent choices are documented inputs; never silently fall back to another product, region, or OS. Enable replacement protection on production VPS resources.
3. Set up SOPS/age recipients and independent key recovery. CI receives only the identities required by its workflow. Avoid dumping decrypted mappings into logs or persistent environment artifacts.
4. Implement one production apply writer, fresh state/config retrieval, noncanceling concurrency, plan-before-apply, encrypted state persistence after partial failure, and a fail-closed recovery procedure. Check that state-only commits do not trigger app deploys.
5. Prove state behavior on a disposable local OpenTofu configuration with native encryption and a local-only resource. Rehearse a failing operation after state mutation, rejected state push, and recovery. Do not add a custom provider or locking service. Record unavoidable runner-loss limitations; encrypted recovery artifacts, if used, need restricted access and retention.
6. Make privilege boundaries explicit. Untrusted PR jobs have no production secrets; act only runs safe jobs. GitHub-specific concurrency and permissions need authorized GitHub trials.
7. Build images once with immutable commit identity, deploy prebuilt images through Kamal, and avoid stale deployment by serializing the build/deploy sequence and checking current target revision. Retries reuse existing images; do not republish a different image under the same identifier.
8. Use Ansible for hardening, Docker-aware ingress, updates/reboots, resource/log bounds, backup schedules, disk checks, and failure notification. Verify admin access before disabling bootstrap access.
9. Stateful references use OpenTofu-managed R2 and restic, least-privilege backup access, explicit retention, and application-consistent capture. Local restore rehearsals may use disposable filesystem-backed restic repositories; label these as substitutes, not R2 verification.

Each subplan's operational task implements this procedure, runs `tofu fmt -check`, `tofu init -backend=false`, `tofu validate`, `ansible-playbook --syntax-check`, workflow validation with actionlint, and `just ci-test`. No text-assertion tests of config/policy keywords.

## Repository coexistence

Examples are standalone nested projects, not root pnpm workspace members. Root ESLint currently scans all `**/*.ts` and relies on the root TypeScript project; Vitest has default discovery. During the first example task, explicitly exclude example projects from root ESLint/Vitest discovery while keeping each example's own checks. Prefer inline Vitest include/exclude in the root package script over adding a new harness. Root TypeScript includes are already limited to index/src/test. Extend root Prettier ignores only for nested generated outputs and lockfiles as needed, not all example source.

## Verification gates

- Each example runs its own checks, build/package, applicable container build, and safe act jobs from its own directory.
- Copy each example outside the repository (excluding generated output), install locked dependencies there, and rerun its checks to prove independence.
- Use real local PostgreSQL/Docker where available and bounded waits; preserve logs for failed checks without retaining secrets.
- Verify actual browser/API/worker/package outcomes, not only unit tests.
- Run `pnpm run format`, `pnpm run typecheck`, `pnpm run lint`, `pnpm test`, and `pnpm run format:check` at the root after integration.
- Record boundary, commands, observed outcome, and blocked prerequisites in the evaluation record. Do not invent successful runs.
