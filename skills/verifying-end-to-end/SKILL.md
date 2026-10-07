---
name: verifying-end-to-end
description: Verify software changes through the product's public interface and backing services. Use before finalizing changes to executable or rendered behavior, or when asked to confirm a fix works.
---

# Verifying end to end

Prove changed behavior on a safe running stack built from the current checkout. Unit, integration, type, lint, build, and in-process checks don't replace this proof.

1. Inspect the diff and repository instructions. Name the changed observable behavior, public entry point, service path, backing resources, and final effect. Include the reported reproduction for a bug fix.
2. Find documented build, migration, seed, health, and end-to-end commands. Check tools, credentials, ports, services, capacity, and cost before starting.
3. Use the current checkout and isolated non-production resources. Reuse a stack only after proving it runs current files or fresh artifacts from this checkout. Never test against production or shared mutable data.
4. Build affected artifacts, start dependencies in order, wait for readiness, migrate, seed the smallest fixture, then start the application. Record identities, URLs, logs, and source state without exposing secrets.
5. Exercise the same public boundary a user or upstream system uses. Assert the changed success path, one important failure or regression path, and any durable downstream effect. Don't mock an affected in-repository boundary.
6. Save reproducible evidence: commands, inputs, expected and observed results, exit status, logs or artifacts, `HEAD`, dirty status, and an identifier for the tested diff or build.
7. Fix failures, rebuild or restart affected components, and rerun the full scenario. Any relevant edit invalidates prior evidence.
8. Stop task-owned verification resources. Preserve evidence needed for diagnosis or `finishing-up-work`.
9. Report `passed`, `failed`, `blocked`, or `out-of-scope`, with tested source, scenario, assertions, external substitutes, cleanup, and untested paths.

Mark the result `blocked` when a required safe service, credential, sandbox, or tool is unavailable. Ask before material cost or external notifications. Stop if configuration points to production, shared mutable state, an untraceable build, or resources with unclear ownership.

Use `out-of-scope` only for documentation changes with no rendered or executable effect. Generated documentation, examples, deployment files, and runtime configuration still require their affected path.
