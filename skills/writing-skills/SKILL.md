---
name: writing-skills
description: Write, review, and revise agent skills (SKILL.md files and their bundled references and scripts). Use when creating a new skill, editing an existing one, fixing a skill that never triggers or gets ignored, or deciding how to split skill content across files.
---

# Writing skills

A skill is a directory with a `SKILL.md`. Only `name` and `description` sit in the system prompt at startup; the body is read when the agent decides the skill is relevant, and bundled files are read after that. Write for that loading order.

## Workflow

1. Do the task once without a skill. Note every piece of context you had to supply by hand: paths, field names, ordering rules, gotchas.
2. Write down three concrete scenarios the skill must handle, with what a good answer looks like. These are the evaluations.
3. Write the smallest `SKILL.md` that covers the noted gaps.
4. Run the three scenarios in a fresh session with the skill loaded.
5. Fix what actually failed. Repeat from step 4.

Skip step 1 and you document imagined problems.

## Frontmatter

```yaml
---
name: writing-skills
description: What it does and when to use it.
---
```

`name`: 1-64 chars, lowercase letters, digits, hyphens; no leading, trailing, or doubled hyphens. Prefer gerunds: `processing-pdfs`, `analyzing-spreadsheets`. Avoid `helper`, `utils`, `tools`, `data`.

`description`: max 1024 chars, and the single most important line in the file. It decides whether the skill ever loads. Say what the skill does, then name the triggers in the words a user would use.

Good:

> Extracts text and tables from PDFs, fills form fields, merges and splits files. Use when working with PDF documents or when a user mentions AcroForm fields.

Bad:

> Helps with PDFs.

Optional fields pi supports: `license`, `compatibility`, `metadata`, `allowed-tools`, `disable-model-invocation`.

## Body

Keep `SKILL.md` under 500 lines. Assume the reader is a competent engineer who knows the language, the library, and the domain. Include only what it cannot know: your table names, your naming conventions, the rule about excluding test accounts, the sequence that breaks when reordered.

Cut any paragraph that explains a general concept. Cut any sentence that restates the heading above it.

When the body outgrows 500 lines, move detail into sibling files and link them from `SKILL.md`:

```
my-skill/
├── SKILL.md              # overview + navigation
├── reference/
│   ├── finance.md
│   └── sales.md
└── scripts/
    └── validate.py
```

Link every reference file directly from `SKILL.md`. A file reachable only through another reference gets skimmed with `head` instead of read, so its later sections are effectively invisible. Give reference files longer than 100 lines a table of contents at the top.

Use forward slashes in every path, including on Windows.

## Degrees of freedom

Match specificity to how easily the task breaks.

- Many valid approaches, context decides: give direction and heuristics in prose.
- A preferred pattern with acceptable variation: give pseudocode or a parameterized script.
- Fragile, order-dependent, or destructive: give an exact script and an exact sequence, with no options.

Do not list three ways to do the same thing. Pick one and say so. If an alternative genuinely matters, gate it on a condition ("if the file is larger than 100 MB, use ...").

## Workflows and validation

For multistep tasks, write numbered steps the agent can copy into its response and tick off. For anything quality-critical, add a loop: produce output, run the validator, fix what it reports, run it again. The validator can be a script or a `STYLE_GUIDE.md` the agent compares against.

For batch or destructive operations, have the agent write a plan file first, validate the plan, then execute. Errors surface before anything is modified.

## Scripts

Prefer a bundled script over instructions telling the agent to write one: it is more reliable, costs no context, and behaves the same every run. State whether the agent should run the script or read it. Running is the default.

Scripts must handle their own error cases rather than printing something vague and leaving the agent to guess. Validation failures should name the problem and the valid options: `Field 'signature_date' not found. Available: customer_name, order_total, signature_date_signed`.

Justify every constant in a comment. If you can't say where `max_retries = 7` came from, the agent reading it can't either.

List required packages in `SKILL.md`, and do not assume they are installed.

## Terminology and durability

Pick one word per concept and repeat it. Mixing "field", "box", and "control" for the same thing costs the reader a lookup every time.

Leave out anything dated: version numbers that will bump, "currently", "the new API", "as of 2025". If old behavior matters, put it under an "Old patterns" heading so the main flow stays correct.

## Review checklist

- Description names both the capability and the trigger words.
- Body under 500 lines, no general-knowledge filler.
- Every reference file linked directly from `SKILL.md`.
- Reference files over 100 lines have a table of contents.
- Examples are concrete, taken from real runs.
- One term per concept throughout.
- No version numbers or dated claims outside an "Old patterns" section.
- Forward slashes everywhere.
- Scripts fail with actionable messages; constants explained.
- Three evaluations run against a fresh session.
