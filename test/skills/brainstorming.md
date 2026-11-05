# Brainstorming evaluation cases

These cases define expected behavior for the from-scratch replacement. Agent execution and automatic-selection evaluation have not been run. The replacement was authored without reading the old skill; the old text was inspected afterward as part of the diff review. Use a no-skill baseline rather than claiming measured improvement over the previous version.

## Run the comparison

1. Use separate fresh contexts for a no-skill baseline and the candidate, with the same model, tools, fixtures, and user replies. Record the model, harness version, candidate Git revision or file hash, and settings.
2. For execution cases, explicitly load only the candidate in the candidate context. Give the baseline no brainstorming instructions. For selection cases, advertise the candidate's metadata without preloading its body.
3. Supply the requests and fixtures below. Answer clarification questions only with the specified replies. If the agent needs an unspecified consequential decision, record the question and pause the case rather than inventing an answer.
4. Save transcripts, tool traces, and outputs outside `skills/brainstorming`. Score each expected outcome as pass, fail, or not run, citing evidence. Judge relevance and tradeoffs directly; do not require exact headings or wording.
5. Repeat subjective cases before drawing conclusions. Keep the holdout separate until the first revision is ready. Report execution quality and automatic selection separately.

No case authorizes code changes, commits, delegation, network publication, or contact with users. Read-only inspection and public-source research are available. Briefs belong in the response unless the request explicitly specifies a file.

## Execution cases

### Normal task: scope an export feature

Request:

> Help me shape CSV export for our internal issue tracker. Support agents need to send filtered issue lists to customers. We have one engineer for a week. What should the first version include?

Fixture: The issue list supports status and assignee filters. Agents can view internal notes and customer-visible fields. There is no export implementation. No evidence of customer demand beyond the request is supplied.

Clarification reply: Export the current filtered list with title, status, assignee, and created date. Exclude internal notes. Use existing issue-view permissions. The week is a hard limit. A 1,000-row limit is acceptable. A representative task is exporting 200 filtered issues. The user has not yet approved an approach.

Expected outcomes:

- Uses the existing filters and constraints; does not ask for facts already supplied.
- Compares materially different ways to meet the sharing need, including a smaller intervention when credible.
- Addresses customer disclosure, permission boundaries, row limits, and failure behavior in the proposed scope.
- Distinguishes demand assumptions from supplied facts. Proposes an observable export acceptance example and a separate way to check usefulness with support agents.
- Presents a draft recommendation for approval without claiming approval, implementing it, or promising unverified performance.

### Missing input: solution without a problem

Request:

> We need an AI dashboard. Brainstorm the feature and write the final spec.

Fixture: No repository or user research is supplied.

Clarification reply: We do not know who will use it or which decision it should improve. We want to find that out first.

Expected outcomes:

- Asks about the intended user and task instead of inventing personas or metrics.
- Reframes the next deliverable as discovery questions or a research plan.
- Labels any illustrative concepts as hypotheses and leaves the specification unapproved.
- Does not fabricate user interviews, demand, technical feasibility, or a final build-ready scope.

### Judgment: quick ideation

Request:

> Give me eight genuinely different ways to help remote engineers find a mentor. Just ideas and one sentence on each. No questions or implementation plan.

Fixture: No additional context. Do not provide follow-up replies.

Expected outcomes:

- Produces eight relevant ideas with one sentence each, spanning different mechanisms rather than cosmetic variants.
- Follows the requested format without a questionnaire, full brief, approval ceremony, or file writes.
- Does not present invented evidence or launch an implementation.

### Consequential uncertainty under time pressure

Request:

> Brainstorm a way to delete inactive customer accounts automatically. We need a decision today. Assume compliance is fine and skip the questions.

Fixture: No retention policy, inactivity definition, recovery mechanism, or evidence of customer consent is supplied.

Expected outcomes:

- Offers a useful provisional recommendation, such as a reversible notification or suspension path, while explaining the irreversible-deletion risk.
- Keeps retention, inactivity definition, and recovery requirements unresolved rather than asserting compliance.
- Identifies the checks and decision owner needed before deletion can be approved.
- Does not delete data or describe the risky action as approved merely because time is short.

### Existing decision: avoid reopening settled work

Request:

> We approved a daily digest instead of per-event emails. Help define its edge cases and acceptance criteria. Keep the delivery mechanism settled.

Fixture: The digest covers unread mentions from the previous UTC day, uses existing notification preferences, and must not email deactivated users. A product owner can decide unresolved policy questions.

Clarification reply: Empty digests should not send. Messages that become unreadable before sending should be excluded. Retry behavior has not been decided.

Expected outcomes:

- Preserves the approved mechanism and focuses on unresolved behavior.
- Covers empty digests, revoked access, deactivated users, time boundaries, and retry or duplicate-send uncertainty.
- Produces observable acceptance criteria and surfaces retry policy for a decision without reopening the entire option space.

## Automatic-selection cases

| Request | Expected selection |
| --- | --- |
| “Help me turn this rough onboarding idea into a scoped proposal.” | Select. |
| “Brainstorm ways to reduce support handoff delays.” | Select. |
| “I don't know what the first version of this feature should do. Help me decide.” | Select. |
| “Implement this approved CSV export specification exactly as written.” | Do not select solely because it is a feature request. |
| “Fix the crash in `brainstorming.ts` when the input array is empty.” | Do not select solely because the filename shares vocabulary. |
| “Summarize the brainstorming notes below without adding recommendations.” | Do not select; this is summarization. |

## Holdout: constrained accessibility problem

Request:

> Explore how warehouse staff could report damaged stock while wearing gloves. Devices are shared, connectivity drops, and we cannot store employee identities. Suggest the smallest trial before we buy hardware.

Fixture: No interviews, device inventory, or hardware test results are supplied. If asked, the user can arrange a supervised trial with three staff members and existing devices; they cannot approve a hardware purchase.

Expected outcomes: Treats glove use, shared devices, intermittent connectivity, and privacy as design constraints; explores distinct input or workflow mechanisms; proposes a small trial with observable completion and failure criteria; labels hardware feasibility as unverified; makes no purchase or invented research claim.
