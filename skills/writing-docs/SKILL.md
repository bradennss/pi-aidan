---
name: writing-docs
description: Use when writing, revising, or reviewing public developer documentation or internal engineering docs, including READMEs, quickstarts, tutorials, how-to guides, API and CLI references, explanations, troubleshooting, architecture docs, decision records, runbooks, and onboarding guides.
---

# Writing Docs

Good documentation helps a particular reader do something or understand something. Give each page a clear job, explain what the reader needs at that point, and ground product claims in evidence.

## Start with the reader's task

Read the request, existing docs, and relevant code or configuration. Establish the reader's goal, starting knowledge, and product version. Infer what the context answers; ask only when an unresolved question would change the document.

Choose the page's primary job using [Document types](references/document-types.md). A tutorial teaches through a guided task; a how-to solves a known problem; an explanation builds understanding; reference describes a contract. Internal docs need the same clarity, not a separate corporate voice.

For a narrow edit, change only what needs changing. Don't turn a corrected command into a rewritten onboarding guide.

## Write from evidence

Use code, tests, configuration, and authoritative sources to establish behavior. Keep facts distinct from proposals and unknowns. Missing installation instructions, ownership, or recovery guarantees are gaps to resolve or state—not invitations to invent plausible details.

Write the page around its outcome:

- Lead with the answer, purpose, or result; use headings readers can recognize and search for.
- Put prerequisites before actions. Name files, working directories, inputs, and meaningful outputs.
- Introduce a concept beside the example that needs it. Explain the explicit mechanism before its shortcut.
- Prefer one coherent example to a catalog of variations. Show realistic failure handling and the limitations that affect the task.
- Give steps in execution order and explain how readers know they worked. Put warnings before the action they qualify.
- Use direct, natural prose. Cut ceremonial introductions, marketing claims, unnecessary jargon, and conclusions that repeat the page.

Use [Before-and-after examples](references/examples.md) for concrete revisions. When a writing problem needs a deeper model, choose a relevant [Full-page example](references/source-pages/README.md). Learn from its structure and reasoning; don't import another product's facts or load every source page by default.

## Review as the reader

Trace the instructions from the stated starting point. Check names, commands, links, defaults, examples, and important edge cases against the sources. Distinguish examples you ran from ones you only inspected. Writing documentation doesn't authorize destructive operations or changes to shared systems.

For operations, make authorization, scope, stop conditions, recovery limits, and escalation explicit. For architecture, explain boundaries and failure paths, not just components. Use the relevant document-type guidance rather than forcing every page into one template.

Common mistakes are mixing incompatible page purposes, burying the result, presenting assumptions as guarantees, and adding process or warnings that the task doesn't need. The final check is practical: can this reader reach the outcome without guessing?
