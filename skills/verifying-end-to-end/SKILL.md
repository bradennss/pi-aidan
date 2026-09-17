---
name: verifying-end-to-end
description: Verify implementation changes in a software project through its external interface and backing services. Use before finalizing project code, configuration, schema, dependency, infrastructure, UI, API, worker, or CLI changes, and when the user asks to verify or confirm that a project fix works. End-to-end verification is required for project implementation changes.
---

# Verifying end to end

Prove the changed behavior on a running development stack before describing implementation work as complete. Unit, integration, type, lint, build, and in-process handler checks do not replace this workflow.

## Workflow

1. Read the repository instructions and inspect the current diff. State the user-visible or externally observable behavior that changed, the entry point, every in-repository service on that path, the required backing services, and the final observable effect. Choose the smallest scenario that crosses the changed boundaries. Include the reported reproduction case for a bug fix.
2. Find the repository's documented development, build, seed, migration, health, and end-to-end commands. Prefer its existing runner and fixtures. Check prerequisites before starting anything: required tools, credentials, ports, data stores, queues, object stores, third-party sandboxes, and enough disk or compute capacity.
3. Establish a safe runtime boundary in the current checkout so the stack includes its uncommitted changes. Reuse a running environment only after proving it belongs to this checkout, runs the current files or freshly built artifacts, and uses isolated non-production data. Otherwise allocate unique ports, service namespaces, data stores, and temporary directories through the repository's supported local overrides. Do not create another worktree for post-change verification because uncommitted files will be absent there.
4. Build affected images, generated clients, assets, packages, or executables from the current working tree. Start the required backing services first, then wait for explicit readiness and dependency connectivity. Use the repository's supported local substitute or sandbox for an external provider, and record that boundary. Never send verification traffic, migrations, or writes to production or any shared mutable environment, even with approval.
5. Apply required migrations and seed the smallest deterministic fixture after the backing services are ready. Record service URLs, process or container identities, log locations, and the commands used. Keep secrets out of commands, logs, artifacts, and the final report.
6. Start each required application component and verify its health, migration state, dependency connections, worker subscriptions, and startup logs. Confirm that browser assets or other generated output came from the current build. A listening port alone is insufficient when the service has dependencies.
7. Exercise the changed behavior through the same public boundary a user or upstream system uses. Interact with rendered controls for a web UI, send a network request to a running API, invoke a built CLI in a fresh temporary workspace, or submit a worker, webhook, scheduled task, or event through its supported ingress.
8. Assert the result at the user-visible boundary and at the final durable or downstream effect when the change has one. Cover the changed success path and one important failure or regression path. Do not mock an affected in-repository boundary. Avoid direct database writes as the test action unless that database is the product's supported external interface.
9. Save enough evidence to diagnose and repeat the check: exact commands, relevant input, expected and observed results, exit status, service logs, and available screenshots, traces, or test reports. Identify the tested source with `HEAD`, dirty status, a diff checksum or equivalent, hashes for relevant untracked inputs, and built artifact identifiers. Redact credentials and personal data. A passing command without a named assertion does not complete this workflow.
10. If the check fails, inspect the evidence, fix the cause, restart or rebuild affected components, and rerun the full changed scenario. Any implementation edit after a passing run invalidates that run for the affected path.
11. Stop processes and remove disposable data created only for this check, unless they belong to the task environment and remain needed for review or follow-up. Preserve the task checkout, failure logs, and artifacts for `finishing-up-work`. Never remove resources whose ownership is uncertain.
12. Report end-to-end verification as `passed`, `failed`, `blocked`, or `out-of-scope`. Use `out-of-scope` only for the documented exception below. Include the stack and source-state identifiers tested, scenario and assertions, commands and artifacts, external boundaries or substitutes, cleanup result, and any path left untested.

## Verification rules

Do not weaken the scenario to make it pass. Running the full unit or integration suite, calling an in-process handler, querying a database after manually inserting state, or testing only a mocked service does not prove end-to-end behavior.

When a required service, credential, safe sandbox, or tool is unavailable, run narrower checks only as diagnostic evidence. Mark end-to-end verification `blocked`, name the exact prerequisite and safe next step, and do not claim the implementation is complete or verified end to end.

Ask before an action will incur material cost, contact an external account, or send notifications outside an isolated sink. If an isolated target is unavailable, mark end-to-end verification `blocked`. Stop immediately if configuration resolves to production or a shared mutable environment, an environment cannot be tied to the current checkout, or cleanup ownership cannot be established.

Documentation-only changes with no effect on rendered or executable behavior do not require a runtime stack. Report `out-of-scope` and say why. For generated documentation, examples, deployment files, or configuration that changes runtime behavior, run the affected rendered or deployed path.
