---
name: verifying-end-to-end
description: Use when changed behavior needs verification through a user or integration boundary, or passing lower-level tests leave an important outcome unproven.
---

# Verifying end to end

## Choose useful evidence

Verify the delivered outcome, using a depth appropriate to the change and the consequences of failure. Start with existing tests and documented workflows. When lower-level tests leave a changed user path or integration outcome unproven, exercise the relevant boundary before claiming that outcome works. Choose the smallest check that actually closes the gap. A focused test or smoke check can fully cover a small change; a risky integration needs broader coverage. Avoid building a new harness or bringing up unrelated services when existing tools can provide the required evidence.

Ask what could still be wrong after the available checks pass. For example, a handler test may miss request routing, and an accepted job may still fail before writing its result. Verify at the boundary needed to resolve that uncertainty.

| Outcome to verify | Possible entry point |
| --- | --- |
| UI interaction or rendering | Browser |
| API contract or webhook | HTTP request from a caller |
| CLI behavior | Executable invoked as a user |
| Worker or scheduled job | Enqueue or scheduling entry point |
| Prompt or skill behavior | Fresh agent applying the guidance to a representative task |

Select the boundary that covers the changed outcome; a change does not need every entry point in the table. Prose-only changes usually need review and repository checks. Prompt assembly tests verify loading and injection; they do not establish model behavior. Use representative fresh-agent trials to evaluate behavioral claims, and distinguish a trial from reliable evidence of improvement. If such trials are unavailable, report that limitation rather than claiming behavioral improvement.

## Exercise the relevant path

1. Identify the changed outcome and the gap to check. Include the reported reproduction for a fix and verify the intended success case. Cover relevant failure behavior. For access control, persistent data, infrastructure, or releases, exercise the affected denial, partial-failure, retry, or recovery path as appropriate.
2. Use documented startup and test commands with safe local or disposable resources. Confirm the process includes the changed code; a rebuild or restart is usually enough. Ask before unauthorized production changes, shared-data mutations, material cost, or external notifications.
3. Exercise the relevant entry point and compare expected and observed results. For asynchronous or stateful behavior, observe completion or durable effects when they are part of the outcome. An accepted request or success toast alone does not prove those effects. Use bounded waits.
4. Fix failures caused by the change and rerun affected checks. Relevant edits can invalidate earlier results. If a dependency is unavailable, run useful independent checks and report the specific untested boundary.
5. Remove task-owned fixtures and processes without disturbing pre-existing resources.

For a CSV quoting fix, a test that parses an export containing commas and quotes may cover the defect. Use a browser against the real API when download behavior or integration is also in question. Add authorization checks if the change affects access control.

## Report what the evidence supports

Briefly state what you exercised, the observed result, and important gaps. Include commands or artifacts that help reproduce or diagnose the result. Use more detail for higher-risk work; routine checks do not need a formal evidence template or source fingerprint.

Distinguish real dependencies from mocks, sandboxes, or substitutes. A passing substituted path does not prove the external service works. A plan for verification is not an executed check, and a passing unit test alone does not establish an untested user path. Keep claims within the evidence you actually collected.
