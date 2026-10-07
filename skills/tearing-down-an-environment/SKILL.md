---
name: tearing-down-an-environment
description: Safely remove a task's isolated development environment. Use after project work to clean up its worktree, processes, containers, namespaces, ports, generated files, and local data.
---

# Tearing down an environment

Remove only resources proven to belong to the task. Preserve work and uncertain resources.

1. Reconstruct the environment from session notes, repository instructions, Git, and runtime configuration. Ask before removing anything with unclear ownership.
2. Inspect live resources and Git safety. Refuse worktree removal while files are dirty. Refuse branch deletion while commits are unpushed or unmerged. State these blockers before requesting missing identifiers.
3. Stop task-owned applications, workers, containers, backing resources, and disposable files in dependency order using the same names, contexts, profiles, and configuration used at setup.
4. Verify each process and service by identity, ownership, and working directory. A port or similar name alone is insufficient.
5. Keep the worktree when integration failed, changes remain, or the user chose **Leave for later**. Otherwise remove it from another checkout with `git worktree remove <path>`, never `--force`.
6. Keep the branch unless the user asks to delete it and `git branch -d` confirms it is merged. Never delete a remote branch during teardown.
7. Verify removed resources are gone. Report removals, retained state, the branch, and manual follow-up.

Pass Kubernetes context and namespace explicitly. Remove Docker volumes, databases, queues, buckets, indexes, and other mutable data only with exact task ownership and no retained value. Never use wildcard, account-wide, cluster-wide, or forceful cleanup.

Don't stash, reset, clean, commit, push, discard work, or change global configuration to make teardown pass. On failure, preserve evidence and report the blocker and safe next step.
