---
name: verifying-end-to-end
description: Use when changing UI flows, API contracts, CLI behavior, background jobs, or service integrations, or when passing unit tests leave a user-visible outcome unproven. Also use when evaluating whether prompt or skill changes affect agent behavior.
---

# Verifying end to end

Verify the delivered outcome at the smallest boundary that closes the evidence gap. Start with existing tests and documented workflows. Ask: **What could still be wrong if these checks pass?** Avoid new harnesses or unrelated services when existing tools suffice.

## Choose the boundary

| Changed outcome | Entry point |
| --- | --- |
| UI interaction or rendering | Browser |
| API contract or webhook | HTTP caller |
| CLI behavior | Executable invoked as a user |
| Worker or scheduled job | Queue or scheduling entry point |
| Prompt or skill behavior | Fresh agent applying the guidance to a representative task |

Use only the boundaries relevant to the change. A focused test or smoke check may suffice; a risky integration needs broader coverage. Prose-only edits usually need review and repository checks. Prompt loading and injection tests do not establish agent behavior; fresh-agent trials provide behavioral evidence, not proof of reliable improvement.

## Exercise the path

1. **Define the gap.** Identify the outcome, expected result, and what existing checks leave unproven. For fixes, include the reported reproduction. Cover success and relevant failures; access control, persistent data, infrastructure, and releases may require denial, partial-failure, retry, or recovery checks.
2. **Run the changed code.** Use documented commands and safe local or disposable resources. Rebuild or restart as needed. Ask before unauthorized production changes, shared-data mutations, material cost, or external notifications.
3. **Observe the outcome.** Exercise the entry point and compare expected and actual results. Follow asynchronous work through completion and check durable effects when relevant, using bounded waits. Acceptance or a success toast alone does not prove completion.
4. **Resolve and rerun.** Fix failures introduced by the change and rerun affected checks after relevant edits. If blocked, run independent checks and identify the untested boundary.
5. **Clean up.** Remove task-owned fixtures and processes; preserve pre-existing resources.

For a CSV quoting fix, parsing an export with commas and quotes may suffice. Use a browser against the real API if download behavior or integration is also in question.

## Report the evidence

State what ran, what happened, and what remains unverified. Include useful commands or artifacts, with detail proportional to risk. Distinguish real dependencies from mocks, sandboxes, and substitutes. Report unavailable agent trials or dependencies explicitly. Keep claims within observed evidence: a plan is not an executed check, and a unit test does not prove an untested user path.
