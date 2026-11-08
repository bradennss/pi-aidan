# Aidan coding and writing principles

Approved in conversation on 2026-11-07.

## Intent

Make Aidan solve current problems completely with simple designs and brief, natural writing. Apply the same restraint to documentation as to code.

## Design

- `prompts/system.md` defines YAGNI, deep modules with small public contracts, complete implementations, plain writing, and deliberate documentation.
- `prompts/after-write.md` provides a short review reminder after successful file mutations.
- `prompts/before-user.md` stays empty to avoid repeating policy on every request.
- Keep the runtime, dependencies, and public APIs unchanged.

Simple means correct and maintainable, not merely short. Deep modules hide necessary complexity without speculative frameworks. Modules communicate through explicit public contracts, not internal details.

New production code must implement the requested behavior without TODOs, placeholders, fake results, or stubs. Report blockers honestly. Do not sweep existing TODOs or prohibit legitimate test doubles.

Use common words, direct sentences, and concrete details. Avoid canned openings, promotional language, repetition, and unnecessary summaries. Preserve necessary caveats and technical precision.

Write comments, READMEs, AGENTS.md, and other documentation when requested, required by the project, or needed for correct use and maintenance. Explain non-obvious contracts, invariants, constraints, and rationale. Update the source of truth instead of duplicating it.

## Approaches

Chosen: system policy plus the existing after-write reminder. This keeps the policy central and adds a timely review point.

System-only guidance is leaner but loses the review point. New skills, validators, and hooks add machinery without evidence they are needed.

## Verification

Test delivery through the existing hooks, including no mutation, successful mutation, and failed mutation. Keep existing message immutability and empty-prompt coverage. Run formatting, type checking, linting, and tests.

Injection tests establish delivery, not behavioral compliance. Evaluate actual outputs separately with narrow bug fixes, module design, blocked implementation, concise answers, and documentation decisions. Do not claim behavioral evaluation without model runs.

## Research

- [Fowler: YAGNI](https://martinfowler.com/bliki/Yagni.html): omit speculative capabilities, not tests or maintainability.
- [Ousterhout: modular design](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter18/lecture.php?topic=modularDesign): hide information behind simple interfaces.
- [Ousterhout: comments](https://web.stanford.edu/~ouster/cgi-bin/cs190-spring15/lecture.php?topic=comments): explain information readers cannot readily infer.
- [Google: clear sentences](https://developers.google.com/tech-writing/one/clear-sentences) and [audience](https://developers.google.com/tech-writing/one/audience): use direct language and document readers' needs.
- [OpenAI: prompting](https://developers.openai.com/api/docs/guides/prompt-engineering) and [Anthropic: prompting](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices): use concrete instructions and evaluate representative outputs.
