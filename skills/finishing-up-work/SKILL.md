---
name: finishing-up-work
description: Finish a task that changed files or project state by checking setup, end-to-end verification, self-review, user-directed commit or integration, and safe teardown. Use before reporting implementation complete and when the user asks to finish, wrap up, commit, merge locally, create a pull request, or leave changes for later.
compatibility: Requires Git plus the verifying-end-to-end and reviewing-your-work skills. Temporary environments also require tearing-down-an-environment. Local merge and pull request options may require remote credentials and a repository hosting CLI.
---

# Finishing up work

Close the task through this workflow. Keep the checkout until its changes have a safe disposition.

## Workflow

1. Identify the current checkout, branch, base ref, and whether this session created a temporary environment. Confirm that environment setup was handled before meaningful changes, unless the task created a new project or was explicitly treated as a small, low-risk change in the current checkout.
2. Finish the implementation and the repository's focused and required checks. Inspect `git status --short --untracked-files=all` and the full diff. Keep unrelated user changes out of commits and integration actions.
3. Load and follow `verifying-end-to-end`. Require a `passed` result for executable or rendered behavior. Accept its documented `out-of-scope` result for a change with no effect on rendered or executable behavior. A `failed` or `blocked` result leaves the task unfinished.
4. After end-to-end verification, load and follow `reviewing-your-work`. Require a `clean` result. Any later file change invalidates the affected verification and final review, so rerun both required gates in order.
5. Before offering integration actions, record in the conversation: checkout and branch, current `HEAD`, dirty status, diff summary, verification and review results, commands and exit statuses, intended integration ref when known, remotes, and upstream state. Do not assume the setup base ref is still the correct integration target.
6. Ask the user to choose exactly one disposition. Use the host's question tool when available. Include the branch, checkout, known integration target, and a short effect for each choice:
   - **Merge locally**: create the task commit or commits, merge a linked task branch into the approved local integration branch, verify the result, then tear down any temporary environment. For a new project or a small change made directly in its intended checkout, commit on the approved current branch.
   - **Create a PR**: create the task commit or commits, push the task branch, open a pull request against the approved target, then tear down any temporary environment.
   - **Leave for later**: create no commits, pushes, merges, or pull requests. Stop task-specific runtime resources and preserve the checkout, branch, and changes.

   Choosing merge or pull request authorizes commits required for that choice. It does not authorize discarding unrelated changes, force pushes, credential changes, or destructive cleanup.

7. Execute only the selected disposition:
   - For a local merge, resolve an unknown target with the user. Require the target checkout to be clean and current enough for the operation, then record its pre-merge `HEAD`. Create focused commits that follow repository instructions and merge without rewriting existing history. Run the repository's required checks on the integrated tree. If the merge conflicts, use `git merge --abort` only after confirming the merge state belongs to this attempt. If abort fails, preserve the conflicted checkout and both branches. If post-merge checks fail, preserve both branches and the integrated tree for diagnosis.
   - For a pull request, resolve an unknown base with the user. Confirm the remote and authentication before mutation. Create focused commits, push without force, create the pull request with a concise reason for the change, and verify its URL and head and base refs.
   - For leave for later, make no Git history or remote changes. Continue to the limited teardown in step 8.

   Record the selected action, target, completed steps, result, failure, Git state, and external identifiers in the conversation. If a merge, post-merge check, push, or pull request step fails, preserve the local branch, checkout, and evidence needed to resume.

8. Load and follow `tearing-down-an-environment` when this session created a temporary environment. After a successful local merge or pull request, remove task-specific runtime resources and the clean temporary worktree. For leave for later, stop runtime resources that are safe to recreate and retain the worktree. Preserve a new project's initial checkout and any current checkout used for a small change.
9. Report the chosen disposition, commits and integration or pull request identifiers when created, verification and review evidence, teardown result, retained branch or checkout, and every blocked or manual follow-up item.

## Blocked gates

When setup, end-to-end verification, review, or a required repository check fails, do not present merge or pull request actions as ready. Preserve diagnostic evidence and Git work. Stop only task-specific runtime resources whose cleanup cannot damage that evidence, and retain the checkout for an approved resume.

Never claim completion while a required gate, selected integration action, or required teardown step is failed or unverified.
