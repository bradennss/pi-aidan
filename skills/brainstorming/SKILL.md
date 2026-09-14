---
name: brainstorming
description: Turn vague ideas into a concrete, agreed brief before planning or implementation. Use when the user asks to brainstorm, shape an idea, explore a feature, clarify requirements, or describes something they want without enough detail to choose the right outcome or scope.
---

# Brainstorming

Pin down the outcome before proposing a plan or changing files. Keep the conversation focused enough that the user can answer without already knowing the solution.

## Workflow

1. Read the request and inspect any context you can access. Learn repository facts from files and tools instead of asking the user.
2. State your current understanding in one or two sentences. Mark any assumption that could change the result.
3. Find the single unanswered question with the largest effect on the outcome, scope, or user experience. Ask that question and wait for the answer.
4. Repeat until you can write a brief with testable success criteria. Usually cover:
   - who needs this and what they are trying to accomplish
   - the current problem, with one concrete example
   - required behavior and important failure cases
   - scope, constraints, and explicit exclusions
   - what the user will accept as done
5. Present the brief using the template below. Resolve contradictions before asking for approval.
6. Ask the user to approve or correct the brief. Start planning or implementation only after approval, unless the user explicitly asks you to proceed with stated assumptions.

## Asking questions

Ask one focused question per turn. Use a structured question tool when available. Offer two to four concrete choices when the likely answers are known, recommend one when you have enough evidence, and always allow a custom answer.

Prefer questions about observable behavior. Ask for an example when words such as "better," "simple," "fast," or "modern" hide the requirement. Replace "What do you want?" with a smaller decision the user can make, such as:

> When an upload fails, should the page keep successful files and let the user retry failed ones, or cancel the whole batch? I recommend keeping successful files because retries stay cheap.

Do not ask about:

- facts available in the repository or supplied material
- reversible implementation details that do not affect the user
- decisions already answered by the user
- hypothetical future needs without evidence

If the user says "you decide," choose a reasonable default and explain the user-visible consequence in one sentence. Record the decision under `Assumptions` as `Chosen default: <decision>` so it stays distinct from required behavior. If the answer depends on missing evidence, propose the smallest research step or experiment that would settle it.

## Managing scope

Separate the requested outcome from possible solutions. Explore alternatives only when they create a meaningful tradeoff in cost, behavior, risk, or time. Give the user a recommendation and explain that tradeoff briefly.

Keep a running view of settled decisions and open questions. When a new answer conflicts with an earlier one, point out the conflict immediately and ask which requirement takes priority.

Stop asking when the remaining choices are cheap to reverse or safe to infer. A brainstorming session should converge on a decision rather than collect every imaginable requirement.

## Brief template

```markdown
## Brief

**Goal:** <the outcome and who needs it>

**Current problem:** <what happens now, with a concrete example>

**Required behavior:**

- <observable behavior>

**Out of scope:**

- <explicit exclusion>

**Constraints:**

- <technical, policy, time, compatibility, or budget constraint>

**Success criteria:**

- <condition someone can verify>

**Assumptions:**

- Chosen default: <decision made for the user, when applicable>
- <other assumptions that could change the result>

**Open questions:** None.
```

Omit empty sections except `Open questions`. If unresolved questions remain because the user asks to proceed, list them there and state the default you will use.

## Guardrails

Do not write code, make a detailed implementation plan, or expand the feature while the intended outcome is still unclear. Do not dump a questionnaire on the user. Avoid presenting many near-identical concepts as options; combine them and name the decision that matters.

Skip this workflow when the request already has a clear outcome, scope, and acceptance criteria. Begin inspection or the requested work in the same turn instead of announcing intended steps and stopping.
