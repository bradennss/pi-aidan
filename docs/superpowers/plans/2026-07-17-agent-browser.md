# Agent-browser guidance implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved website-interaction guidance to Aidan.

**Architecture:** Extend the bundled system prompt. Preserve the existing injection path and dependencies.

**Tech Stack:** Markdown prompts, TypeScript extension, pnpm, Vitest.

**Spec:** `docs/superpowers/specs/2026-07-17-agent-browser-design.md`

## Global constraints

- Do not add dependencies, install a browser, or change prompt injection code.
- Changing tools must preserve explicit access restrictions and authentication requirements.

## Review focus

Review prose for website interaction, rendering failures, tool limitations, unavailable tooling, and access boundaries. Automated wording assertions cannot establish model tool choice; retain existing injection coverage and report that limit.

### Task 1: Update and verify the system prompt

**Files:** Modify `prompts/system.md`.

**Interfaces:** Existing prompt loading and injection remain unchanged.

- [x] Add concise guidance preferring `agent-browser` for website interaction and as a retrieval fallback, with skill/help discovery, availability handling, and access boundaries.
- [x] Review the full diff against the approved scope and prose rules.
- [x] Run `pnpm run format`, `pnpm run typecheck`, `pnpm run lint`, and `pnpm test`; investigate any failures.
- [x] Report observed checks and the lack of live model-behavior verification. Do not commit without authorization.

## Verification results

Formatting, type checking, lint, all 20 tests, and `git diff --check` passed. The author reviewed the prompt diff against all five review cases. No live browser session or model tool-choice evaluation was run. No runtime code or tests changed; this is a prompt-only update.
