# Beads workflow implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task, or superpowers:subagent-driven-development if the user selects delegation. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Aidan initialize Beads for new projects and use it in existing Beads-enabled projects.

**Architecture:** Extend the existing system prompt and project-setup skill. Keep command execution agent-directed, with no runtime hooks or dependency changes.

**Tech stack:** Markdown prompts and Pi skills; existing TypeScript/Vitest assembly checks; Beads CLI.

**Spec:** `docs/superpowers/specs/2026-11-05-beads-workflow-design.md`

## Global constraints

- Initialize Beads only for new projects; use existing configurations without reinitializing them.
- Preserve project instructions, hooks, trackers, unrelated files, and Git commit authority.
- Keep the TypeScript extension, runtime dependencies, and prompt wrappers unchanged.
- Use Beads for task status; retain useful design and implementation documents.
- Report CLI and database failures explicitly; do not silently substitute another tracker.
- Do not initialize Beads in this existing repository or create Git commits.

## Review focus

- Existing repositories without Beads remain unchanged by task-tracker setup.
- Redirected and worktree-backed Beads configurations are recognized without duplicate initialization.
- Missing CLI or inaccessible database yields an explicit blocker rather than a completion claim.
- Failed verification keeps the issue open with useful context.
- Beads workflow output cannot expand Git commit, push, or destructive-operation authority.

## Task 1: Add setup and everyday workflow guidance

**Files:**

- Modify: `prompts/system.md`, durable everyday task-tracking rules.
- Modify: `skills/setting-up-new-projects/SKILL.md`, new-project setup and handoff.
- Modify: `docs/prompting.md`, maintained behavior and evaluation guidance.
- Test: existing `test/aidan.test.ts` and `test/messages.test.ts`; disposable CLI fixtures and behavior scenarios.

**Interfaces:** Consume the existing prompt loader and skill discovery unchanged. Produce Markdown guidance without new APIs.

- [x] Read applicable execution, skill-authoring, testing, and verification guidance before implementing.
- [x] Record baseline guidance gaps: no Beads setup or tracking instructions existed. Live-model baseline evaluation is unavailable through the enabled tools and remains blocked. Do not substitute substring assertions for behavioral evidence.
- [x] Confirm installation instructions and command flags against current primary documentation and installed CLI help.
- [x] Add a concise task-tracking section to `prompts/system.md`: configuration detection, `bd prime`, issue reuse and claiming, dependencies, blockers, verified closure, scope limits, failure reporting, and unchanged authorization boundaries.
- [x] Add new-project-only setup to the existing skill. Check installed tooling before installing; verify supported flags and side effects. For new standalone projects outside Git, use `BEADS_DIR="$PWD/.beads" bd init --non-interactive --skip-agents --skip-hooks` before initializing Git to avoid the automatic initialization commit observed with `bd` 1.3.2. For already-initialized scaffolds, require a supported commit-free option or authorization. Add project-specific Beads instructions through the skill's existing `AGENTS.md` step. Preserve its existing toolchain and verification requirements.
- [x] Update `docs/prompting.md` with the current behavior and evaluation scenarios for all five review-focus conditions, plus a new-project happy path. Distinguish CLI verification from model compliance.
- [x] Exercise initialization, `bd prime`, create, ready, claim, dependency blocking, and close in a disposable repository. Verify existing instruction files and hooks remain intact and unrelated agent integrations are absent. Record CLI version and results.
- [x] Manually review candidate guidance for missing CLI, existing configured and unconfigured projects, worktree routing, failed verification, and unauthorized commit instructions. Live-model comparisons remain blocked and are documented separately from CLI verification.
- [x] Run `pnpm run format`, `pnpm run typecheck`, `pnpm run lint`, and `pnpm test`. Inspect the complete diff for correctness, scope, unfinished paths, and prose style. Report only observed results.

## Verification results

Repository checks passed: formatting, type checking, linting, all 20 tests, formatting validation, and `git diff --check`. The disposable CLI fixture passed initialization without Git commits, preservation of instructions and hooks, absence of unrelated agent integrations, context loading, create/claim/dependency/close behavior, and redirected workspace resolution with `bd` 1.3.2. Fixture repositories and databases were removed. No commits or tracker initialization were performed in this repository.

Live-model baseline and compliance evaluation remain blocked. Scenario review was manual; a failed-check fixture demonstrates script-controlled issue persistence, not autonomous model compliance. Worktree routing and missing-tool handling have documented agent scenarios but were not exercised through a live agent.

## Plan review

The single task covers the approved guidance change without introducing runtime integration. CLI fixtures verify command behavior and file preservation; assembly tests verify prompt delivery. Neither establishes model compliance. Independent model evaluation requires an authorized evaluation method and must remain an explicit limitation if unavailable.
