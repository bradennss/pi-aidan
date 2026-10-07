---
name: reviewing-your-work
description: Review completed software changes before finalizing, committing, opening a pull request, or reporting completion. Use after checks and end-to-end verification. Substantive or high-risk changes require one fresh-context independent reviewer unless the user waives it.
compatibility: Requires Git and standard Unix tools. Independent review requires a host that can launch a read-only subagent in fresh context.
---

# Reviewing your work

The implementing agent owns the review, edits, validation, and final decision. A review subagent only reports issues.

1. Complete focused, project, and end-to-end checks. Keep blocked or failing evidence visible.
2. Personally read every changed line, the full Git state, surrounding code, tests, configuration, and documentation. Check the user's goal, callers, failures, compatibility, security, scope, test quality, and prose. Fix issues and rerun affected checks.
3. Require independent review when a second perspective could catch a material issue, especially for substantive or high-risk behavior, interfaces, data, security, schemas, dependencies, infrastructure, prompts, or skills. Skip it for small low-risk edits or an explicit waiver, and state why.
4. For independent review, create a complete diff artifact in a unique temporary directory outside the repository. Include staged, unstaged, and untracked files without altering the index.
5. Launch exactly one fresh, read-only reviewer with the repository root, `HEAD`, artifact path, user goal, acceptance criteria, active instructions, and validation results. Exclude the author's reasoning and prior review prose.
6. Verify each finding against current source. Classify it as valid, stale, invalid, speculative, or outside scope. Fix valid in-scope findings from rounds one and two, then rerun affected checks and review the complete new diff with a fresh reviewer. Don't fix third-round findings without user approval.
7. Stop `clean` when no qualifying issue remains and validation passes. After three non-clean rounds, ask the user before fixing more findings or starting another three-round cycle.
8. Stop `blocked` on repeated findings; a round-one or round-two result with no accepted change; failed validation; review infrastructure failure; declined continuation; or a decision needing user authority. The round-three approval pause isn't blocked. Preserve work and report the exact blocker.
9. Remove temporary review artifacts unless they are needed to diagnose infrastructure failure.

## Reviewer contract

Report only concrete diff-caused issues that must be fixed before finalizing. For each `P0` blocker or `P1` required fix, give the file and line, evidence, impact, and smallest safe fix. Exclude polish, unsupported preferences, pre-existing defects, and speculation. Return exactly `No issues found.` when clean. Don't edit files, launch subagents, or trust validation claims without checking source evidence.

Use structured output when available: `verdict: "clean" | "issues_found" | "blocked"` and an `issues` array with `priority`, `file`, `line`, `title`, `evidence`, `impact`, and `smallestFix`.
