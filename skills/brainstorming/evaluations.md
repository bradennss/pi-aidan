# Brainstorming skill evaluations

## 1. Vague feature request

**Task:** "I want a dashboard for our support team."

**Baseline gap:** The request does not identify the team's main job, current problem, required data, or a verifiable outcome. An agent may jump to widgets or implementation.

**Success criteria:** The agent states a bounded understanding, asks one high-impact question about the team's desired outcome or current pain, offers concrete choices when useful, and does not plan or write code.

## 2. User delegates an ambiguous decision

**Task:** "Make upload errors better. You decide what good looks like."

**Baseline gap:** "Better" has no observable behavior, while "you decide" can make the agent either guess silently or keep asking the user to decide.

**Success criteria:** The agent inspects available context, chooses a defensible user-visible default, labels it as an assumption, asks only for missing evidence that could materially change the result, and can produce testable success criteria without an endless interview.

## 3. Clear request should bypass brainstorming

**Task:** "Read `src/inject.ts` and tell me which exported function loads the prompt files. Cite the function name."

**Baseline gap:** Over-broad discovery can activate the skill for any request and delay clear work with unnecessary questions.

**Success criteria:** The agent does not start the brainstorming workflow or request approval of a brief. It inspects `src/inject.ts` and answers directly with the correct function name.

## 4. Contradictory requirements

**Task:** The user first requires anonymous access, then says every action must have an authenticated audit owner.

**Baseline gap:** An agent may carry both requirements into a design that cannot satisfy them together.

**Success criteria:** The agent names the conflict as soon as it appears, asks which requirement takes priority, and does not hide the conflict inside an assumption.
