# Skill Integration and Evaluation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the proven examples into a concise discoverable skill and replace system-level project setup guidance.

**Architecture:** Capture fresh-context baseline behavior first, then author routing and decision guidance from observed gaps. Preserve prompt injection code and universal security/authorization boundaries.

**Tech Stack:** Pi skill frontmatter/discovery, Markdown, existing Vitest prompt assembly tests, fresh-context agent evaluations.

**Spec:** `docs/superpowers/specs/2026-11-06-project-tooling-skill-design.md`

## Global Constraints

- All constraints and the shared operational contract in [the parent plan](2026-11-06-project-tooling.md) apply.
- This example is independently runnable; no dependencies on sibling projects or root node_modules.
- No paid provisioning, live deployment, domain changes, credential installation, or npm publication is authorized.

## Review Focus

1. An existing npm/Make/managed-hosting project is not migrated without permission.
2. A library request does not acquire VPS or container infrastructure by association.
3. A narrow deployment/workflow repair loads relevant guidance without rebuilding the whole project.
4. Missing cloud credentials produce explicit bootstrap requirements rather than fabricated success.
5. Skill discovery works from a packaged/copied installation without reading every example.

---

### Task 1: Baseline behavior before skill authoring

**Files:**

- Create: `docs/evaluations/project-tooling/scenarios.md`, `docs/evaluations/project-tooling/results.md`.
- No skill or prompt edits in this task.

**Interfaces:** Produces reusable scenario prompts, scoring criteria, and observed baseline evidence. The same prompts will be used after integration. Evaluation records are maintenance evidence, not runtime instructions or policy keyword tests.

- [ ] Read writing-skills (including test-driven-development background and testing references) and verifying-end-to-end. Obtain an authorized fresh-context execution mechanism under the chosen execution approach; do not silently delegate.
- [ ] Define six concrete scenarios: a new stateless app, an existing npm/Make project needing one CI repair, the mixed-language report service, a Minecraft upgrade, npm library publication, and a partially failed CI-only infrastructure apply with an unpushed encrypted state file.
- [ ] For each scenario define observable outcomes: relevant guidance discovery, native-tool use, no unsolicited migration, scoped stack selection, correct secret/state boundaries, and honest verification limits. Add pressure to the state and existing-project cases without making them text-quotation tests.
- [ ] Run baseline trials without the new skill. Record model, actual context, supplied prompt, output references, and specific omissions/rationalizations verbatim. Do not label a missing behavior a failure unless the scenario actually exercises it.
- [ ] Classify failures before choosing wording: discovery gap, incorrect output structure, missing field, conditional decision, or discipline violation. If a control already succeeds, retain it as regression evidence rather than inventing a failure.
- [ ] Commit baseline scenarios/evidence. Continue with the five example plans before Task 2.

### Task 2: Skill and system-prompt integration

**Files:**

- Create: `skills/choosing-project-tooling/SKILL.md`.
- Modify: `prompts/system.md`, `AGENTS.md` only to document the new layout.
- Modify: `docs/evaluations/project-tooling/results.md`.
- Leave `index.ts`, `src/inject.ts`, `src/prompts.ts`, and `src/messages.ts` unchanged unless a demonstrated defect requires separately approved work.

**Interfaces:** Skill name `choosing-project-tooling`; exact description from approved spec. Links to `examples/{stateless,stateful,monorepo,minecraft,library}/README.md`. Existing Pi package already advertises `./skills`; no new loader or package framework.

- [ ] Review the completed reference READMEs and observed verification. Write the smallest main skill covering judgment, preferred tools, existing-project preservation, authorized migrations, and an example selection table. Aim for at most 500 words, keeping operational details in examples.
- [ ] Use the approved broad trigger description; validate portable frontmatter and matching directory/name. Do not summarize workflow in the description. Do not create nested SKILL.md files inside examples.
- [ ] Remove the system prompt's setup/operations section, move operational detail into the skill, and retain concise universal rules for plaintext secrets, immutable published artifacts, and deployment/publishing permission in judgment/scope. Preserve unrelated communication and verification guidance.
- [ ] Run the baseline scenarios with the skill available through actual discovery, not merely pasted in every prompt. Verify the relevant example is selected without reading all five and that existing-project preservation/library exclusions survive.
- [ ] For behavior-shaping wording, run five fresh-context samples per tested variant with a no-guidance control; manually inspect every scored match. Rework only observed failures; do not expand into generic prohibitions or rationalization tables unless discipline failures justify them.
- [ ] Run `pnpm test` to preserve prompt assembly behavior. Do not add unit tests that assert preferred-tool words or paragraph text. Commit the integrated guidance and evidence.

### Task 3: Packaging, full verification, and handoff

**Files:**

- Modify reference READMEs and evaluation record only for actual verification findings.
- Modify root check scoping/ignores only if a reproduced nested-project conflict remains.

**Interfaces:** Consumes all five runnable references and integrated skill. Produces observed checks, a clean change set, and clearly identified unverified external boundaries.

- [ ] Read Pi skill/package documentation and use a disposable installed/copied package plus `/reload` or a fresh Pi process to inspect discovery diagnostics and `/skill:choosing-project-tooling`. Verify relative example paths resolve outside the source checkout. Do not publish the package.
- [ ] Repeat each subplan's standalone copy checks, safe act jobs, build/container checks, and meaningful integration boundary. Verify generated secrets/state/build outputs remain ignored and image contexts exclude plaintext credentials.
- [ ] Run root `pnpm run format`, `pnpm run typecheck`, `pnpm run lint`, `pnpm test`, and `pnpm run format:check`; inspect the diff for unrelated formatting.
- [ ] Review state persistence/recovery, privilege boundaries, stale deployment prevention, version immutability, restored data, and library consumer behavior against actual evidence. Do not convert an unexercised cloud control into a passing claim.
- [ ] Record commands, results, model-trial variance, and unavailable GitHub/OVH/R2/npm/game-client prerequisites. Clean up task-owned local processes, fixtures, and temporary copied projects.
- [ ] Obtain review under the chosen execution approach, resolve findings, rerun affected checks, and commit the verified changes. Present remaining live-verification blockers before offering deployment/publication.
