# Writing-docs skill design

> **Scope update:** During implementation, the user explicitly removed tests and special licensing/checksum machinery from the task. The delivered skill keeps the core workflow, document-type guidance, varied original examples, full source pages, and their existing attribution/notices. Evaluation files, checksum manifests, and new automated tests are not deliverables. Work stays on `main`; the user subsequently authorized committing and pushing the finished changes. The original design below records the earlier proposal; this update overrides its validation and source-management requirements.

## Intent

Create a reusable `writing-docs` skill for public developer documentation and internal engineering documentation. Help an agent produce accurate, useful prose that lets a reader accomplish a task or understand a system, rather than imitate the appearance of good documentation.

The user approved a compact core skill with task-specific references, varied original examples, and complete upstream pages selected for their teaching strengths.

## Approaches

- One comprehensive skill file: simple discovery, but loads irrelevant guidance and long examples for every task.
- **Compact skill with a reference library (approved):** shared writing standards in `SKILL.md`; document-specific guidance and complete examples loaded when relevant.
- Separate public and internal skills: narrower triggers, but duplicates standards and complicates mixed tasks.

## Goals

Combine Django's separation of document purposes, Stripe's task orientation, MDN's precision, Vue's progressive explanations, Laravel's readable organization, and the Rust Book's mental-model building.

Support quickstarts, tutorials, how-to guides, conceptual explanations, API/CLI reference, troubleshooting, architecture explanations, operational runbooks, and onboarding. Treat architecture decisions as decisions with context and consequences, not just descriptions of components.

Preserve the project's voice: direct, natural prose, useful examples, no ceremonial introduction or generic conclusion. Follow existing project conventions before introducing new documentation structure. Keep small edits small.

## Structure

- `skills/writing-docs/SKILL.md`: triggers, core workflow, reference routing, and completion checks. Target fewer than 500 words, excluding frontmatter.
- `references/document-types.md`: the job and essential contents of each document type, with public/internal distinctions where useful.
- `references/examples.md`: original before-and-after examples spanning instructions, concepts, reference, troubleshooting, architecture, operations, and onboarding. Explain why each revision works. Label fictional systems and illustrative output explicitly.
- `references/source-pages/README.md`: source manifest and separate teaching notes linking to relevant full-page snapshots.
- `references/source-pages/`: complete selected page sources, accompanying assets where needed, and license notices. Do not silently substitute excerpts for full pages.
- `docs/evals/writing-docs.md`: reproducible behavior scenarios, scoring criteria, baseline observations, and guided results. Evaluation records stay outside the distributed skill.

No new runtime dependency or extension code is needed: `package.json` already includes and registers `skills/`.

## Writing workflow

1. Establish the reader, desired outcome, existing knowledge, and relevant product/version. Infer these from the request and repository; ask only when unresolved information changes the result.
2. Choose the page's primary job. Link between jobs instead of mixing a tutorial, reference manual, and architecture essay into one page.
3. Gather evidence from code, tests, configuration, and authoritative docs. Separate verified facts, assumptions, and unknowns. Never invent commands, defaults, guarantees, owners, or operational thresholds.
4. Write the smallest useful page. Put prerequisites before actions, explain new concepts near examples, and include observable success and realistic failure recovery where relevant.
5. Check accuracy, examples, links, and whether the intended reader can finish the task. Run safe examples where possible; distinguish executed checks from unverified instructions. Do not perform destructive or shared-system actions merely to verify documentation.

Runbooks additionally need scope, authorization/preconditions, diagnostic signals, stop conditions, recovery/rollback limitations, and escalation. Do not imply every destructive action can be rolled back. Internal docs need concrete boundaries and maintenance information when available, not invented ownership metadata.

## Source library

Prefer a small, varied collection over one page per brand. Initial candidates:

- Django: “Writing your first Django app, part 1” (`docs/intro/tutorial01.txt`) for guided progression.
- MDN: “Using the Fetch API” for precise behavior and error handling.
- Vue: “Computed Properties” for concepts introduced alongside examples.
- Laravel: “Configuration” for scannable practical reference.
- Rust Book: “Recoverable Errors with Result” for explanatory prose and mental models.
- Stripe: link to an appropriate integration guide and discuss its task structure; bundle a full page only if redistribution permission can be established.

These are builder selections, not user-mandated titles. Confirm that each page teaches a distinct useful pattern after reading it in full; replace unsuitable candidates and explain the selection in the manifest.

Fetch canonical source files at pinned revisions and retain the complete content, including code. Resolve source includes needed to understand a page, especially Rust listings. Explain source-format directives rather than deleting substantive material. Distinguish a complete page source from a rendered, self-contained page. Preserve asset references; include essential assets only after checking their separate licenses, or select a page that does not depend on them.

Record title, author/attribution, public URL, canonical source URL, immutable revision, retrieval date, license, modification status, and companion files. Keep annotations outside snapshots. Preserve upstream snapshots and licenses from automatic formatting so their integrity can be verified against the source bytes.

Licensing findings to recheck at the selected revision: Django uses BSD-3-Clause; MDN prose uses CC-BY-SA 2.5 with distinct code-example terms; Vue docs use CC BY 4.0 and exclude images from that grant; Laravel docs use MIT; the Rust Book offers MIT/Apache licensing. Do not infer documentation rights from a project's software license. Preserve each work's license and attribution without suggesting all collection contents have one license.

## Validation

Evaluate behavior before and after the skill on the same scenarios: public quickstart with missing facts, precise API reference, conceptual explanation, failed-command troubleshooting, internal architecture with uncertain ownership, destructive runbook, and a small onboarding edit.

Score factual grounding, page purpose, reader progression, useful examples, observable success/failure, operational safety, and proportionality. Record actual failures and adjust guidance to those failures. Independent model runs require operator authorization; do not invent or claim behavioral results if they cannot be run.

Check skill discovery/frontmatter, relative links, source completeness, licenses, and whether referenced listings are available. Run repository format, typecheck, lint, and tests after related edits. Keep vendored source bytes unchanged using scoped formatter exclusions when needed.

## Non-goals and anti-goals

No documentation generator, universal page template, mandatory metadata on every page, automatic source updater, or wholesale repository documentation rewrite. No brand imitation, decorative prose, fabricated verification, excessive safety warnings for harmless examples, or loading the entire source collection for a small edit.

## Approval and remaining choices

The user approved the scope and compact-core/reference-library approach in conversation. This document records that design. Exact source revisions, final page selection, original example subjects, and scenario wording remain implementation choices within these constraints.
