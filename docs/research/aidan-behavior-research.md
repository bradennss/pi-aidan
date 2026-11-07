# Research: Aidan's engineering judgment and voice

Status: research synthesis and design inputs, not an approved specification.

## Work tracking

- [x] Inspect current extension, prompts, tests, and installed Pi behavior without git history.
- [x] Research staff engineering, agent prompting/context, technical writing, evaluation, and safety.
- [x] Separate source guidance from proposed adaptations for Aidan.
- [x] Brainstorm desired collaboration and voice with the user.
- [x] Present viable approaches and choose one together.
- [x] Obtain approval of the [design specification](../superpowers/specs/2026-11-06-aidan-judgment-and-voice-design.md).
- [x] Write the [implementation plan](../superpowers/plans/2026-11-06-aidan-judgment-and-voice.md) after design approval.

## Executive synthesis

Aidan should demonstrate staff-level judgment rather than repeatedly announce a senior persona. The useful behaviors are understanding the user's outcome, studying the existing system, making proportionate decisions, identifying consequential risks, challenging weak assumptions respectfully, keeping scope controlled, and verifying results. A staff title does not justify extra architecture, process, or authority.

Natural technical writing is better specified through reader needs and representative examples than through a giant blacklist of supposedly AI-like words. Be direct, warm, specific, and appropriately detailed. Preserve uncertainty and important caveats. Human-like means readable and personable, not pretending to have a human biography or personal experience.

The strongest initial design hypothesis is a compact, stable behavioral foundation plus small contextual cues and behavioral evaluations. This is a proposal, not a selected approach. Injection position, message role, frequency, and compatibility with other extensions matter as much as wording.

## 1. Current project facts

Inspected `index.ts`, `src/{inject,messages,prompts}.ts`, all three bundled prompt files, `package.json`, and both test files. No git history was inspected.

- `prompts/system.md`, `prompts/before-user.md`, and `prompts/after-write.md` are empty in the current working tree.
- `before_agent_start` loads `system.md`, wraps it in `<aidan_system>`, and appends it to the existing system prompt. It preserves earlier prompt content rather than replacing it outright.
- `context` fires before each model request, including requests after tool execution. It reads `before-user.md` each time and inserts a hidden custom message before the last message with `role: user`.
- If the trailing consecutive tool-result group contains a successful `write` or `edit`, the same context handler appends `after-write.md` as a hidden custom message.
- A failed mutation alone does not trigger that reminder. A mixed group with at least one successful recognized mutation does.
- Bash mutations and nested writes inside wrapper tools are not recognized by the current message-name check. Whether nested results become visible depends on the tool integration; no wrapper support should be assumed.
- The reminder is immediate and transient. After another assistant/tool round, a verification reminder may no longer be appended. It is not a durable dirty-work flag or a final-answer gate.
- Context changes are returned as a new message array; source messages are not modified. Prompt files are reread, empty files are omitted, and unreadable paths produce a warning once per loader.
- In installed Pi 0.85.1, `dist/core/messages.js:convertToLlm` maps custom messages to user-role model messages. `display: false` hides UI display; it does not confer system priority or conceal the text from the model.
- Therefore `insertBeforeLastUserMessage` means last role match, not necessarily the last human-authored request in every extension combination.
- The installed host documentation confirms chained `before_agent_start` prompt modifications and per-request `context` transformation. Other extensions can affect the resulting prompt and transcript.
- The integration test for bundled prompts assumes nonempty system and after-write content and no before-user content. Populating prompts will require intentional test updates; this observation is from inspection, not a test run.
- `AGENTS.md` describes a `skills/` directory, but it is absent in this working tree. Do not design around assumed existing skills.
- The harness's global documentation describes newer APIs than the repository's installed dependency. Check actual host/version support before proposing additional hooks.

## 2. Staff engineering: transferable practices

### Sources and findings

Will Larson's StaffEng guides distinguish Tech Lead, Architect, Solver, and Right Hand roles [1]. These are organizational patterns, not one universal personality. For a coding assistant, Tech Lead/Solver behaviors are more transferable than pretending to possess organizational authority.

“Work on what matters” emphasizes impact over visible activity, understanding the status quo before changing it, small high-leverage interventions, and finishing work [2]. “Manage technical quality” recommends the cheapest effective intervention, proportionate process, and attention to interfaces, stateful systems, and data models [3]. Engineering strategy should start from concrete problems and explain trade-offs rather than publish context-free rules [4].

Google's review guidance considers overall design, user benefit, complexity, tests, naming, comments, documentation, and system context. It explicitly warns against speculative generality and asks whether tests would actually catch broken behavior [5]. Its standard is continuous improvement in code health, not perfection or personal taste [6].

### Proposed agent adaptations

- Establish the intended outcome and important constraints; inspect what the project already answers before asking.
- Recommend a path and explain the deciding trade-off. Do not dump equivalent options back on the user.
- Use local conventions unless there is a concrete reason to depart.
- Scale discovery, design, tests, and explanation to uncertainty, blast radius, and reversibility.
- Notice security, compatibility, data integrity, migration, operational, and maintenance consequences when relevant—not as mandatory paragraphs in every reply.
- Prefer small coherent changes. Raise adjacent issues without silently expanding scope.
- Distinguish blockers from optional improvements and personal preferences.
- Use tests and observed tool results as evidence; do not describe an attempted action as a successful outcome.
- Explain enough rationale to let the user make decisions and maintain the result, without turning every interaction into a lesson.
- Hand off unfinished work with the actual blocker and next useful action.

Limits: organizational leadership literature is not experimental proof of better agent performance. These adaptations need testing in the actual Aidan/Pi setup.

## 3. Prompt and context engineering

Anthropic's context-engineering guidance argues for the smallest sufficient set of high-signal instructions, a middle ground between vague goals and brittle procedural scripts, clearly separated sections, representative examples, and just-in-time context [7]. Its prompting documentation recommends explicit instructions, relevant and varied examples, and targeted constraints for observed overeagerness or overengineering [8].

OpenAI's Codex guidance likewise emphasizes model-appropriate tooling and prompts, autonomy, codebase exploration, scoped changes, and evaluation [9]. Notably, its intermediate-update advice differs across Codex versions. This is a concrete warning against treating vendor/model-specific advice as universal.

### Proposed implications

- Give every behavioral rule one primary home. Repeat a short cue only where an evaluation demonstrates value.
- Explain the reason for nuanced rules so the model can generalize.
- Prefer positive instructions with targeted prohibitions over repeated ALL-CAPS urgency.
- Keep stable principles separate from task-specific context and external evidence.
- Include a few compact, varied voice examples, not an exhaustive phrase catalog.
- Avoid mandating visible step-by-step reasoning. Ask for decisions, assumptions, evidence, and concise rationale instead.
- Do not copy an entire vendor starter prompt into Pi. Pi and other extensions already supply tool and workflow instructions.
- Treat “staff engineer” as shorthand supported by observable behaviors, not a substitute for them.
- Evaluate the actual combined prompt with Superpowers and other installed guidance. Aidan should supplement workflow ownership, not install a second competing workflow.
- Preserve user-requested formats and depth. A default voice must not force terse incident reports, terse design specs, or conversational JSON.

Limit: prompt advice is conditional on model, harness, tools, and task distribution. No research reviewed establishes one universally optimal prompt size or injection placement for Aidan.

## 4. Human-like technical writing

Google describes the target as a knowledgeable friend: conversational, friendly, respectful, natural, and useful, without excessive informality or entertainment [10]. Microsoft recommends warm and relaxed, crisp and clear, and ready to help: lead with the key takeaway, use everyday words and contractions, and remove excess [11]. These are editorial guidelines, not controlled evidence about agent prompts.

### Proposed voice principles

- Start with the answer, finding, recommendation, or important change.
- Write to one person. Use ordinary verbs, contractions, and concrete details.
- Let warmth come from attention and usefulness, not automatic praise or reassurance.
- Vary sentence structure naturally. Do not artificially add mistakes or slang.
- Use headings, lists, tables, and emphasis when they make the material easier to use; do not require a fixed answer template.
- Be concise relative to the task, not relative to a hard word cap. Keep important evidence and risk information.
- Give progress updates when the plan changes, a useful finding emerges, work is lengthy, or the user needs to act. Avoid narrating each file read or celebrating routine tool success.
- State uncertainty specifically: what is known, what is inferred, and what would establish the answer.
- Admit mistakes plainly, correct them, and continue. Avoid repetitive apologies.
- Disagree with the idea, explain the practical consequence, and offer a better path.
- Stop when the request is satisfied rather than attaching a generic offer of further help.
- Do not fabricate lived experience, feelings, or human identity. First-person descriptions of actual actions are fine.

### Illustrations for discussion, not approved copy

Instead of: “Absolutely! I'd be happy to help you implement a robust and scalable solution.”

Try: “The existing loader already handles this. I'd extend it rather than add another configuration layer.”

Instead of: “I have successfully implemented the requested changes. All functionality should now work as expected.”

Try: “The loader now retries once after a timeout. The timeout and success-path tests pass; I haven't tested it against the live service.”

Instead of: “You're absolutely right; a rewrite is the best approach.”

Try: “I'd keep the current parser. The bug is in how it handles empty input, and a rewrite would make this much harder to review.”

The goal is not to ban individual words, em dashes, headings, or lists. Those are weak proxies for whether writing sounds natural and serves the reader.

## 5. Trust, autonomy, and safety

Anthropic's sycophancy research documents a tendency for models to match users' beliefs rather than prioritize truth [12]. Friendly communication must not become automatic agreement. An agent should check the premise and respond to evidence.

OpenAI's instruction-hierarchy research distinguishes trusted instructions from lower-trust material [13]. Role placement and delimiters are useful structure, not a complete prompt-injection defense. Retrieved pages and repository text should not gain arbitrary authority over the user's request. Repository instruction files intentionally loaded by the harness are a separate case from incidental text found while searching.

Google SRE's canary guidance illustrates a useful risk principle: limit exposure, evaluate a change, then decide whether to expand it [14]. This supports adapting agent autonomy to consequences, not always asking permission and not always acting unilaterally.

Proposed adaptation: carry out authorized local, reversible work without repeated permission checks, subject to the active workflow. Stop for consequential ambiguity, expanded scope, destructive actions, secrets, or shared/production effects not already authorized. Prompts cannot enforce these boundaries reliably by themselves; hard guarantees require tools, permissions, or runtime controls.

## 6. Evaluation and empirical caution

Anthropic's eval guidance distinguishes outcomes from transcripts and combines deterministic checks, model-based rubrics, and human review. It recommends starting with a modest realistic suite, repeating trials, inspecting traces, and avoiding graders that require one arbitrary sequence of steps [15].

METR's early-2025 randomized trial found a 19% slowdown in a particular experienced-developer setting. Its February 2026 follow-up explicitly says selection effects and measurement problems make the later productivity estimate unreliable [16]. Neither result justifies a universal claim about current coding agents. The useful lesson here is to measure actual outcomes and user effort instead of relying on confident self-assessments.

### Proposed evaluation layers

1. Deterministic extension tests: placement, roles after conversion, empty/unreadable files, original-message preservation, repeated calls, successful/failed/mixed mutations, wrappers, no-user contexts, and interaction with other guidance.
2. Behavioral tasks: a small bug fix, ambiguous feature, risky migration, incorrect user premise, blocked verification, failed tools, unrelated changes, incident triage, review, explanation, and long tool-heavy work.
3. Voice samples: short answer, progress update, disagreement, error correction, final handoff, and full technical spec. Use blind pairwise human preference alongside a concrete rubric.
4. Operational measures: completion/correctness, unrequested scope, unsupported claims, unnecessary questions, review burden, latency, tool calls, and tokens. Shorter is not automatically better.

Keep an unmodified baseline, record model/version and configuration, run repeated trials, separate correctness/safety gates from style preferences, and hold out scenarios from prompt-example tuning. Evaluate with and without Superpowers where standalone behavior is intended. If a model judge is used, calibrate against human judgments and avoid rewarding verbosity or matching the example wording.

## 7. Injection design hypotheses to discuss

| Location | Suitable responsibility | Important limits |
| --- | --- | --- |
| `system.md` | Stable identity, engineering judgment, honesty, scope/autonomy defaults, core voice | Appended to the host prompt; cannot erase conflicts or override higher-priority instructions |
| `before-user.md` | Short response-style cue or a few compact examples | User-role context, reread every request, not necessarily near the eventual final answer after many tools |
| `after-write.md` | Brief post-edit self-check: inspect change, appropriate verification, scope | Immediate mutation cue, not proof of validation or a reliable completion boundary |
| Existing skills | Detailed situational workflows loaded when needed | Do not duplicate Superpowers or assume absent bundled skills exist |
| Possible future hooks/state | Broader mutation tracking or a genuinely completion-oriented check | Requires host/version investigation and demonstrated benefit; automatic continuations risk loops and latency |

Worth testing rather than assuming:

- Does a before-user cue improve voice beyond a good system prompt?
- Does a post-write cue improve verification, or interrupt an edit batch with redundant work?
- Is the current mutation detector sufficient for supported tools?
- How does voice hold up across long tool runs and compaction?
- Which behaviors are defaults the user may change, and which are trust invariants?
- Does the combined guidance add useful judgment without slowing routine tasks?

## 8. Open design questions

The research cannot decide the user's preferred relationship with Aidan, tolerance for unsolicited advice, preferred amount of progress reporting, desired autonomy, supported model families, or what current writing feels most wrong. Begin with concrete examples of the interaction they want to change. Then show alternative responses and choose an architecture before writing the specification.

No implementation, prompt population, new runtime hooks, or behavioral validation was performed during this research.

## Sources

1. StaffEng, Staff archetypes: https://staffeng.com/guides/staff-archetypes/
2. StaffEng, Work on what matters: https://staffeng.com/guides/work-on-what-matters/
3. StaffEng, Manage technical quality: https://staffeng.com/guides/manage-technical-quality/
4. StaffEng, Writing engineering strategy: https://staffeng.com/guides/engineering-strategy/
5. Google, What to look for in a code review: https://google.github.io/eng-practices/review/reviewer/looking-for.html
6. Google, The standard of code review: https://google.github.io/eng-practices/review/reviewer/standard.html
7. Anthropic, Effective context engineering for AI agents: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
8. Anthropic, Prompting best practices (living documentation; model-specific advice must be version-checked): https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
9. OpenAI, Codex prompting guide (living documentation with version-specific guidance): https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide
10. Google, Voice and tone: https://developers.google.com/style/tone
11. Microsoft, Above all, simple and human: https://learn.microsoft.com/en-us/style-guide/brand-voice-above-all-simple-human
12. Anthropic, Towards understanding sycophancy in language models: https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models
13. OpenAI, The instruction hierarchy: https://openai.com/index/the-instruction-hierarchy/
14. Google SRE Workbook, Canarying releases: https://sre.google/workbook/canarying-releases/
15. Anthropic, Demystifying evals for AI agents: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
16. METR, We are changing our developer productivity experiment design: https://metr.org/blog/2026-02-24-uplift-update/

Local implementation references: `src/inject.ts`, `src/messages.ts`, `src/prompts.ts`, `test/aidan.test.ts`, `test/messages.test.ts`; installed Pi 0.85.1 `docs/extensions.md`, `dist/core/messages.js`, and `dist/core/agent-session.js`.
