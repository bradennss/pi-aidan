---
name: writing-skills
description: Create, revise, review, and evaluate Agent Skills packages. Use when authoring, scaffolding, debugging, or improving SKILL.md files, bundled references, scripts, assets, or skill tests.
---

# Writing skills

Create the smallest skill that fixes an observed agent gap. Assume the agent knows general concepts.

1. Inspect the repository, discovery paths, target harness documentation, and nearby skills. Preserve local conventions and stop on conflicts.
2. Before writing extensive instructions, define three representative fresh-context evaluations with verifiable success criteria: normal use, an edge case, and discovery or routing when relevant. Add more only when risk or distinct model classes require them. Record evaluations outside the package unless the repository has a suite.
3. Choose instruction precision by risk. Use heuristics for contextual work, parameterized patterns for flexible work, and exact commands for fragile or ordered operations.
4. Write valid frontmatter and the shortest workflow that addresses observed failures. Add references, scripts, examples, templates, and edge cases only when they change behavior.
5. Validate metadata, links, scripts, dependencies, and line count. Run evaluations only with models confirmed runnable and authenticated in the current harness. Fix failures, rerun affected cases, then rerun the full set.
6. Review how agents discover and navigate the skill. Promote repeatedly needed guidance, strengthen missed links, and remove unused material.

Use this portable structure as needed:

```text
skill-name/
├── SKILL.md
├── scripts/
├── references/
└── assets/
```

`SKILL.md` is required. Its `name` must match the directory and use 1 to 64 lowercase letters, numbers, or single hyphens. The `description` must state capability and activation cues in 1 to 1,024 characters. Keep setup details in the body and add optional frontmatter only when supported and needed.

Keep `SKILL.md` under 500 lines and about 5,000 tokens. Put detailed domain material in focused references, add a contents list above 100 lines, use forward-slash relative paths, and omit empty directories.

Lead with actions. Keep order and conditional branches explicit. Prefer repository facts, safety guardrails, stable templates, concrete examples, and a run-fix-rerun loop. Remove background, generic advice, duplication, and time-sensitive claims.

Bundle deterministic scripts when they are safer or cheaper than regeneration. Declare requirements, handle expected failures, print repair guidance, and use fully qualified MCP tool names. For destructive or high-stakes batches, validate a machine-readable plan before mutation and verify the result.

Evaluate discovery, execution, and validation separately in fresh sessions. Confirm model support with an actual request, then report tested models, scenarios, and coverage gaps.
