# Writing-docs Implementation Plan

> **Execution update:** The user subsequently removed tests and special licensing/checksum machinery. Follow the scope update in the design: ship the skill and examples without evaluation files, checksum manifests, or new tests. Keep copied sources' attribution/notices. Work directly on `main`; commit and push when finished, as subsequently requested. The checklists below preserve the original plan rather than imply those canceled steps remain required.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a documentation-writing skill for public and internal engineering docs with varied examples and a licensed full-page reference collection.

**Architecture:** Keep shared guidance in a compact `SKILL.md` and load document-type advice and examples on demand. Bundle complete upstream sources separately from annotations and retain their licenses and provenance.

**Tech Stack:** Markdown, upstream reStructuredText/Markdown sources, Pi Agent Skills, existing pnpm verification tools. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-07-writing-docs-design.md`

## Global Constraints

- Support public developer documentation and internal engineering documentation.
- Target fewer than 500 words in `SKILL.md`, excluding frontmatter.
- No new runtime dependency or extension code is needed.
- Keep annotations outside snapshots.
- Preserve each work's license and attribution without suggesting all collection contents have one license.
- Never invent commands, defaults, guarantees, owners, or operational thresholds.
- Do not perform destructive or shared-system actions merely to verify documentation.
- Keep small edits small.

## Review Focus

- Missing product facts: surface unknowns rather than fabricate plausible instructions; test in Task 1's quickstart scenario.
- Non-2xx HTTP responses: distinguish HTTP failure from network rejection; test in Task 1's reference scenario.
- Destructive operations without reliable rollback: state authorization, stop conditions, and irreversibility; test in Task 1's runbook scenario.
- Source pages using includes or separately licensed assets: supply necessary companions or choose another page; check in Task 2.
- Narrow edits: preserve accurate surrounding material without expanding into a new guide; test in Task 1's onboarding scenario.

---

### Task 1: Establish behavioral baselines

**Files:** Create `docs/evals/writing-docs.md`.

**Interfaces:** Produces fixed scenario prompts, evaluation criteria, and actual baseline observations for Task 3. No skill content exists yet.

- [ ] Read writing-skills' discovery and testing references and official authoring guidance. Track its applicable creation checklist in the evaluation file or an available task tool.
- [ ] Define seven fixed scenarios with explicit supplied facts: a quickstart missing an install command; HTTP reference distinguishing network and HTTP errors; a conceptual explanation; failed-command troubleshooting; architecture with uncertain ownership; a destructive runbook without guaranteed rollback; a narrow onboarding edit.
- [ ] Define checkable criteria per scenario: use only supplied facts, retain the requested page purpose, provide appropriate examples and success checks, explain relevant failures, respect authorization, and stay proportional. The onboarding edit must not rewrite unrelated sections.
- [ ] Run fresh-context baselines without the new skill using the operator-approved execution method. If that method does not authorize model testing, request authorization rather than silently delegating. Save outputs or durable artifact paths and record observed failures, including representative exact wording. A passing baseline is not a failure to be manufactured.
- [ ] Identify which failures need a positive writing recipe, a required structural field, or a conditional safety instruction. Do not write guidance for hypothetical failures merely to enlarge the skill.

### Task 2: Assemble a complete, licensed source library

**Files:** Create `skills/writing-docs/references/source-pages/README.md`, selected source files, and companion/license files beneath that directory. Add or modify `.prettierignore` only if required to protect snapshot bytes.

**Interfaces:** Consumes the design's candidate list. Produces stable local paths and teaching notes for Task 3 to link to.

- [ ] Read each candidate in full and inspect its canonical source and actual license at the same immutable revision. Select five distinct examples from Django, MDN, Vue, Laravel, and the Rust Book if suitable. Link Stripe as an additional influence unless full-page redistribution permission is established.
- [ ] Save the complete canonical page sources with recognizable names and original extensions. Resolve required code includes and inspect essential image rights. Do not use truncated fetch/search output as a full copy.
- [ ] Retain upstream notices and license texts. In the manifest record title, author, public and pinned source URLs, revision, retrieval date, license, changes, companions, and the specific writing technique to study. Explain source-format limitations and relative upstream links.
- [ ] Compare local snapshot bytes with downloaded pinned sources using checksums or direct comparison. Verify every required include has a companion or is explicitly resolved in a clearly labeled derived copy. Record the comparison method and result.
- [ ] Protect snapshots, companions, and licenses from automatic reformatting with a scoped ignore if necessary. Confirm that original local files still compare equal after running the formatter. Do not exempt original skill prose from formatting.

### Task 3: Write and test the skill and original examples

**Files:** Create `skills/writing-docs/SKILL.md`, `skills/writing-docs/references/document-types.md`, and `skills/writing-docs/references/examples.md`. Update `docs/evals/writing-docs.md`.

**Interfaces:** Consumes actual Task 1 failures and Task 2 source paths. Produces the discoverable `writing-docs` skill; package registration already exists.

- [ ] Write frontmatter with `name: writing-docs` and a third-person description beginning `Use when...` covering writing, revising, and reviewing public and internal docs. Keep the description within 1024 characters and focused on triggers, not workflow.
- [ ] Write a core workflow for reader/outcome, document purpose, factual grounding, concrete drafting, and verification. Route explicitly to document-type guidance, original examples, and selected source pages only when useful. Keep the body below the design's 500-word target.
- [ ] Write document-type guidance for quickstart/tutorial, how-to, explanation, API/CLI reference, troubleshooting, architecture/decisions, runbooks, and onboarding. Explain what each page must accomplish rather than enforcing one template. Include operational authorization, stop conditions, and recovery limitations where relevant.
- [ ] Write varied original before-and-after examples with commentary: a practical instruction, a conceptual explanation, an API entry, a troubleshooting entry, an architecture explanation, an operational procedure, and an onboarding edit. Label fictional product behavior and illustrative output; use coherent concrete examples rather than many languages or empty templates.
- [ ] Micro-test behavior-shaping wording against a no-guidance control with at least five fresh-context samples per variant where the writing-skills method requires it. Read the outputs manually and record results, not just keyword counts.
- [ ] Rerun the fixed scenarios with the skill and relevant references. Compare with baseline criteria and record actual results, including remaining failures. Refine the guidance to address observed problems and repeat affected scenarios. Do not claim passing agent evaluations without executing them.

### Task 4: Verify packaging and repository checks

**Files:** Review all Task 2–3 files and update `docs/evals/writing-docs.md` with verification evidence.

**Interfaces:** Consumes the finished skill library and produces a verified deliverable with explicit limits.

- [ ] Validate frontmatter, body word count, relative reference paths, snapshot manifest entries, license files, and code/asset companions. Check that the package's existing `files` and `pi.skills` declarations include the skill without changing runtime code.
- [ ] Run `pnpm run format`, then recheck source snapshot integrity. Run `pnpm run typecheck`, `pnpm run lint`, and `pnpm test`; inspect complete results and report failures rather than weakening checks.
- [ ] Inspect `git diff --check`, `git diff --stat`, and the final diff, including new files. Confirm no unrelated edits or claims of universal correctness slipped in.
- [ ] Review a fresh documentation output against the skill: it should use the right page form, state unknowns honestly, teach rather than imitate, and stay concise. Use an independent reviewer only with operator authorization.
- [ ] Summarize files, full-page selections, verification evidence, and remaining limitations. Leave committing and pushing to the operator's chosen integration workflow; do not publish third-party content or push a branch without authorization.
