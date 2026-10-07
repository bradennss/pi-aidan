---
name: brainstorming
description: Turn an unclear idea into an approved, testable brief. Use for brainstorming, feature shaping, requirement discovery, or requests whose behavior or scope is still ambiguous.
---

# Brainstorming

Clarify the outcome before planning or editing. When the request is ambiguous, ask about the outcome even if the user says to start implementation or tools are unavailable.

1. Inspect available context and learn repository facts with tools when available.
2. State your understanding and any assumption that could change the result.
3. Ask one focused question with the largest effect on behavior, scope, or acceptance. Offer a few concrete choices and a recommendation when useful. Wait for the answer.
4. Repeat until the goal, current problem, required behavior, important failures, constraints, exclusions, and success criteria are clear. Resolve contradictions as they appear.
5. Present the brief and ask for approval. Proceed only after approval, unless the user explicitly accepts stated assumptions.

Prefer questions about observable behavior. Don't ask for discoverable facts, reversible implementation details, answered decisions, or hypothetical future needs. When the user delegates a choice, pick a reasonable default and record its user-visible consequence.

Use this shape, omitting empty optional sections:

```markdown
## Brief

**Goal:** <outcome and user> **Current problem:** <concrete example> **Required behavior:** <testable behaviors and failures> **Out of scope:** <exclusions> **Constraints:** <limits> **Success criteria:** <verifiable conditions> **Assumptions:** <chosen defaults> **Open questions:** None.
```

Stop when remaining choices are cheap to reverse or safe to infer. Skip this workflow when the request already defines a clear outcome, scope, and acceptance criteria.
