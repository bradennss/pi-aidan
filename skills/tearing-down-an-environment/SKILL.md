---
name: tearing-down-an-environment
description: Tear down an isolated development environment created for a task or work session. Use when finishing work, removing a task worktree or dev stack, or cleaning up its ports, processes, containers, namespaces, and local data without affecting other environments.
---

# Tearing down an environment

Use the setup manifest as the authority for ownership. Remove only resources whose exact identity and ownership match it, and preserve all Git work unless removal is proven safe.

## Workflow

1. Identify the target environment from the request or current worktree. Resolve its canonical path and Git common directory, then find the matching `<git-common-dir>/aidan-environments/<environment-id>/manifest.json`. If more than one manifest could match, ask the user to choose. Validate the schema version, repository identity, worktree path, branch, and environment ID before acting.
2. If no valid manifest exists, perform read-only discovery and report what can be identified from `git worktree list --porcelain`, process metadata, container labels, and service configuration. Do not infer ownership from a name prefix or port alone. Ask for confirmation before removing any reconstructed resource, and create a recovery manifest when teardown will continue.
3. Build a teardown plan from the manifest and compare every recorded item with live state. Classify resources as matched, already absent, changed, or unverifiable. Mark the manifest `tearing-down` and update it after each successful action so an interrupted teardown can resume.
4. Inspect Git safety before removing files or the worktree. Record `git status --short --untracked-files=all`, the checked-out branch and `HEAD`, upstream, commits ahead of upstream, and containment in the intended integration ref. Dirty or untracked files block worktree removal. Unpushed commits, a missing upstream, or uncertain containment block branch deletion; preserve and report the branch when removing its clean worktree. These Git conditions do not block cleanup of runtime resources whose ownership is proven.
5. Stop runtime resources in dependency order: application processes, task workers and watchers, containers or clusters, then backing-service namespaces and generated local files. Follow the resource-specific rules below.
6. Verify that each owned process and service is gone. Check exact container labels and project names, explicit Kubernetes context and namespace, service resource names, and recorded process identity. A recorded port may have been reused, so do not stop a new listener merely because it now holds the same port.
7. Remove the worktree from a different checkout with `git worktree remove <canonical-path>`. Never pass `--force`. Keep the branch by default. If the user explicitly asks to delete it, first prove it has no unpushed or unmerged commits, then use `git branch -d <branch>` from another worktree. Never use `git branch -D` or delete a remote branch as part of environment teardown.
8. Delete the environment state directory only after every owned resource is gone and the worktree removal, when requested, succeeds. If a retained resource remains, keep the manifest with status `retired-with-retained-resources` until ownership is transferred to another recorded manifest or the resource is removed. For a partial teardown, set the status to `teardown-blocked`, retain the remaining-resource records, and report the exact blocker and safe next step.

## Resource-specific rules

For a recorded process, compare its PID, start time, command, and working directory with the live process. Signal it only when the identity still matches. Send the platform's normal termination signal and wait for shutdown. If it does not exit, report it and ask before using a forceful signal. A missing process counts as already absent; a reused PID counts as changed and must be left alone.

For Docker Compose, use the exact recorded project name, project directory, Compose files, profiles, and environment-file path on every command. Inspect the resolved project and labels before running `down`. Remove volumes only when the manifest marks each one as created by this environment and disposable. Keep external, shared, durable, and unverifiable volumes.

For Kubernetes, pass the recorded context and namespace explicitly on every command. Verify the environment and repository ownership labels before deleting a namespace or resource. Never change the global current context, delete a context, or delete an unlabeled namespace based only on its name.

For databases, schemas, Redis data, broker resources, buckets, search indexes, and cloud sandboxes, require the exact recorded name plus ownership evidence. Delete only resources marked as created by this environment. Never use wildcard, prefix-wide, account-wide, `flushall`, or cluster-wide cleanup commands. Preserve resources whose retention policy is `keep` or whose ownership cannot be checked.

For generated files and directories, compare the current content or hash with the manifest. Remove an unchanged file created by setup. Preserve and report a changed file, symlink with a different target, directory containing unrecorded entries, or any path outside the canonical worktree and manifest-owned state directory. Never recursively remove a path assembled from an empty or unvalidated variable.

## Git safety

Do not stash, reset, clean, commit, push, or discard work to make teardown pass. Show the user the blocking paths and commits. A missing upstream leaves push status unknown, so keep the branch and report its exact name and `HEAD`. Before and after removing a clean worktree, verify that the branch ref still resolves to the recorded `HEAD`; uncommitted files still block removal.

Do not equate the setup-time base ref with the integration ref: the base ref records where work began, while safe branch deletion requires a current ref that contains the finished commits. Fetch only with approval or when repository instructions already permit it. Use the nominated local or remote-tracking integration ref for the containment check and report when it may be stale.

## Final verification

Confirm that no process with the recorded identity remains, no service resource with the environment's verified ownership remains unless its retention policy says to keep it, and the worktree path is absent when removal was requested. Run `git worktree list --porcelain` to check Git's view. Keep or transfer the manifest for every retained owned resource. Report retained data, retained branch names, skipped resources, and any manual follow-up with exact identifiers.
