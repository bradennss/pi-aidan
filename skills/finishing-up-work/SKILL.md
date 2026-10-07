---
name: finishing-up-work
description: Finish software changes through required checks, end-to-end verification, review, user-chosen integration, and safe teardown. Use before reporting implementation complete or when asked to wrap up, commit, merge, open a pull request, or leave work for later.
compatibility: Requires Git plus the verifying-end-to-end and reviewing-your-work skills. Temporary environments also require tearing-down-an-environment.
---

# Finishing up work

Keep the checkout until the work has a safe disposition.

1. Identify the checkout, branch, base, `HEAD`, temporary resources, and unrelated changes.
2. Finish the implementation. Run focused and required project checks, then inspect `git status` and the full diff.
3. Load `verifying-end-to-end`. Require `passed` for executable or rendered changes and its documented `out-of-scope` result otherwise.
4. Load `reviewing-your-work` after verification and require `clean`. Any later edit invalidates affected verification and review, so rerun them in order.
5. Record the checkout, branch, `HEAD`, dirty state, diff summary, checks, verification, review, remotes, upstream, and intended integration target.
6. Ask the user to choose one action:
   - **Merge locally:** create focused commits, merge into the approved clean target without rewriting history, and rerun required checks.
   - **Create a PR:** create focused commits, confirm authentication, push without force, open against the approved base, and verify its URL and refs.
   - **Leave for later:** create no history or remote changes. Stop safe task services and preserve the checkout and changes.
7. Execute only the selected action. Resolve unknown targets with the user. Preserve state and evidence on conflicts or failures.
8. Load `tearing-down-an-environment` when this session created a temporary environment. Remove it after successful integration; retain its worktree for **Leave for later**.
9. Report the disposition, identifiers, checks, verification, review, teardown, retained state, and blockers.

The user's merge or PR choice authorizes only the commits needed for that action. It doesn't authorize force pushes, discarded work, credential changes, or destructive cleanup.

Failed setup, checks, verification, review, integration, or teardown leave the task unfinished. Keep diagnostic evidence and don't present merge or PR actions as ready.
