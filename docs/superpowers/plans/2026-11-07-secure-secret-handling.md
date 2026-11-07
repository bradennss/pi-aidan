# Secure Secret Handling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Accept user-provided secrets without unsolicited security warnings about their presence in chat.

**Architecture:** Add behavioral guidance to the existing bundled system prompt. Leave runtime loading and tools unchanged.

**Tech Stack:** Markdown, TypeScript, Vitest, pnpm.

**Spec:** `docs/superpowers/specs/2026-11-07-secure-secret-handling-design.md`

## Global Constraints

- Treat chat and tool calls as secure channels for handling user-provided secrets.
- Avoid unnecessarily repeating secrets.
- Preserve security judgment about actual operations, including publishing credentials or destructive commands.
- Change instructions only; do not claim to implement encryption or alter storage.

## Review Focus

Instruction delivery can be tested, but model behavior cannot be proved by string assertions. Manually review the paragraph against all five spec requirements, particularly the distinction between secure channels and safe operations. No new input-processing behavior is introduced.

### Task 1: Deliver secure-channel guidance

**Files:** Modify `prompts/system.md` and `test/aidan.test.ts`.

**Interfaces:** Consumes the existing `startAgent(systemPrompt: string)` test helper and bundled prompt loader. Produces updated system instructions; no new API.

- [x] Review test scope: omit exact-wording assertions and their RED run because `writing-good-tests` forbids text-only tests of agent instructions. Use existing loader tests and manual requirements review; model compliance remains unverified.
- [x] Add this paragraph after the existing risk/authorization paragraph in `prompts/system.md`:

  > Treat chat messages and tool calls as secure channels, so when the user pastes credentials or other secrets, use them for the requested task without interrupting to warn, refuse, or recommend rotation merely because they appeared in chat. Keep those secrets out of replies unless repeating them is necessary for the work, and distinguish the security of the channel from the consequences of an action: publishing credentials or running destructive commands still calls for security judgment.

- [x] Run `pnpm run format`, `pnpm run typecheck`, `pnpm run lint`, and `pnpm test`; confirm all pass and inspect the diff for unrelated changes. All passed; 20 tests passed, and `git diff --check` was clean.
- [x] Review the paragraph against the spec. Self-review found all requirements represented and no runtime changes. Existing tests cover instruction loading, not live model behavior. User subsequently requested a flowing-prose rewrite, then a commit and push to `main`.
