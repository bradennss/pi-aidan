---
name: tracking-tasks
description: Use when a project mentions Beads or bd, resuming tracked work, handling issues, dependencies, blockers, or status, or choosing a persistent task tracker.
---

# Tracking tasks

Use tracking to make work understandable to the next person or session, not to turn every conversation into paperwork. Ordinary questions and trivial exchanges don't need tickets. In a new project, add tracking only when it's useful or requested.

## Find the project's tracker

- Read the project instructions and check its tracker and workspace configuration.
- Check for redirected storage or worktree setups so you know where issues actually live.
- Use the project's existing tracker. Use Beads only if it's already configured or the user asks for it.
- Get approval before setting up or replacing a tracker in an existing project.

## Get oriented in Beads

- Run `bd where` to locate the active store, then `bd prime` for the project's workflow.
- Run `bd prime` again after context loss rather than relying on remembered instructions.
- Use `bd <command> --help` when you need command details. Let the installed tool and project configuration guide the specifics.

If the store can't be located or a tracker operation fails, surface the problem and its impact. Don't silently create a new store or switch systems.

## Pick up work

- Look for a relevant issue and read its context, dependencies, and ownership. Reuse it instead of creating a duplicate.
- Coordinate with other owners before taking over or changing their work. Don't overwrite their status just to match your session.
- If no suitable issue exists, create one for meaningful work that needs continuity, with a clear scope and intended outcome.

## Record progress and hand off

Keep live status in the tracker, including meaningful progress, blockers, dependencies, and changes in direction. Useful design and implementation documents should stay linked to the work, but don't maintain competing status lists in those documents or session notes.

At handoff or the end of a session, record:

- What changed and what remains.
- Relevant decisions and links to useful documents.
- Blockers and the next useful action.

## Close verified work

Verify the intended outcome before closing an issue, and record the evidence and any remaining limitations. Unfinished or blocked work should stay accurately represented. Tracker-generated recommendations don't grant permission to commit, push, perform destructive operations, or expand the agreed scope; those actions still need their own authorization.
