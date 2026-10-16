---
name: writing-plans
description: Create and self-review implementation plans from approved requirements before coding. Use when the user asks for a plan or when an approved brief requires a coordinated multi-step change.
---

# Writing plans

Turn settled requirements into a plan another engineer can execute without rediscovering design decisions.

## Entry conditions

1. Confirm the request has an approved brief or sufficiently complete requirements: goal, observable behavior, important failures, constraints, exclusions, and success criteria.
2. If a decision that affects behavior, compatibility, data, scope, or risk remains open, use `brainstorming` and don't write the plan yet.
3. Skip a written plan for a small, obvious change unless the user explicitly requests one.
4. Inspect the relevant code, tests, configuration, repository instructions, and current primary documentation. Resolve file paths, symbols, interfaces, and verification commands from repository evidence.
5. Don't change implementation files while planning.

## Write the plan

Save the plan as `docs/plans/YYYY-MM-DD-<short-kebab-case-name>.md`. Create `docs/plans/` when needed. If that path conflicts with repository instructions, follow the repository and state the chosen path.

Start with:

```markdown
# <Feature> Implementation Plan

**Goal:** <one sentence> **Source:** <approved brief, issue, design document, or requirements in the current conversation>

## Global constraints

- <exact project-wide requirement>

## Assumptions

- <decision inferred from incomplete implementation detail and its user-visible consequence>

## Review focus

- <likely input, failure mode, integration boundary, or compatibility risk and its expected behavior>
```

Use `None identified.` only after checking a section. Don't invent requirements to fill it.

Map the complete file structure before dividing tasks. List every file to create, modify, rename, or delete and give each file one clear responsibility. Include affected documentation, configuration, migrations, generated artifacts, and callers when applicable.

Divide work into the smallest tasks that produce independently verifiable behavior. Keep setup, documentation, and cleanup with the task that needs them. Split tasks only where a reviewer could reasonably accept one and reject another.

Use this task shape:

```markdown
### Task N: <observable deliverable>

**Files:**

- Create: `exact/path`
- Modify: `exact/path` at `<symbol or section>`
- Test: `exact/path`

**Interfaces:**

- Consumes: `<existing or earlier-task interface, including signature or data shape>`
- Produces: `<interface later tasks use, including signature or data shape>`

- [ ] **Step 1: Add the failing test**
  - Name the test and state its inputs, observable assertions, and exact requirement values.
- [ ] **Step 2: Run the focused test and confirm the expected failure**
  - Run: `<non-interactive command>`
  - Expect: `<specific failure that proves the test exercises missing behavior>`
- [ ] **Step 3: Implement the behavior**
  - Name the symbol, signature, control flow, and requirement values that constrain the implementation.
- [ ] **Step 4: Run focused verification**
  - Run: `<non-interactive command>`
  - Expect: `<passing result>`
- [ ] **Step 5: Run broader affected checks**
  - Run: `<non-interactive command>`
  - Expect: `<passing result>`
```

Adapt the steps when no executable behavior changes. Don't require a contrived failing test for documentation, formatting, generated output, or configuration already validated by its consuming tool. Name that tool and its validation command instead.

Record decisions the implementer can't infer safely:

- exact paths, symbols, signatures, types, schemas, and data flow
- exact values, copy, limits, defaults, errors, and compatibility behavior
- affected callers and integration boundaries
- stable observable tests and expected failures
- verification commands and what success looks like
- ordering dependencies between tasks

Don't write full function bodies when a signature, constraints, and tests determine the implementation. Include code only for exact public shapes, non-obvious algorithms, fixed configuration, or literal content required by the source. Remove placeholders such as `TBD`, `handle edge cases`, `add validation`, and `test as appropriate`.

## Self-review

Before presenting the plan:

1. Trace every requirement and success criterion to a task and verification step. Fix omissions.
2. Check that file paths and symbols exist or are explicitly created, and that every affected caller is covered.
3. Check interfaces across tasks for matching names, signatures, types, values, and ordering.
4. Check failure paths, boundaries, compatibility, security, state changes, and operational effects implied by the requirements. Add only concrete, in-scope coverage.
5. Confirm every checkbox directs one unambiguous action and every command is valid for this repository.
6. Remove duplicated instructions, speculative work, implementation transcripts, mandatory commits, and execution workflow.
7. Reread the saved file and inspect its diff when the plan is inside the repository.

Report the saved path, summarize any assumptions or unresolved risks, and ask the user to review and approve the plan. Don't begin implementation until they approve it.
