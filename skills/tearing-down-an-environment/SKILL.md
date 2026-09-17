---
name: tearing-down-an-environment
description: Tear down an isolated development environment created for a software project task. Use after finishing project work to remove a task worktree or development stack and clean up its ports, processes, containers, namespaces, and local data.
---

# Tearing down an environment

Remove only resources that belong to the task. Preserve Git work and anything whose ownership is uncertain.

## Workflow

1. Identify the environment from the current session, repository instructions, worktree path, branch, setup commands, and runtime configuration. If details are missing, inspect Git and running services without changing them, then ask the user before removing anything uncertain.
2. Build a cleanup plan covering the worktree, processes, containers, service namespaces, generated local files, and task-specific data. Compare each item with live state before acting. Treat a changed or reused resource as unrelated until ownership is proven.
3. Inspect Git safety. Check `git status --short --untracked-files=all`, the branch, `HEAD`, upstream, unpushed commits, and whether the intended integration ref contains the task commits. Dirty or untracked files block worktree removal. Unpushed or unmerged commits block branch deletion.
4. Stop runtime resources in dependency order: application processes, workers and watchers, containers or clusters, backing-service namespaces, then disposable generated files and data. Use the same project options, names, contexts, and configuration used during setup.
5. Verify that each task-owned process and service is gone. Check exact process identity, container labels or project names, Kubernetes context and namespace, and backing-service resource names. Do not stop a listener based on its port alone because another process may have reused it.
6. Keep the worktree when integration failed, when it contains changes, or when the user chose **Leave for later**. Otherwise remove a clean temporary worktree from another checkout with `git worktree remove <path>`. Never pass `--force`.
7. Keep the branch by default. Delete it only when the user asks and `git branch -d` proves it is safely merged. Never use `git branch -D` or delete a remote branch during environment teardown.
8. Verify Git no longer lists a removed worktree. Report removed resources, retained files and data, the branch name, and any manual follow-up command.

## Resource-specific rules

For a process, compare its PID, command, start time when available, and working directory with the process started for the task. Send the normal termination signal and wait for shutdown. Ask before using a forceful signal.

For Docker Compose, use the same project name, project directory, Compose files, profiles, and environment file used during setup. Inspect the resolved project before running `down`. Remove volumes only when they were created for this task and contain no data that must be retained.

For Kubernetes, pass the context and namespace explicitly. Verify task ownership labels before deleting a namespace or resource. Never change the global current context or delete an unlabeled namespace based on its name.

For databases, schemas, Redis data, broker resources, buckets, search indexes, and cloud sandboxes, require the exact task-specific name and clear ownership. Never use wildcard, prefix-wide, account-wide, `flushall`, or cluster-wide cleanup commands.

For generated files and directories, remove only items created for the environment that remain safe to discard. Preserve changed files, directories with unknown contents, symlinks with unexpected targets, and paths outside the task checkout.

## Git safety

Do not stash, reset, clean, commit, push, or discard work to make teardown pass. A missing upstream leaves push status uncertain, so preserve the branch and report its exact name and `HEAD`. Fetch only with approval or when repository instructions already permit it.

A teardown failure leaves the environment in place. Preserve files, branches, services, and diagnostic evidence needed to resume. Report the exact blocker and safe next step instead of claiming cleanup succeeded.
