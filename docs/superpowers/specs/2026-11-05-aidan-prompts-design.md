# Aidan prompt design

## Intent

Rewrite Aidan's shared prompts using current first-party prompting guidance. Preserve its engineering and writing preferences while making instructions easier to interpret across model providers. The user approved this scope on November 5, 2026.

## Goals and constraints

- Preserve the existing injection timing, hidden message types, prompt reloading, and missing-file behavior.
- Organize the system prompt into clear sections for role, instruction handling, engineering work, verification, and communication.
- Clarify that Aidan's defaults do not override host instructions. Distinguish task data from instructions and preserve the user's ability to override Aidan's preferences.
- Preserve scoped changes, protection of unrelated work, explicit commit authorization, complete implementations, evidence-based verification, and Google developer documentation style.
- Replace urgency-based wrappers with `aidan_system`, `aidan_response_guidance`, and `aidan_completion_check`.
- Keep context reminders short. Make the after-write reminder a completion checkpoint so it does not imply that every edit requires a full verification cycle.
- Add no dependencies, new injection hooks, or provider-specific configuration. Create no commits without a user request.

## Approaches

1. Rewrite text only. This minimizes changes but retains urgency-based wrappers that obscure the purpose of each block.
2. Rewrite the three prompts and use descriptive wrappers. This preserves the current architecture while clarifying structure and purpose. This is the approved approach.
3. Consolidate everything into the system prompt. This reduces repetition but changes reminder behavior without behavioral evidence that the change helps.

## Injection structure

`before_agent_start` appends the wrapped `system.md` to Pi's existing system prompt. On each context request, `before-user.md` is inserted before the latest user message. A successful `write` or `edit` in the trailing tool-result group also appends `after-write.md`. Pi converts these custom messages to user-role model messages; `display: false` affects visibility, not instruction authority.

Keep `aidan-before-user` and `aidan-reminder` as internal message types. Only wrapper names change. Markdown headings organize the system prompt within its outer delimiter.

## Research basis

The first-party sources retrieved during this task recommend clear instructions, consistent structure, explicit completion criteria, and evaluation on representative workloads:

- [Anthropic prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices): use descriptive XML boundaries, explain important constraints, prefer positive direction, and soften aggressive prompting that can cause overtriggering.
- [OpenAI prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering): separate identity, instructions, and context with clear Markdown or XML structure.
- [OpenAI Codex prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide): support scoped autonomous implementation, exploration, verification, and representative evaluations. Its model-specific advice about progress updates varies by model, so it does not establish a universal cadence for Aidan.
- [Google Gemini prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies): use precise, direct instructions, consistent delimiters, and explicit constraints.

These recommendations motivate the rewrite; they do not prove it improves Aidan's behavior. Avoid copying provider-specific thinking, sampling, or message-history instructions into this shared prompt.

## Verification

Update exact wrapper expectations and exercise the handlers with the bundled prompts. Check placement, preservation of the base system prompt, unchanged source messages, and the absence of a completion reminder after failed writes. Retain existing empty-file, reload, and missing-file tests. Test assembly behavior rather than exact policy wording.

Run formatting, type checking, lint, and all tests. Document manual behavioral scenarios for a small edit, an intermediate edit, a failed check, an explicit style override, external instruction-like data, and a request that does not authorize commits. Do not claim behavioral improvement without comparative model runs.

## Non-goals and remaining choices

Do not redesign mutation detection, remove reminder hooks, create a model benchmark harness, or change skills. Exact phrasing and concise research-note organization are implementation choices. Verification must distinguish tested injection behavior from unmeasured model behavior.
