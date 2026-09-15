---
name: setting-up-an-environment
description: Set up an isolated development environment for work in an existing project. Use when starting a task, issue, branch, or session that should run beside other checkouts, especially when creating a Git worktree or isolating ports, containers, databases, queues, caches, and service namespaces.
---

# Setting up an environment

Create the worktree and isolation boundary before installing dependencies or starting services. Treat the environment as unsafe to start until every writable or addressable resource has an isolated name, path, or port.

## Workflow

1. Inspect the repository instructions, current Git state, existing worktrees, remotes, development commands, environment templates, and service configuration. Identify the requested base ref and task name from the request. Use the current committed `HEAD` as the base when neither is specified, and say so. Uncommitted changes are absent from a new worktree; stop if they appear to be part of the requested starting point. Never stash, commit, discard, or move them without approval.
2. Build a collision inventory before changing anything. Cover host ports, Compose project and container names, Kubernetes contexts and namespaces, database names or schemas, Redis keys or instances, broker vhosts and queue or topic names, object-storage buckets, local sockets and PID files, temporary and cache directories, test resources, callback URLs, and any cloud sandbox identifiers. Include debug, hot-reload, and test-runner ports.
3. Choose an environment ID containing only lowercase letters, numbers, and hyphens. Derive it from the task and add a short suffix when needed. Reuse the repository's branch and worktree conventions; otherwise use a descriptive task branch and a sibling worktree directory. Check `git worktree list --porcelain`, local branches, and the destination first. Atomically reserve the environment state directory described below before creating the worktree. Never overwrite or reuse an existing manifest; inspect it and choose a new suffix or stop.
4. Write an `allocating` manifest with the planned worktree, branch, and base ref. Create a new branch with `git worktree add -b <branch> <path> <base-ref>`, or attach an existing branch with `git worktree add <path> <branch>`. Do not use `--force`. Set the manifest status to `setting-up` after the worktree exists, then update it after each resource is created or process starts.
5. Configure every collision surface through mechanisms the repository already supports. Prefer environment variables, documented profiles, ignored local files, and tool-native namespace flags. Keep dependencies and generated output inside the worktree. Shared immutable package caches are fine; shared writable application state is not.
6. Install dependencies and start the stack from the new worktree with the isolated environment values applied explicitly. Record each created resource and process immediately, including enough identity data to distinguish a reused PID or resource name.
7. Verify the running environment. Check service identities and namespaces, bound addresses and ports, health endpoints, logs for fallback to default resources, and `git status --short --untracked-files=all`. Run the repository's documented smoke or development check when one exists. Set the manifest status to `ready` only after every inventory item is isolated and the checks pass.
8. Report the worktree path, branch, environment ID, namespace values, service URLs and ports, commands used to start or re-enter the environment, verification results, and manifest path. Name `tearing-down-an-environment` as the cleanup skill.

## Isolation rules

Use one environment ID consistently across tools. For Docker Compose, set a unique `COMPOSE_PROJECT_NAME` or pass `--project-name` on every command. Store the exact Compose files, profiles, project directory, and environment-file path in the manifest so teardown can repeat the same invocation. Avoid explicit `container_name` values because they bypass project scoping; if the repository fixes them, do not start a second stack until there is a safe override.

For Kubernetes, always pass the recorded context and namespace. Do not change the user's global current context. Create a dedicated namespace only when the request needs one, and label it with the environment ID and repository identity so teardown can prove ownership.

Give mutable backing services dedicated names or dedicated instances. This includes databases, schemas, Redis key prefixes, broker vhosts, queues, topics, buckets, and search indexes. A different HTTP port does not isolate shared data. Prefer a dedicated container when an application cannot namespace its writes safely.

Allocate a separate loopback host port for every published TCP and UDP listener. Use the repository's allocator when it has one; otherwise probe the local system for a free port, write the selected value to the isolated configuration, and check it again immediately before launch. Keep container ports unchanged when only the host binding must differ. After launch, inspect the listener and confirm the owning process or container belongs to this environment. A pre-launch probe alone does not reserve a port.

Do not change global Git configuration, Docker contexts, Kubernetes contexts, hosts files, or shared shell profiles. Do not edit tracked files solely to make one environment run. If a required port, resource name, or data target is fixed in tracked configuration and no supported local override exists, stop before starting services. Explain the collision and ask whether to add a repository-level parameterization change.

Use an ignored local environment file only after `git check-ignore` confirms it cannot be committed accidentally. If the required filename is tracked or unignored, use a supported external environment-file flag or stop and ask. Reuse secrets from the repository's documented source without printing them. Never put secret values in the manifest.

## Environment manifest

Store manifests outside every worktree but inside the repository's Git common directory. Resolve the common directory from the source checkout before creating the new worktree, then reserve one directory per environment:

```sh
source_checkout="/absolute/path/to/source-checkout"
common_dir=$(
  git -C "$source_checkout" rev-parse --path-format=absolute --git-common-dir
) || exit 1
test -n "$common_dir" || exit 1
umask 077
state_root="$common_dir/aidan-environments"
mkdir -p -m 700 -- "$state_root"
state_dir="$state_root/<environment-id>"
mkdir -m 700 -- "$state_dir"
manifest="$state_dir/manifest.json"
```

Confirm `git rev-parse` succeeded and returned the expected nonempty absolute Git common directory before constructing `state_root`. Treat a failed state-directory `mkdir` as a possible ownership collision. Inspect the existing state instead of writing into it. Write valid JSON with these fields when applicable:

- schema version, environment ID, status, creation time, and repository identity
- canonical worktree path, branch, base ref, and Git common directory
- namespace values for Compose, Kubernetes, databases, caches, brokers, object storage, tests, and cloud sandboxes
- each port's service, protocol, loopback address, host port, and target port
- each started process's PID, start time, command, working directory, and log or PID-file path
- each Compose invocation's project name, project directory, files, profiles, and environment-file path
- each Kubernetes resource's context, namespace, ownership labels, and whether setup created it
- each database, volume, bucket, queue, file, or directory created by setup, with its exact name, ownership evidence, and retention policy
- generated local files with a content hash, plus the exact start, stop, re-entry, and verification commands

Use canonical absolute paths in the manifest. Record secret variable names or credential-source paths when needed for teardown, never their values. Do not record broad deletion commands, wildcard names, or unverified resources.

## Failure handling

If setup fails, stop only the processes and runtime resources started during this attempt. Preserve the worktree and any user files. Mark the manifest `setup-failed`, record what remains, and report the failed check plus the exact cleanup command. If worktree creation fails before any resource exists, remove the reserved state directory only after verifying it still contains the unchanged `allocating` manifest from this attempt. Never claim the environment is isolated or ready while an inventory item is unresolved.
