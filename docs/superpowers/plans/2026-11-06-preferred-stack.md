# Preferred stack implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Aidan's CalVer defaults with proportional stack, SemVer, release, and deployment guidance.

**Architecture:** Keep durable preferences in the injected system prompt and operational selection and safety details in the existing setup skill. Update the maintained prompt documentation without changing extension handlers or configuring real services.

**Tech Stack:** Markdown prompts and Pi skills; existing TypeScript/Vitest assembly tests.

**Spec:** `docs/superpowers/specs/2026-11-06-preferred-stack-design.md`

## Global constraints

- Preserve established conventions; migrations require user authorization.
- Build new GHCR images only when the corresponding application version changes.
- Promote the same immutable image digest through staging and production.
- Keep bootstrap secrets such as age keys in a gitignored repository-local `.env`, never committed.
- Preserve the existing non-mutating aggregate verification contract and Beads setup safeguards.
- No real infrastructure provisioning, publication, or deployment is necessary or authorized.

## Review focus

- An unchanged monorepo component must not publish another image; a retry must reuse the existing artifact.
- An open source library must get package publishing recommendations without application infrastructure.
- An existing repository must retain its established tools and versioning until migration is authorized.
- Unsupported GitHub environment features must not eliminate staging/production isolation.
- Encrypted repository state needs serialization, safe persistence, recovery, and CI bootstrap without committing `.env` or plaintext state.

## Task 1: Update and evaluate project preferences

**Files:**

- Modify: `prompts/system.md`, durable preferences and versioning.
- Modify: `skills/setting-up-new-projects/SKILL.md`, operational guidance replacing CalVer.
- Modify: `docs/prompting.md`, maintained explanation, sources, and evaluation cases.
- Annotate if needed: dated CalVer design and plan documents as superseded historical records.
- Preserve: `test/aidan.test.ts`, `test/messages.test.ts`, loader code, ecosystem toolchain defaults, and Beads safeguards.

**Interfaces:**

- Consumes: existing bundled prompt injection and setup skill discovery.
- Produces: updated Markdown guidance through the same paths and injection interfaces; no API changes.

- [ ] Read writing-skills and its required TDD/testing references before editing. Check current primary documentation for release-please output and workflow triggering, OpenTofu state encryption, age secret handling, Kamal image reuse, GitHub environment availability, and caching. Record sources without copying brittle version-specific configurations.
- [ ] Establish baseline fresh-agent evidence with the current prompt and skill. Use disposable, plan-only scenarios: (1) deployed monorepo with one version bump and a deployment retry, (2) open source SDK publishing, (3) existing repository with another task runner and version scheme, (4) game server or assistant installation, and (5) encrypted repository state with concurrent CI and no GitHub environment support. Assert the spec's expected choices and record observed omissions or conflicts verbatim. Do not provision resources. If no agent-evaluation capability is authorized or available, report that boundary as blocked rather than substituting keyword assertions.
- [ ] Replace the system prompt's versioning section with concise proportional stack and SemVer/release preferences. Include guidance for existing projects and refer operational setup to the existing skill.
- [ ] Replace the setup skill's CalVer section and extend toolchain/setup guidance with the approved foundation, deployed-app release and promotion path, infrastructure ownership, encrypted-state lifecycle, bootstrap handling, and library alternatives. Ensure `check` remains non-mutating and complete when exposed through Mise. Keep defaults conditional on project needs.
- [ ] Rerun the same fresh-agent scenarios against the changed guidance. Inspect outputs manually against all five review-focus conditions; address observed gaps and rerun affected cases. Use the writing-skills baseline/control methodology for wording tests where applicable. Record source identity, model settings, artifacts, outcomes, and remaining gaps.
- [ ] Update `docs/prompting.md` with current behavior, primary-source links, reproducible evaluation inputs, and the actual verification status. Mark historical CalVer records superseded without rewriting their history. Review Google documentation style and inspect the complete diff for scope and contradictory guidance.
- [ ] Run `pnpm run format`, `pnpm run typecheck`, `pnpm run lint`, and `pnpm test`, then `pnpm run check`. Confirm exit status zero and review formatting changes. These checks prove assembly and repository health, not model compliance or working deployments.
- [ ] Report changed paths, observed checks, scenario outcomes, and any blocked evaluation. Leave changes uncommitted unless the user authorizes a commit.
