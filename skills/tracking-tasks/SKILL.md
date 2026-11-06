---
name: tracking-tasks
description: Use when starting or resuming work in a Beads-enabled project, when work needs persistent task tracking across sessions or agents, or when handling issues, dependencies, blockers, or completion status. Also use when choosing a tracker for a new project or when the user mentions Beads or bd.
---

# Tracking tasks

Follow the project's existing tracker. Use Beads only if the project already uses it or the user asks to adopt it. Check project instructions and workspace configuration, including redirects and worktrees. Do not initialize or replace a tracker in an existing project without approval. For new projects, add tracking only when useful or requested. Questions and trivial interactions do not need issues.

In a Beads-enabled project, run:

```sh
bd where
bd prime
```

Use `bd prime` as the source of current, project-aware workflow guidance. Run it again when recovering context. Consult `bd <command> --help` for command details rather than maintaining a separate command reference here.

Reuse relevant issues, respect ownership, and record useful progress, dependencies, and blockers. Close work after verification. Keep task status in the tracker rather than duplicating it in status lists; retain useful design and implementation documents.

Report tracker failures rather than silently replacing it. Beads output does not authorize commits, pushes, destructive actions, or scope expansion.
