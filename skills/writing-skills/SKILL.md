---
name: writing-skills
description: Create, revise, review, and evaluate Agent Skills packages, including SKILL.md metadata, workflows, reference files, scripts, and tests. Use when authoring, scaffolding, debugging, or improving a skill for Pi, Claude Code, or another Agent Skills-compatible agent.
---

# Writing skills

Create the smallest skill that fixes an observed gap. Keep instructions specific to the task and assume the agent already knows general concepts.

## Workflow

1. Inspect the target repository, its skill discovery paths, and nearby skills. Preserve local conventions and stop on conflicting files.
2. Define at least three representative evaluations before writing extensive instructions. Record each task, the baseline failure or missing context, and verifiable success criteria. Include normal use, an edge case, and skill discovery or routing when relevant.
3. Choose the degree of freedom for each operation. Use heuristics for context-dependent work, pseudocode or parameterized scripts when a preferred pattern allows variation, and exact commands for fragile or order-dependent work.
4. Create the skill directory and `SKILL.md`. Add only the optional files required by the evaluations.
5. Write the metadata first, then the shortest workflow that addresses the observed failures. Add examples, templates, edge cases, and validation only where they change agent behavior.
6. Validate the package and run the evaluations in fresh sessions with every model family the skill must support. Fix failures, rerun the affected evaluations, then rerun the full set.
7. Review how agents navigate the skill. Promote repeatedly needed content into `SKILL.md`, make missed references more explicit, and remove files or instructions that agents do not use.

## Structure

Use this layout as needed:

```text
skill-name/
├── SKILL.md
├── scripts/
├── references/
└── assets/
```

`SKILL.md` is required. Omit empty optional directories. Keep references one level from `SKILL.md`, use forward slashes in every path, and give files names that describe their contents.

Keep `SKILL.md` under 500 lines and about 5,000 tokens. Move detailed domain material, long examples, schemas, and API documentation into focused files under `references/`. Add a table of contents to any reference longer than 100 lines.

## Frontmatter

Start every skill with:

```yaml
---
name: doing-the-task
description: State what the skill does and the specific requests or contexts that should activate it.
---
```

The `name` must match the parent directory under the Agent Skills standard. Use 1 to 64 lowercase letters, numbers, or single hyphens. Do not start or end with a hyphen.

The `description` must be 1 to 1,024 characters. Include both capability and activation cues, with terms users are likely to put in a request. Keep setup and workflow details in the body. Avoid vague descriptions such as "Helps with files."

Add optional `license`, `compatibility`, `metadata`, or `allowed-tools` fields only when the package needs them. Check the target harness before relying on optional fields because support varies.

## Writing instructions

Lead with the action the agent should take. Use a numbered workflow when order matters and conditional branches when the next step depends on the input. Keep terminology consistent throughout.

Prefer:

- repository-specific facts the agent cannot infer
- exact guardrails for destructive, costly, or error-prone operations
- templates when output structure must be stable
- concrete input and output examples when style or quality is hard to describe
- a validation loop of run, inspect errors, fix, and rerun

Remove background explanations, generic advice, duplicated rules, and lists of equivalent options. Avoid time-sensitive claims. When old behavior matters, label it as an old pattern and explain when it applies.

## Scripts and resources

Bundle a script when deterministic execution is safer or cheaper than generating the same code on each use. Scripts must handle expected failures, print specific repair guidance, document dependencies, and avoid unexplained constants.

State whether the agent should execute a script or read it as a reference. Do not assume a package, binary, network connection, or credential exists; declare requirements in `compatibility` or the relevant setup step and check them before use. Write MCP tool names in their fully qualified `ServerName:tool_name` form.

For batch, destructive, or high-stakes work, create a machine-readable plan, validate it before mutation, execute it, and verify the result. Preserve intermediate output when it helps diagnose or reverse a failure.

## Evaluation

Test these separately:

- **Discovery:** the skill activates for representative requests and stays inactive for unrelated requests.
- **Execution:** the agent follows required steps, loads the right references, handles edge cases, and produces the requested result.
- **Verification:** scripts and checks catch invalid output with messages that tell the agent how to repair it.

Run evaluations with fresh agent context so earlier instructions do not hide gaps. Test every intended model class, since smaller models may need clearer guidance while larger models may be hindered by extra explanation. Base revisions on observed failures and navigation paths rather than imagined future needs.

Before finishing, validate the frontmatter, relative links, script dependencies, evaluation results, and line count. Report which models and scenarios were tested, along with anything left unchecked.
