---
name: setting-up-an-environment
description: Prepare an existing software project for safe implementation. Use before changing project code, dependencies, configuration, schemas, infrastructure, UI, APIs, workers, or CLIs. Skip read-only work and new project creation.
---

# Setting up an environment

Choose the smallest environment that prevents collisions and protects existing work.

1. Read repository instructions. Inspect Git status, worktrees, remotes, setup commands, environment templates, and service configuration.
2. State whether the current checkout is safe. Use an isolated worktree for changes or services that could conflict; a clean current checkout is acceptable for small, low-risk edits. Never move or overwrite existing work.
3. Follow the repository's setup method. Otherwise create a descriptive branch and `../<repo>-worktrees/<task>` from the requested base or current `HEAD`. Check names and paths first, and never use `--force`.
4. Identify mutable resources the task uses, including ports, containers, namespaces, databases, queues, caches, files, and callback URLs. Give each environment distinct names, data, and loopback ports through supported overrides.
5. Install dependencies and start only required services. Keep setup, re-entry, and cleanup commands.
6. Verify the branch, status, resource ownership, service health, logs, connections, and absence of shared fallbacks. Run the documented smoke check.
7. Report the checkout, branch, isolated resources, commands, result, and cleanup steps. Load `finishing-up-work` after implementation.

Don't change global Git, Docker, Kubernetes, host, or shell settings. Pass Kubernetes context and namespace explicitly. Don't use a separate port as a substitute for isolated mutable data. Keep secrets out of output and confirm local secret files are ignored.

If setup fails, stop resources clearly created by this attempt and preserve diagnostic evidence. Report the failed command, remaining resources, and safe next step.
