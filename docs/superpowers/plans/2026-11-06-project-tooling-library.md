# Open-Source Library Reference Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver an independently consumable ESM TypeScript package with verified packaging and explicit release workflows.

**Architecture:** A dependency-free duration parser supplies a concrete public contract. Native package checks and consumer tests validate the packed artifact; Changesets and npm trusted publishing handle explicit releases.

**Tech Stack:** TypeScript, pnpm, tsdown, Vitest, publint, Are the Types Wrong, Changesets, GitHub Actions, act.

**Spec:** `docs/superpowers/specs/2026-11-06-project-tooling-skill-design.md`

## Global Constraints

- All constraints and the shared operational contract in [the parent plan](2026-11-06-project-tooling.md) apply.
- This example is independently runnable; no dependencies on sibling projects or root node_modules.
- No paid provisioning, live deployment, domain changes, credential installation, or npm publication is authorized.

## Review Focus

1. Invalid duration input is rejected consistently rather than partly parsed.
2. Consumers load the packed package without source files or parent dependencies.
3. ESM runtime exports and declarations resolve for the documented Node/browser contract.
4. Release retries cannot overwrite an existing published version.
5. PR/act packaging checks never invoke real publication or require production credentials.

---

### Task 1: Public API and packed-package consumer

**Files:**

- Create beneath `skills/choosing-project-tooling/examples/library/`: `package.json`, `pnpm-lock.yaml`, `mise.toml`, `justfile`, `tsconfig.json`, `tsdown.config.ts`, `eslint.config.js`, `vitest.config.ts`.
- Create: `src/{index.ts,index.test.ts}`, `test/consumer/{package.json,tsconfig.json,index.ts}`, `README.md`, `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `.gitignore`.

**Interfaces:** Export only `parseDuration(input: string): number`, returning integer milliseconds. Accept one or more whitespace-separated integer/unit terms, units `ms`, `s`, `m`, `h`, `d`, outer whitespace allowed. Reject empty strings, signs, decimals, unknown units, trailing garbage, and unsafe integer totals with `TypeError` or `RangeError` as appropriate. Example: `parseDuration("1h 30m") === 5400000`. ESM only, no runtime dependencies.

- [ ] Write failing tests asserting `"0ms" → 0`, `"1h 30m" → 5400000`, outer-whitespace acceptance, and rejection of empty/negative/decimal/unknown/trailing text. Add overflow test expecting RangeError. Run Vitest to observe the missing export failure.
- [ ] Implement the parser and explicit package exports/declarations using tsdown. Choose and document supported maintained Node versions; pin the development version with mise. Use a distinct unpublished example package name; actual npm scope/name selection remains a publishing prerequisite.
- [ ] Build and pack with native pnpm commands. Install the exact tarball in the isolated consumer fixture, compile its import, execute the compiled consumer, and assert the example result. Ensure source files and parent node_modules are unavailable to the external consumer.
- [ ] Run publint and Are the Types Wrong against the package, not merely source TypeScript. Add just commands for check/build/pack/test-consumer; use direct tool commands rather than a custom packaging runner.
- [ ] Document the grammar, error contract, ESM limitation, supported runtimes, license, and contribution/security process. Run all checks and commit the complete local package.

### Task 2: Local workflow testing and explicit publication design

**Files:**

- Create: `.github/workflows/{check,release}.yml`, `.github/dependabot.yml`, `.actrc`, `.changeset/{config.json,README.md}` beneath this example.
- Modify: `mise.toml`, `justfile`, `README.md`, and package scripts.

**Interfaces:** `just ci-test` runs checks/build/package-consumer jobs only. `release.yml` is explicitly dispatched against the current default-branch release revision; Changesets supplies versions/changelogs. Publishing uses the already-tested tarball, never a fresh rebuild.

- [ ] Validate current Changesets single-package workflow and npm trusted-publishing/provenance requirements using primary docs. Document registry account, package name, first-publication bootstrap, repository settings, and permitted environment prerequisites.
- [ ] Implement unprivileged PR/main checks including packed consumer tests. Configure act with pinned tooling and a compatible runner image; run `just ci-test` without production credentials.
- [ ] Implement explicit version/changelog preparation through Changesets and an explicit release workflow that builds once, validates and retains the exact tarball, then publishes it using supported npm trusted identity.
- [ ] Add a local pack/install rehearsal for a versioned artifact. Verify a retry never rebuilds or silently republishes different content under an existing version; document registry lookup/check behavior and unrecoverable mismatch handling. Do not perform a live npm publication.
- [ ] Run actionlint, full checks, pack/consumer verification, and act. Copy outside the repository and repeat the locked install/check/build/consumer path.
- [ ] Document that GitHub identity and actual registry behavior remain unverified without authorization; commit the release reference. Do not add SOPS, infrastructure, containers, or deployment files.
