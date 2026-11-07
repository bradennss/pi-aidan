# Choose the document's job

Use the section that matches the task. These are writing patterns, not mandatory headings. Keep the project's conventions when they already work, and link to related pages instead of squeezing every purpose into one document.

| Reader's question | Document |
| --- | --- |
| “Can you help me get my first result?” | Quickstart or tutorial |
| “How do I accomplish this particular task?” | How-to guide |
| “Why does it work this way?” | Explanation |
| “What exactly does this input, command, or option mean?” | Reference |
| “What went wrong, and what should I do next?” | Troubleshooting |
| “How does our system fit together?” | Architecture explanation |
| “Why did we choose this approach?” | Decision record |
| “How do I operate or recover this system?” | Runbook |
| “How do I become productive here?” | Onboarding |

## Quickstarts and tutorials

A **quickstart** takes the shortest supported path to a first useful result. A **tutorial** uses a controlled task to teach skills and concepts. Both need a known starting point and an outcome readers can observe; a tutorial spends more time explaining what the reader is learning.

State prerequisites, supported versions, and what the reader will build. Choose one path through the task rather than branching into every platform, deployment mode, and API option. Link to alternatives when needed.

Show complete commands and code for the path you chose. Identify the working directory and file being edited. Explain transitions: creating a file isn't the same as wiring it into a running application. Place useful checkpoints after meaningful changes, not after every keystroke.

If an early warning is expected, explain whether to ignore it and when it will be resolved. If a command can fail in a common, recognizable way, place the recovery near that step. Finish with the promised result and one useful next step, not an unrelated feature tour.

**Avoid:** undocumented setup, fragments presented as complete programs, or a beginner tutorial that requires choosing among architectures before seeing anything work.

## How-to guides

Assume the reader has a goal and some working knowledge. Name the task in the title: “Rotate a service token,” not “Token management.” Start with scope and conditions that determine whether the procedure applies.

Give the required steps, the inputs to replace, and the result to check. Explain a choice when it changes what the reader should do; move broad background to an explanation page. For a task with genuinely different starting states, make those branches explicit.

Put consequences before state-changing commands. Include cleanup or recovery if it belongs to the task, but don't invent a rollback path or turn a harmless local command into an incident procedure.

**Avoid:** making readers complete a whole tutorial to change one setting, or adding an option merely because the API supports it.

## Conceptual explanations

Answer a specific “why” or “how” question. Start from something the intended reader knows, then introduce the distinction they need to understand.

Build a causal sequence: what happens, why it happens, and what follows. Use one concrete example across the explanation so readers don't repeatedly learn new domain details. Introduce terminology when it gives a useful name to an idea already taking shape.

An analogy can supply a starting point, but state where it stops matching. Include a counterexample or limitation when it prevents an important misconception. Explain the explicit mechanism before showing shorthand; don't hide the mental model behind a convenient API.

**Avoid:** an installation guide disguised as an explanation, metaphors that imply false guarantees, and explaining every prerequisite topic from scratch.

## API, CLI, and configuration reference

Describe the contract precisely enough for a reader to predict behavior. Use consistent structure across neighboring entries so readers can compare them.

Depending on the interface, cover:

- Signature or invocation, accepted types or syntax, units, required values, defaults, and valid ranges.
- Return values or output, side effects, asynchronous behavior, and errors or exit statuses.
- Interactions, precedence, version constraints, and limitations that change the meaning of an option.
- A small representative example with a clear result or explanation.

Distinguish library behavior from behavior introduced by your example. If a request resolves for an HTTP error but the example throws on that status, say which layer throws. Distinguish an omitted field from `null`, a timeout from cancellation, and a default from a recommendation when those distinctions matter.

For configuration, say when values are read, what overrides them, and whether changes require a restart or rebuild—when the implementation establishes those facts. Don't infer these rules from another framework.

**Avoid:** a prose dump of every field, undocumented defaults, or examples whose error handling contradicts the entry.

## Troubleshooting

Start with the symptom a reader can recognize: exact error text, unexpected output, or observed behavior. Give a known cause or a diagnostic check; don't present one possible cause as a confirmed diagnosis.

Use the sequence **symptom → check or cause → action → expected result → next step if unresolved**. When several causes fit, order checks by their ability to distinguish causes and their cost. Ask for observations that change the next action rather than an indiscriminate log dump.

State when to stop retrying or escalate. Name the useful diagnostic details to collect and exclude credentials or unrelated private data. Use real support paths when known; leave an unresolved contact explicit rather than fabricating an address.

**Avoid:** “try again” loops, a list of commands without interpretation, or claiming that an error message proves a cause it only suggests.

## Architecture explanations

Start with the system's responsibility and the boundary of the explanation. Show how a representative request, job, or data change moves through the system. A small text diagram often helps more than a list of services.

Explain which component owns which responsibility, where state lives, and which guarantees are established at each boundary. A database transaction doesn't automatically include a queue or an external provider. Discuss the failure paths that affect the reader's work, including retries, partial completion, duplication, and recovery when applicable.

Separate what exists from what is proposed. Link to code and decisions when they clarify the explanation. Identify uncertainty that changes the conclusions. Include verified owners or maintenance links where useful; don't manufacture team names or make every small architecture note carry a full metadata block.

**Avoid:** component inventories without behavior, unexplained boxes and arrows, claims of “exactly once” without a supporting mechanism, or an unsolicited redesign.

## Decision records

Record the decision and its status, the context that required it, the viable alternatives, why this choice won, and its consequences. A useful decision record explains a trade-off rather than retroactively making the winner look inevitable.

Distinguish a proposal, an accepted decision, and a superseded one. Record dates and responsible people when established. Say what future evidence would make the choice worth revisiting if that's part of the decision.

Keep implementation detail elsewhere unless it explains the choice. Update by linking a superseding record rather than silently rewriting history.

**Avoid:** labeling your recommendation “accepted,” omitting costs, or inventing historical motivations from today's code.

## Operational runbooks

Write for someone operating under pressure who may not have the author's context. Put scope, applicability signals, access requirements, and authorization before the actions. Identify the environment and affected resource set so a copied command can't silently target the wrong system.

For a risky operation, include:

1. How to establish that this procedure applies and which resources are in scope.
2. Who can authorize it, when authorization is required, and what must be checked first.
3. Actions in order, with explicit resource placeholders and observations that determine the next step.
4. Stop conditions and escalation, including what to do if an action's outcome is uncertain.
5. A supported success check, plus rollback or recovery limits. If the operation is irreversible, say so before the command.

Use actual commands and known signals. If the product has no documented inspection or restore command, don't invent one for symmetry. State the verification limit. A filtered list no longer showing a resource isn't necessarily proof that it no longer exists.

Include links to dashboards, ownership, and incident procedures when verified. Keep credential values out of copied logs and published examples. Explain useful thresholds only when their basis is known.

**Avoid:** destructive one-liners built from unreviewed output, “undo” steps that can't restore lost data, or turning leadership urgency into authorization.

## Onboarding and READMEs

Onboarding moves someone from a known starting point to a useful contribution. Put access, setup, a small working task, and the contribution path in the order a newcomer encounters them. Explain how to recognize success and where to get help for likely blockers.

Use the actual package manager, repository commands, and access process. Link to established installation or team documentation instead of maintaining a second conflicting copy. Internal docs may need organization-specific context; external docs shouldn't assume private systems or internal vocabulary.

A README is an entry point, not a document type with one fixed template. Give readers enough to understand the project, decide whether it fits, and find the next useful page. Installation, usage, contribution, and operational material can live elsewhere as the project grows.

For a small correction, preserve accurate surrounding text. The right documentation work may be one changed command.

**Avoid:** an exhaustive handbook in the README, stale copies of setup instructions, or rewriting someone's onboarding voice to fix a factual detail.
