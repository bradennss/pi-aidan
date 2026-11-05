---
name: brainstorming
description: Explores ideas, frames user problems, compares approaches, and turns ambiguous feature requests into scoped, testable proposals. Use when asked to brainstorm, discover requirements, shape a feature, explore alternatives, or decide what a first version should do. Does not cover executing a settled specification, routine debugging, or summarizing existing notes without developing ideas.
---

# Brainstorming

Help the user decide what is worth doing and what evidence they need next. Separate understanding the problem, generating possibilities, and choosing an approach. Match the depth to the decision; a short idea request does not need a full design process.

## 1. Establish the task and decision

Read the conversation and supplied artifacts first. For an existing product, inspect relevant behavior, documentation, and boundaries with read-only tools. Keep inspection focused on the idea; do not audit the whole repository.

Identify whether the user wants:

- **Ideas:** Generate possibilities in the requested format. Ask only if you cannot produce relevant ideas without a missing fact. Stop after the requested output unless the user asks to develop it.
- **Feature shaping:** Resolve important uncertainty, compare approaches, and draft a testable brief.
- **Refinement:** Preserve settled decisions and work on the remaining questions. Reopen an approved choice only when new evidence exposes a concrete conflict or risk; explain it first.

State the decision being made and any existing constraints briefly. Honor the user's requested pace and format. Brainstorming alone does not authorize implementation, prototyping, file writes, delegation, commits, purchases, or contacting people. If the user also authorizes another phase, make the transition explicit and follow its applicable requirements.

## 2. Frame the problem using evidence

Establish enough context to distinguish a useful solution from an attractive idea:

- Who needs help, what they are trying to achieve, and when the problem occurs.
- How they do it now, where it fails, and what evidence shows the problem matters.
- The desired outcome and how improvement could be observed.
- Hard constraints, negotiable preferences, dependencies, and explicit exclusions.

Use supplied answers instead of asking the user to repeat them. Ask the smallest question that would materially change the next step, usually one focused question at a time. Offer concrete choices when helpful, with room for another answer. Avoid a fixed questionnaire.

Distinguish observed facts, user decisions, hypotheses, and unknowns. A stakeholder request establishes intent; it does not establish user demand. Do not invent interviews, usage data, estimates, feasibility results, or approval. Cite relevant files or sources when evidence affects the recommendation.

If the user supplies a solution without a clear problem, reframe it around the intended user and outcome. For example, “add a dashboard” might become “help on-call engineers identify which failing service needs attention.” Keep that framing provisional until supported. A useful problem statement allows several possible answers.

Use external research when an unfamiliar domain, current capability, or consequential factual claim could change the choice. Prefer primary sources and explain what they establish. Desk research cannot replace evidence from the affected users or validate this product's demand. If research is unavailable, name the uncertainty and propose how to resolve it.

If the user wants speed or no questions, proceed with explicit, low-risk assumptions. Leave consequential unknowns visible. If the intended user or outcome is still unknown, offer a discovery plan or provisional concepts rather than a build-ready specification.

## 3. Explore distinct approaches before selecting

For feature shaping, offer a small set of credible approaches, usually two or three, before recommending one. Generate them around the same problem and constraints so the comparison is meaningful. Vary the mechanism, scope, or workflow rather than just the styling or technology.

Consider improving an existing path, a manual or non-software intervention, and doing nothing when they are credible alternatives. Do not pad the comparison with options that cannot meet hard constraints. For an ideas-only request, follow the requested count and breadth instead of forcing a shortlist.

Generate possibilities before judging them. Then compare the strongest candidates against the user's outcome and constraints. Explain each candidate's benefit, main tradeoff, dependencies, and important uncertainty. Use qualitative effort or confidence when evidence does not support precise numbers. Avoid scores that imply measurements you do not have.

Recommend one approach and explain why it fits. State what evidence would change the recommendation. If an unresolved fact determines the choice, recommend a small investigation or trial first. Stopping or deferring is a valid outcome when the problem is not worth pursuing or a hard constraint prevents a useful result.

For method selection or deeper framing guidance, read [research foundations](references/research-foundations.md). These sources inform the process; their workshop formats and delivery timelines are not mandatory steps.

## 4. Define the smallest useful scope and test

For the selected direction, describe the main user journey and the smallest complete outcome it should deliver. Separate essentials from later additions and explicit non-goals. Avoid adding architecture, dependencies, or a task-by-task implementation plan unless needed for the decision or requested by the user.

Resolve behavior at boundaries that could change scope or harm users. Depending on the proposal, consider permissions and data disclosure, empty or invalid input, failures and recovery, accessibility, external dependencies, and irreversible actions. Focus on relevant cases rather than attaching a generic checklist.

Separate two kinds of verification:

- **Acceptance:** Observable examples showing whether the proposed behavior works, including a meaningful failure or boundary case.
- **Learning:** Evidence that tests whether the approach helps users or is feasible. Identify the riskiest assumption, the smallest useful test, the observation needed, and the decision that follows.

For example, an export acceptance case could require the current filtered rows and permitted columns to appear in a CSV while internal notes stay excluded. A separate learning test could ask support agents to complete a real sharing task with a sample export and observe missing information or unsafe workarounds. Passing the file checks alone does not establish usefulness.

Propose tests; do not claim to have run them. Do not invent target metrics. If no baseline or threshold exists, identify what to measure and agree on a threshold before treating a trial as decisive. Keep irreversible or consequential decisions blocked on the relevant evidence and authorized decision owner; urgency does not resolve missing requirements.

## 5. Present the decision and approval status

For feature shaping, provide a concise brief in the response by default. Use an existing project template when supplied. Otherwise cover:

1. **Problem and outcome:** The user, current difficulty, evidence, and desired change.
2. **Decision:** The recommended approach, alternatives considered, and tradeoffs.
3. **Scope:** The first useful journey, essential behavior, constraints, and non-goals.
4. **Verification:** Observable acceptance examples and the next test of a risky assumption.
5. **Open decisions:** Unknowns, assumptions, blockers, and who needs to decide them when known.
6. **Status and next step:** Draft, approved, deferred, or blocked, supported by the conversation.

Scale the brief to the task. A small change may need only a few paragraphs. Do not create a document unless requested or required by an applicable project convention; use the established location when a file is needed.

Ask for approval of the direction and scope when the user has not already given it. Make the decision easy to answer by naming unresolved choices. Do not treat silence, enthusiasm for one idea, or agreement with only part of the proposal as approval of the whole brief. When the user changes a requirement, update the affected scope and tests without restarting settled work.

Finish when the requested ideas are delivered, the brief is ready for a decision, or a specific blocker has a next step. Report what is decided and what remains uncertain. Move into implementation only when the conversation authorizes it.
