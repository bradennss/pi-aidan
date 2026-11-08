# Aidan Principles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Give Aidan practical coding and writing principles through its existing prompt hooks.

**Architecture:** Put the stable policy in the system prompt and a short review reminder after file mutations. Do not change the injection machinery.

**Tech Stack:** Markdown, TypeScript, Vitest, pnpm.

**Spec:** `docs/superpowers/specs/2026-11-07-aidan-principles-design.md`

## Global Constraints

- Keep the runtime, dependencies, and public APIs unchanged.
- `prompts/before-user.md` stays empty to avoid repeating policy on every request.
- Injection tests establish delivery, not behavioral compliance.

## Review Focus

- No mutation: system policy remains available without a completion reminder.
- Failed mutation: no completion reminder implies the write succeeded.
- Successful edit: reminder is delivered, not just after full-file writes.
- Repeated requests: source messages remain unchanged and reminders do not accumulate.
- Prompt content: completeness and brevity do not justify fake success, missing contracts, or omitted necessary documentation. Review this manually; string matching cannot establish semantic compliance.

## Task 1: Ship the bundled policy and completion check

**Files:**

- Modify: `prompts/system.md` — stable coding and writing policy.
- Modify: `prompts/after-write.md` — concise review check.
- Modify: `test/aidan.test.ts` — bundled-prompt delivery tests.

**Interfaces:**

- Consumes: `createHandlers(promptsDir: string): AidanHandlers` and `PROMPTS_DIR`.
- Produces: nonempty system and reminder files, delivered through unchanged hooks.

- [x] Add bundled-prompt tests beside the existing bundled assembly test. Use `createHandlers(PROMPTS_DIR)` with the existing `startAgent`, `run`, `user`, and `writeResult` helpers. Assert system guidance is wrapped in `aidan_system`; with only a user message, `run` returns undefined; with a failed write, it returns undefined; with a successful edit (`{ ...writeResult(), toolName: "edit" }`), the returned roles are `["user", "toolResult", "custom"]` and the custom message is `aidan-reminder` containing `aidan_completion_check`. Call `run` twice with the same input and assert equal outputs, one custom message per output, and unchanged source messages. Keep the existing successful-write assembly test.
- [x] Run `pnpm test`. Confirm bundled assembly fails because the system prompt is empty; the new successful-edit case must also fail because the reminder is empty.
- [x] Fill `prompts/system.md` with the five approved principles. Include the distinctions in the spec: current requirements versus speculative features, hidden complexity versus tiny files, complete production behavior versus test doubles, plain language versus lost precision, necessary documentation versus duplication. Start with Aidan's identity. Use short sections and concrete guidance; do not prescribe an elaborate workflow.
- [x] Fill `prompts/after-write.md` with a short check for scope, public contracts, unfinished behavior, unnecessary prose, and verification. Keep it a review reminder, not a demand for a visible checklist or a claim that the whole task is finished.
- [x] Run `pnpm test`; expect all tests to pass. Read both prompts against the spec and the five review-focus conditions. This is a policy review, not a live behavioral evaluation.
- [x] Run `pnpm run format`, `pnpm run typecheck`, `pnpm run lint`, and `pnpm test`; expect successful exits. Inspect `git diff --check` and `git diff` for unrelated changes.
- [x] Commit the prompt, test, spec, and plan changes with `feat: define Aidan coding and writing principles`.

## Behavioral follow-up

When live model evaluation is available, compare outputs on five tasks: a narrow bug fix (no unrelated cleanup), a module design (small contract with hidden internals), blocked implementation (honest blocker, no fake success), a simple question (direct answer), and a documentation change (only useful information, in plain language). Include a case requiring an invariant comment so restraint does not become a ban on comments. Record model, inputs, outputs, and judgments before claiming behavioral improvement.
