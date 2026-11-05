# Beads project workflow

## Intent and scope

Make Beads the default task tracker for new projects that Aidan creates. In existing repositories, use Beads only when it is already configured. Preserve established trackers and repository conventions. The user approved this scope and the guidance-based approach.

## Approaches

- **Prompt and skill guidance (selected):** Put everyday task tracking in `prompts/system.md` and initialization in `skills/setting-up-new-projects/SKILL.md`. This fits the existing prompt-loading architecture and lets Aidan account for repository conventions.
- **Automatic extension hooks (rejected):** Run Beads commands from extension handlers. This would introduce runtime dependencies and side effects during unrelated conversations.

## Behavior

For new projects, inspect the destination and available `bd` version, install the CLI using a current supported platform method if missing, and initialize Beads non-interactively. Preserve instructions and hooks and avoid generating integrations for unrelated agents. Add concise Beads guidance to the project's `AGENTS.md` as part of the existing documentation step.

For existing repositories, inspect instructions and Beads workspace configuration, including redirected or worktree-backed configurations. Do not infer configuration merely from an installed CLI. Do not initialize, migrate, or replace a tracker automatically.

For actionable work in Beads-enabled projects, run `bd prime` when beginning or recovering context. Inspect existing issues, reuse relevant tasks, claim work, record dependencies and blockers, and close tasks only after verification. Use Beads as the task-status source of truth; retain design documents and implementation instructions without maintaining competing status lists. Questions and trivial interactions do not need issues.

Report installation and database failures with their impact. Do not silently fall back to another task tracker. Workflow output does not authorize Git commits, pushes, destructive operations, or unrelated work.

## Implementation boundaries

Change guidance only. Keep the TypeScript extension, runtime dependencies, and prompt wrappers unchanged. Do not initialize Beads in this existing repository. Do not create Git commits without a user request.

Use installed CLI help and current upstream documentation to select supported commands. The installed `bd` 1.3.2 supports `bd init --non-interactive --skip-agents --skip-hooks`; these flags avoid automatic instruction, integration, and hook generation but do not suppress its Git initialization commit. For new standalone destinations outside any Git repository, run `BEADS_DIR="$PWD/.beads" bd init --non-interactive --skip-agents --skip-hooks` before `git init`. If the scaffold already initialized Git, use a documented commit-free option or ask before allowing an initialization commit. Recheck compatibility and side effects when executing setup instructions.

## Verification

Run all repository checks and inspect the complete diff. Exercise setup and the issue lifecycle in a disposable repository, including preservation of existing instructions and hooks. Evaluate guidance against new-project, existing-enabled, existing-unconfigured, unavailable-CLI, and failed-verification scenarios. Keep CLI behavior, prompt assembly tests, and model-compliance evidence distinct. Do not add tests that assert policy wording alone or claim live-model behavior was tested when it was not.
