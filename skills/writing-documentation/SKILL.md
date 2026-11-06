---
name: writing-documentation
description: Use when creating, updating, or reviewing documentation or explanatory code comments, including READMEs, setup guides, tutorials, API references, runbooks, architecture notes, and contributor guides. Also use when code changes affect documented behavior or existing instructions are unclear, stale, or incomplete.
---

# Writing documentation

Write for someone who needs to use, operate, or maintain the system without access to the editing conversation. Give them the information they need to act correctly, in the order they need it.

Follow the [Google developer documentation style guide](https://developers.google.com/style/). Apply the rules below for everyday writing; consult the guide for uncertain usage. Preserve exact identifiers and quotations.

## Choose what belongs

Maintain documentation when required or when it helps readers complete a task or understand a consequential constraint. Prefer updating an existing document over adding another source of truth. Match the depth to the audience and task.

Keep transient findings, approvals, progress, and check results in the tracker or response unless a required record serves an operational or audit need. Include history only when it helps readers act correctly. Explain the current system rather than narrating the editing session.

## Organize around the reader's task

- Lead with the purpose or answer. State prerequisites before the steps that depend on them.
- Use descriptive, sentence-case headings. Keep paragraphs focused on one idea.
- Use numbered lists for ordered procedures, bullets for genuine sets, and tables for comparisons or repeated fields. Prefer prose for explanations.
- Start each procedure step with an action. Put conditions before instructions and warnings before risky actions. Include expected results and recovery guidance where readers need them.
- Make examples usable: identify the working directory, explain placeholders, and distinguish commands from output. Verify commands and factual claims against the implementation or observed behavior; label unverified assumptions.

## Write plainly and precisely

Use active voice, present tense, and second person: “Run the command,” rather than “The command should be run by the user.” Name the actor when it matters. Use direct imperatives for instructions.

Choose familiar, concrete words and short sentences. Define unfamiliar acronyms on first use and use one term consistently for each concept. Use inclusive language that works for a global audience; avoid idioms, humor, and assumptions about readers' abilities or environment.

Remove filler, repetition, inflated claims, and unnecessary introductions or summaries. Avoid em dashes, emoji, and “not X, but Y” constructions. State requirements, recommendations, and options distinctly with “must,” “should,” and “can.”

## Format for scanning and access

Use code formatting for identifiers, paths, commands, and literal values; fenced code blocks with language labels for examples; and bold for UI labels. Use descriptive link text instead of “click here.” Give meaningful images alt text, and do not rely on color or position alone to convey information.

For explanatory comments, describe reasoning, constraints, or surprising behavior that the code cannot express. Keep comments accurate and close to the relevant code rather than restating it.

Before finishing, read the result as a newcomer: can they find the answer, follow the steps, and distinguish supported behavior from assumptions?
