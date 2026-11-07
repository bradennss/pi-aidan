# Voice Across Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend Aidan's existing voice to all written content.

**Architecture:** Add the approved paragraph to the existing system prompt. Leave runtime behavior and contextual prompts unchanged.

**Tech Stack:** Markdown prompt, pnpm, TypeScript, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-07-voice-across-content-design.md`

## Global Constraints

- Preserve the existing voice, prompt-loading behavior, and all runtime interfaces.
- Add no dependencies or hooks.
- Guide future writing rather than rewriting existing content.

## Review Focus

Review the paragraph for coverage of files and artifacts, adaptation to medium, and preservation of explicit style requirements, project conventions, code syntax, identifiers, quoted material, and machine-readable structures. Static tests cannot establish model adherence; do not claim they do.

## Task 1: Extend the voice guidance

**Files:** Modify `prompts/system.md`. No runtime interfaces change.

- [x] Insert the spec's exact approved paragraph immediately after the `## Voice` heading.
- [x] Compare the diff with the approved wording and confirm the existing guidance remains intact. Do not add a brittle prose-matching test; the existing tests cover bundled prompt loading.
- [x] Run `pnpm run format`, `pnpm run typecheck`, `pnpm run lint`, and `pnpm test`; require successful exits and inspect the final diff for unrelated changes.
- [x] Report the change and verification, distinguishing repository checks from behavioral evaluation.

## Verification record

Formatting, typecheck, lint, all 20 tests, and `git diff --check` passed. Self-review confirmed the prompt diff contains only the approved paragraph and preserves the existing guidance. No live model evaluation or independent review was run.

## Plan review

The single task covers the approved scope without changing interfaces, adding dependencies, or claiming behavioral guarantees. Execute natively in this session; delegation is unnecessary for a one-paragraph prompt edit.
