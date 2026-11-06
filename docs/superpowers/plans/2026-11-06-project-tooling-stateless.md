# Stateless Reference Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a standalone React/Vite application with complete OVH deployment configuration.

**Architecture:** A tiny in-memory checklist demonstrates a real browser interaction without backend persistence. A production web-server container serves Vite assets behind Kamal HTTPS.

**Tech Stack:** React, Vite, TypeScript, pnpm, Vitest, Playwright, Caddy, shared operational stack.

**Spec:** `docs/superpowers/specs/2026-11-06-project-tooling-skill-design.md`

## Global Constraints

- All constraints and the shared operational contract in [the parent plan](2026-11-06-project-tooling.md) apply.
- This example is independently runnable; no dependencies on sibling projects or root node_modules.
- No paid provisioning, live deployment, domain changes, credential installation, or npm publication is authorized.

## Review Focus

1. Direct navigation and health endpoints work in the production container, not just Vite.
2. Refreshing discards intentionally ephemeral state; no accidental persistence claim.
3. PR/act jobs cannot publish images or access production secrets.
4. Late build completion cannot deploy an older main revision over a newer one.
5. A copied checkout builds without parent tooling or dependencies.

---

### Task 1: Runnable app, checks, and repository isolation

**Files:**

- Create: `skills/choosing-project-tooling/examples/stateless/{package.json,pnpm-lock.yaml,mise.toml,justfile,index.html,vite.config.ts,tsconfig.json,eslint.config.js,playwright.config.ts}`.
- Create: `skills/choosing-project-tooling/examples/stateless/src/{main.tsx,App.tsx,App.test.tsx,styles.css}`, `skills/choosing-project-tooling/examples/stateless/test/browser.spec.ts`.
- Modify: root `eslint.config.js`, `package.json`, `.prettierignore` only for standalone example check boundaries.

**Interfaces:** Produces browser checklist at `/`; `just dev`, `just check`, `just build`, and `just test-browser`. No API, authentication, or persisted data.

- [ ] Write `adds_and_completes_a_task`: entering a nonempty task renders it; completing it updates accessible state. Write `rejects_blank_tasks` and `refresh_starts_empty`. Run Vitest and Playwright to observe missing implementation failures.
- [ ] Implement the smallest accessible checklist, strict TS, locked dependencies, native lint/test commands, and just tasks. Use the applicable UI skill without expanding product scope.
- [ ] Restrict root ESLint/Vitest to root-owned source/tests while examples retain their own checks. Run `pnpm test` and `pnpm run lint` from the root to confirm unrelated tests are not discovered.
- [ ] Run `just check && just build && just test-browser` from the example; expect no check errors and passing interaction/reset tests.
- [ ] Commit the verified app and narrowly scoped root check changes.

### Task 2: Container and complete deployment reference

**Files:**

- Create: `skills/choosing-project-tooling/examples/stateless/{Dockerfile,Caddyfile,.dockerignore,.gitignore,.actrc,README.md}`.
- Create remaining shared operational contract files beneath `skills/choosing-project-tooling/examples/stateless/`.
- Create: `skills/choosing-project-tooling/examples/stateless/test/container.spec.ts` for HTTP behavior against an already started container.

**Interfaces:** Consumes Task 1's build; produces HTTP `/` and `/up` on container port 80, with `/up` returning 200. Adds operational tasks from the parent contract. No application backup resources.

- [ ] Write container smoke checks: `/up` returns 200; `/` serves the built app; a direct client-side route resolves to the application; a missing asset is not misreported as HTML success. Run against an empty/missing image and observe the expected failure.
- [ ] Implement multi-stage image and Caddy routing. Build with `docker build -t aidan-stateless:local .`; run with a disposable container name and loopback-only host port. Run smoke checks and Playwright against the served production assets.
- [ ] Implement all parent operational files/procedures for the stateless VPS, DNS, host, SOPS, encrypted state, and build-once automatic deployment. Do not add R2 or data backup machinery to this example.
- [ ] Run infrastructure/Ansible/workflow checks and `just ci-test`. Rehearse partial apply/state-push failures with disposable local state; verify no plaintext state enters outputs.
- [ ] Document and, only with authorization, exercise PR denial, current-revision deployment ordering, prebuilt-image retry, and rollback on GitHub/disposable VPS. Otherwise explicitly mark these boundaries unverified.
- [ ] Copy the reference to a temporary external directory and run frozen install, checks, build, and local workflow testing without parent files. Document prerequisites and actual results; clean up task-owned containers.
- [ ] Commit the verified operational reference; do not publish or deploy.
