---
name: setting-up-an-environment
description: Prepare an existing software project for implementation by choosing the current checkout or an isolated development environment, checking repository instructions and state, and preventing resource collisions. Use before changing project code, dependencies, configuration, schemas, infrastructure, UI, APIs, workers, or project CLIs. Skip read-only investigation and new project creation.
---

# Setting up an environment

Prepare the project checkout and runtime isolation before installing project dependencies or starting project services. Match the effort to the task's collision risk.

## Workflow

1. Read the repository instructions. Inspect Git status, existing worktrees, remotes, development commands, environment templates, and service configuration. When creating a new project outside an existing repository, use `setting-up-new-projects` and stop this workflow.
2. Decide whether the task needs isolation. Use it for code, dependencies, generated files, services, data changes, long-running work, or anything that could conflict with another checkout. You may stay in the current checkout for a small, low-risk change when that checkout is suitable. State the decision and reason before editing.
3. Follow the project's documented environment method when it has one. Otherwise choose a short task name, a descriptive branch, and a non-conflicting worktree path. Use the requested base ref, or the current committed `HEAD` when none was specified. Check existing worktrees, branches, and the destination before running `git worktree add`. Do not use `--force`, overwrite a path, or move uncommitted source-checkout changes without approval.
4. Identify the resources that can collide with other environments. Check host ports, Compose project names, containers, Kubernetes contexts and namespaces, databases, caches, queues, object storage, sockets, PID files, temporary directories, test resources, and callback URLs. Include only surfaces used by this project and task.
5. Configure each relevant resource through the project's supported environment variables, profiles, local files, or tool flags. Keep generated output in the task checkout. Shared immutable package caches are acceptable; shared writable application state is not.
6. Install dependencies in the task checkout. Start only the services needed for implementation or verification, and keep the exact start, stop, and re-entry commands available for teardown.
7. Verify the environment before implementation. Check the branch and `git status`, service health and logs, bound ports, container or namespace identity, backing-service connections, and fallback to shared defaults. Run the repository's documented smoke check when one exists.
8. Report the checkout path, branch, isolated names and ports, service URLs, setup commands, verification result, and cleanup commands. Continue with the implementation, then load `finishing-up-work` before reporting the project change complete.

## Isolation rules

Use one task name consistently across supported tools. For Docker Compose, set a unique project name unless the repository provides another isolation mechanism. Avoid fixed `container_name` values when they would collide with another stack.

For Kubernetes, pass the intended context and namespace explicitly. Do not change the user's global current context. Create a dedicated namespace only when the task needs one, and label it so ownership is clear.

Give mutable backing services dedicated names, prefixes, schemas, or instances. This includes databases, Redis data, broker queues and topics, buckets, and search indexes. A separate HTTP port does not isolate shared data.

Allocate separate loopback ports for published listeners. Use the repository's allocator when available; otherwise select free ports and verify the owning process or container after startup. A free-port probe before launch does not reserve the port.

Do not change global Git, Docker, Kubernetes, host, or shell configuration. Do not edit tracked files solely to configure one environment when a supported local override exists. Stop and ask when the project hard-codes a shared resource and offers no safe override.

Use secrets from the repository's documented source without printing them. Confirm that any local environment file is ignored before writing secrets or machine-specific values to it.

## Failure handling

If setup fails, stop resources created during the attempt when their ownership is clear. Preserve the worktree, existing files, logs, and other diagnostic evidence. Report the failed command, remaining resources, and the safest next step. Never claim the environment is ready while a required resource can still collide with other work.
