# Using the Browser Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a discoverable agent-browser skill with fallback routing and installation consent.

**Architecture:** One self-contained Markdown skill in the package's existing skills directory. No runtime code changes.

**Tech Stack:** Pi Agent Skills, Markdown, agent-browser CLI.

**Spec:** `docs/superpowers/specs/2026-06-09-using-the-browser-design.md`

## Global Constraints

- Ask before installing agent-browser; wait for permission.
- No new dependencies or helper scripts.
- Browser fallback does not authorize bypassing access controls or unapproved external actions.

## Review Focus

- Explicit browser requests select the skill without a prior web-tool failure.
- Failed curl/web retrieval switches to browser rather than repeating blocked requests.
- Missing CLI prompts for consent; refusal causes no installation, including npx.
- Element references are refreshed after page changes.
- Login/CAPTCHA/access blocks are reported, not bypassed.

## Task 1: Author and verify the skill

**Files:** Create `skills/using-the-browser/SKILL.md`. **Interfaces:** Pi discovers name and trigger description through the registered `./skills` directory.

- [x] Read skill-authoring/TDD guidance and installed CLI core guidance.
- [x] Define scenarios for all five Review Focus cases; run a test subagent without the new skill and record baseline omissions verbatim.
- [x] Classify baseline failures and choose conditional instructions for routing/consent and a positive recipe for browser usage.
- [x] Write valid matching name/directory and frontmatter; description begins “Use when” and names browser tasks, curl, web search/fetch failures, blocks, and rendered pages.
- [x] Write concise overview, installation gate, workflow, quick reference, one example, and common mistakes; keep commands inline and avoid unnecessary supporting files or flowcharts.
- [x] Run the same scenarios with the skill. Check routing, consent, refusal, refreshed refs, and access boundaries; record any gaps and retest refinements. For behavior-shaping wording, compare five fresh samples with and without guidance; manually inspect responses.
- [x] Verify examples against CLI help and a harmless local page; run `pnpm run format`, `pnpm run typecheck`, `pnpm run lint`, and `pnpm test`.
- [x] Inspect diff and report results and limitations. Do not push or commit without user authorization; consider upstream contribution only if requested.

## Verification record

- Five fresh-context baseline samples covered explicit browser usage, blocked HTTP/JS retrieval, missing CLI under urgency, installation refusal, and stale refs with login/CAPTCHA. All already respected consent and access boundaries. All omitted session isolation and CLI guidance; representative exact commands were `agent-browser open https://example.com` and `agent-browser get title`.
- Five fresh-context guided samples covered the same cases. All checked version/core guidance, used named sessions for browsing, switched to rendered content, asked before installation, honored refusal, and refreshed snapshots without bypassing access checks. These are simulated response tests, not live-site end-to-end tests or a measurement of automatic skill discovery.
- With agent-browser 0.41.1, a local HTML page verified open, snapshot, title, observed-ref click, text wait, updated snapshot/body text, screenshot, and session-only close. No software was installed.
- `pnpm run format`, `pnpm run typecheck`, `pnpm run lint`, and `pnpm test` passed; 20 tests across 2 files.
- Independent read-only review found no Critical, Important, or Minor issues. Live external-site authentication and actual installation were not exercised; the skill does not claim they were.
- Implementation is directly on `main` as requested. The user subsequently authorized committing and pushing the completed change. No extension-code or dependency changes.
