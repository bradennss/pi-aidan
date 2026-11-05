---
name: verifying-end-to-end
description: Use when finalizing changes to executable or rendered behavior, confirming a fix works, or passing tests leave the real user path or downstream effects unverified.
---

# Verifying end to end

Prove the changed outcome through the product's public interface on a safe running stack from the current checkout. Passing unit tests, builds, or direct handler calls cannot establish this outcome.

## Choose the boundary

| Changed behavior | Start verification at |
| --- | --- |
| UI interaction or rendering | Browser |
| API contract or webhook | HTTP request from a caller |
| CLI behavior | Executable invoked as a user |
| Worker or scheduled job | Public enqueue or scheduling entry point |
| Skill instructions | Fresh agent applying the skill to a realistic task |

Follow the affected path through real in-repository services to its observable result. A browser test with an intercepted backend proves only the substituted path. For third-party dependencies, use a sandbox or local substitute and identify the unverified external boundary.

Pure prose changes with no executable, rendered, or agent-behavior effect are out of scope. Examples, generated documentation, configuration, and deployment changes require their affected path.

## Verification recipe

1. **Define the proof.** Inspect the diff and repository instructions. Name the changed outcome, public entry point, dependencies, and final effect. Plan the success case and one important failure or regression case. For a fix, include the reported reproduction.
2. **Prepare a safe stack.** Find documented build, startup, migration, seed, and health commands. Use isolated non-production resources. Stop for production targets, shared mutable data, or unclear ownership. Ask before material cost or external notifications.
3. **Establish freshness.** Record `HEAD` plus a patch hash or build identifier covering uncommitted and relevant untracked files. Build and start affected components from that source. Reuse a process only with evidence of its source identity. Wait for readiness and seed minimal fixtures.
4. **Exercise and assert.** Run both cases through the chosen boundary. Compare expected and observed results. For asynchronous work, wait for completion with a bounded timeout. Verify durable effects independently through a read, reload, download, or backing-service query. An accepted request or success toast alone is insufficient.
5. **Resolve and repeat.** Fix failures, rebuild or restart affected components, and rerun both cases. Relevant edits invalidate earlier evidence. If a required safe service, credential, or tool is unavailable, mark that scenario blocked; run independent checks separately.
6. **Clean up and report.** Remove task-owned fixtures and stop task-owned processes. Preserve diagnostic artifacts. Leave pre-existing resources untouched.

## Evidence and handoff

Record these fields for each scenario:

- **Status:** passed, failed, blocked, or out-of-scope, with a reason.
- **Source and environment:** source identifier, startup commands, target, dependencies, and substitutes.
- **Proof:** reproducible commands or actions, inputs, expected and observed assertions, exit status, and artifact paths. Exclude secrets.
- **Cleanup and gaps:** resources removed or retained, untested boundaries, and the next action for blockers.

For a CSV quoting fix, seed records containing commas and quotes, export through the browser against the real API and database, then parse the download and compare exact values. Check that an unauthorized export fails without leaking records. Save the assertions with the tested source identifier, then remove the fixtures.

## Common mistakes

| Shortcut | Required correction |
| --- | --- |
| “The E2E suite is green.” | Confirm its source, real boundaries, and relevant assertions. |
| “The request returned 202.” | Observe the worker's final effect. |
| “Only the happy path matters.” | Exercise the selected failure or regression case. |
| “I can describe what I would run.” | Report blocked or pending work; a plan is not execution evidence. |

Red flags: unknown build identity, mocked affected services, missing downstream assertions, or evidence predating relevant edits. Resolve the gap before claiming the scenario passed.
