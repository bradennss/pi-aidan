# Aidan prompts implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans for inline execution, or superpowers:subagent-driven-development if the user authorizes delegation. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite Aidan's prompts with clear, research-informed structure while preserving injection behavior.

**Architecture:** Retain the two existing handlers and three prompt files. Change the wrapper configuration, rewrite prompt content, and verify the assembled messages with the bundled files.

**Tech Stack:** TypeScript, Pi extension API, Vitest, pnpm, Markdown.

**Spec:** `docs/superpowers/specs/2026-11-05-aidan-prompts-design.md`

## Global constraints

- Preserve injection timing, hidden message types, prompt reloading, and missing-file behavior.
- Use `aidan_system`, `aidan_response_guidance`, and `aidan_completion_check` as wrapper names.
- Add no dependencies, new hooks, or provider-specific configuration.
- Create no commits without a user request.
- Preserve the engineering and writing preferences described in the spec.

## Review focus

- Failed file mutations must not append completion reminders.
- Bundled prompts must assemble correctly without overwriting Pi's base system prompt.
- Context injection must preserve the caller's original messages.
- Intermediate edits must not require a full verification cycle before further work.
- User style overrides and instruction-like external data must remain distinguishable from Aidan defaults.

The first three conditions receive automated coverage. The last two require prompt review and documented model-evaluation scenarios; string assertions cannot verify model behavior.

## Task 1: Rewrite prompts and verify injection

**Files:**

- Modify: `prompts/system.md`, `prompts/before-user.md`, `prompts/after-write.md`.
- Modify: `src/prompts.ts`.
- Test: `test/aidan.test.ts`.
- Create: `docs/prompting.md`.

**Interfaces:**

- Consumes: `createHandlers(promptsDir: string): AidanHandlers` and the existing `PROMPTS` configuration.
- Produces: the same handlers and custom message types, using descriptive outer wrappers and revised prompt content.

- [x] **Step 1: Add failing wrapper and integration tests.** Update existing exact wrapper expectations to the three names in the spec. Add a bundled-prompts test using `PROMPTS_DIR` that checks base-prompt preservation, wrapper placement, `display: false`, and unchanged input messages. Add a handler test with `isError: true` on a write result that confirms no reminder is added.
- [x] **Step 2: Verify the tests fail.** Run `pnpm exec vitest run test/aidan.test.ts`. Expected: failures for the old wrapper names.
- [x] **Step 3: Update wrappers and rewrite the three prompts.** Change only `PROMPTS.*.tag` in `src/prompts.ts`. Structure the system prompt with sentence-case headings, retain the preferences in the spec, and keep reminders brief and conditional on reaching completion. Review the three files together for conflicting or redundant instructions.
- [x] **Step 4: Verify focused behavior.** Run `pnpm exec vitest run test/aidan.test.ts test/messages.test.ts`. Expected: all tests pass.
- [x] **Step 5: Document injection and evaluation.** In `docs/prompting.md`, describe actual message placement and authority, cite the four first-party research sources, explain the design choices, and provide representative before-and-after evaluation scenarios with observable success criteria. Clearly distinguish automated assembly tests from model behavior that has not been measured.
- [x] **Step 6: Verify the full change.** Run `pnpm run format && pnpm run typecheck && pnpm run lint && pnpm test`, stopping dependent steps on failure. Inspect the full tracked diff and new files. Review instruction precedence, retained preferences, and documentation style. Report any checks that could not run.

## Plan self-review

The single task covers the approved prompt, wrapper, test, and documentation scope. Existing loader and mutation-detection contracts remain unchanged. Automated tests cover transport behavior; manual scenarios cover prompt semantics without asserting that wording alone proves compliance. Commit and push require a separate user request. Live-model evaluation is outside this plan.

## Execution record

- The user selected inline execution in the current checkout on `main` and subsequently requested a commit and push.
- Baseline: 18 tests passed. The wrapper test run then failed in four expected places before the implementation changed.
- Focused verification after the wrapper and prompt updates: 20 tests passed.
- Final project checks: formatting, type checking, lint, and all 20 tests passed. The tracked diff and new documentation were reviewed for scope, instruction precedence, retained preferences, and writing style.
- Review was performed inline by the author. No independent review was run.
- Live-model scenarios remain unverified. The checks establish assembly behavior, not improved model performance or end-to-end agent compliance.
