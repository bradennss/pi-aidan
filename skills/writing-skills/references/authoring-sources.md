# Authoring sources

Use these primary sources to resolve format and workflow questions. Consult the target harness's current documentation before adopting product-specific behavior. The guidance below distinguishes portable requirements from authoring choices.

## Specification and official guidance

| Source | What to use it for |
| --- | --- |
| [Agent Skills specification](https://agentskills.io/specification) | Directory layout, YAML fields, naming rules, progressive loading, relative references, and the `skills-ref validate` command. |
| [Agent Skills creator best practices](https://agentskills.io/skill-creation/best-practices) | Grounding instructions in real expertise, spending context wisely, choosing defaults, and matching specificity to task fragility. |
| [Anthropic's skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | Concise instructions, discoverable descriptions, workflows, reference organization, and evaluation on intended models. |
| [Pi skills documentation](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/skills.md) | Pi discovery, commands, diagnostics, relative paths, and implementation-specific frontmatter. Prefer the documentation bundled with the installed Pi version when it differs. |

The portable minimum is a directory containing `SKILL.md` with valid YAML frontmatter, required `name` and `description` strings, and Markdown instructions. Optional fields and directory conventions do not make extra files mandatory. The specification recommends keeping the main file below 500 lines and about 5,000 tokens.

## Published skill-writing skills

### Anthropic: skill-creator

[Anthropic's skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) combines intent capture, drafting, realistic prompts, baseline comparisons, artifact review, iteration, and description optimization.

Adopt its separation of output quality from activation quality and its use of comparable baseline runs. Its viewer, schemas, grading agents, and scripts belong to that package. Do not reference them as locally available unless they are actually installed and appropriate for the task.

### OpenAI: skill-creator

[OpenAI's skill-creator](https://github.com/openai/skills/blob/main/skills/.system/skill-creator/SKILL.md) emphasizes concrete examples, reusable bundled resources, concise instructions, calibrated freedom, validation, and iteration through real use.

Adopt its resource planning and context discipline. Its `agents/openai.yaml` metadata and initialization scripts serve Codex-specific integration. Add them only when targeting that environment; they are not portable requirements.

### Superpowers: writing-skills

[Superpowers' writing-skills](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md) applies a test-first approach to process documentation. It emphasizes observing behavior without guidance, testing realistic pressure, and addressing demonstrated failure modes.

Adopt baseline observation and pressure cases for workflows where shortcuts create risk. A deliberately failing test is not necessary to justify every correction, and a fixed subagent workflow is not appropriate in every environment. Use permitted execution tools and report unavailable behavioral testing honestly. Do not import that package's dependencies, mandatory publishing steps, or claims of universal effectiveness.

## Resolve differences deliberately

1. Follow the specification for portable structure, then check the target harness for supported extensions and stricter limits.
2. Describe both capability and activation conditions. Superpowers favors trigger-only descriptions; the specification and official provider guidance include both. Keep detailed workflow steps in the body either way.
3. Treat validators as structural checks. They cannot establish activation accuracy or output quality.
4. Use baseline comparisons to measure value. If the baseline already succeeds, check whether the skill adds a necessary capability, improves reliability, or can be shortened.
5. Scale evaluation to the consequence and variability of the task. Preserve meaningful failure cases without turning every small revision into an expensive benchmark.

These are independently written synthesis notes. The linked repositories can change; recheck the relevant source when a decision depends on its current details.
