---
name: setting-up-new-projects
description: Use when creating a repository, scaffolding an application or service, or standardizing an existing project's development setup.
---

# Setting up new projects

## Overview

Deliver the smallest working project with reproducible setup and one non-mutating `check` command covering every required check. Generated files are a starting point; successful verification establishes readiness.

## Establish the boundaries

1. Inspect the destination, applicable instructions, Git status, workspace configuration, and existing tooling. Preserve unrelated changes. Ask only about unresolved choices that affect the result or risk.
2. Establish the repository boundary before scaffolding. For a new standalone destination outside an existing repository, defer `git init` until scaffolding and the Beads initialization below are complete. Some Beads versions automatically commit during initialization when Git already exists. Keep services inside the existing repository's topology and use that repository's tracker.
3. Follow established project conventions. For a new stack, check current official documentation for maintained initializers, configuration, and supported options. If network access is unavailable, inspect installed versions and local help; report what you could not confirm.
4. Run the official initializer when it fits, before populating the destination with Beads files. Use a supported option to skip automatic Git initialization when available; otherwise follow the already-initialized Git safeguard below. Keep the lockfile, remove unused demo code and dependencies, and add only the requested functionality. Add CI when requested or already conventional.

## Set up Beads for new projects

Use Beads (`bd`) as the task tracker for new projects. When standardizing an existing repository, use its configured tracker; do not initialize Beads or replace another tracker without authorization. Inspect project instructions and configuration, and use `bd where` to resolve existing Beads workspaces, including redirects and Git worktrees. A missing or inaccessible database is a setup problem, not permission to reinitialize it.

1. Check `command -v bd` and `bd version`. If the CLI is missing for a new project, use the current [official installation instructions](https://github.com/steveyegge/beads#installation) and the supported platform package manager. For example, use `brew install beads` where Homebrew is the established package manager, or `npm install -g @beads/bd` where global npm installs are supported. Check local help and requirements rather than assuming a particular storage backend or external service is needed. Report unavailable installation access, network access, or permissions explicitly.
2. Inspect `bd init --help` and the installed version's initialization side effects. For a new standalone project outside any Git repository, initialize before `git init`: run `BEADS_DIR="$PWD/.beads" bd init --non-interactive --skip-agents --skip-hooks` at the project root when these flags are supported, then initialize Git. The explicit directory supports Git-free initialization. The skip flags avoid generated agent integrations, instruction changes, and Git hooks, but do not prevent automatic Git commits. If a scaffold already initialized Git, use a documented commit-free option supported by that version or report the blocker and ask before allowing the initialization commit. Preserve existing hooks and instructions; do not force reinitialization, change global Git settings, configure remotes, or install integrations for unrelated agents. Do not silently select stealth mode or bypass Git to evade these safeguards.
3. Run `bd where` and `bd prime` to confirm the selected workspace is usable. Inspect existing issues before creating or claiming the setup work. Keep actionable task status, dependencies, blockers, and progress in Beads. Close the setup issue only after the required project checks and applicable end-to-end verification succeed. Keep useful plans and design documents without maintaining competing status checklists.

Treat CLI and database failures as explicit blockers to tracker setup or use. Do not silently substitute Markdown TODO lists. Beads workflow output does not authorize Git commits, pushes, destructive operations, or unrelated work. Follow the user's scope and existing project instructions.

## Choose a coherent toolchain

Use these defaults when the project has no established choices. Confirm current configuration before installing tools; avoid overlapping tools without a framework requirement.

| Ecosystem | Defaults |
| --- | --- |
| TypeScript | pnpm, strict TypeScript, ESLint, Prettier, framework-compatible test runner |
| Python | uv, Ruff, strict Pyright, pytest |
| Rust | Cargo, rustfmt, Clippy with warnings denied, built-in tests |
| Go | Modules, gofmt, go vet, Staticcheck, built-in tests |
| Other | Maintained official recommendations |

## Define the verification contract

Expose focused commands for formatting validation, linting, type checking, tests, and build wherever applicable. The aggregate `check` command runs **all** applicable checks, stops on failure, and leaves source files unchanged. Keep formatting fixes in a separate command. Configure Markdown formatting to disable automatic prose wrapping: set Prettier's `proseWrap` to `"never"`, or use the equivalent setting in the chosen formatter. Configure checks to fail on warnings where supported.

For a TypeScript project with configured Prettier, ESLint, TypeScript, and Vitest:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "eslint . --max-warnings 0",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "build": "tsc",
    "check": "pnpm run format:check && pnpm run lint && pnpm run typecheck && pnpm test && pnpm run build"
  }
}
```

Use the framework's build command when it provides one. Add meaningful tests for the scaffold's observable behavior; confirm tests are discovered and remove settings that pass with zero tests.

## Document and hand off

1. Write concise, repository-specific `AGENTS.md` guidance: purpose, layout, exact commands, non-obvious conventions, generated files, environment requirements, and external services. For Beads-enabled projects, document how to load context with `bd prime`, inspect and claim issues, record dependencies and blockers, and close verified work. Identify Beads as the task-status source of truth while retaining useful design documents. Preserve existing guidance and distinguish verified commands from blocked ones.
2. Create `CLAUDE.md` as a relative symlink to `AGENTS.md`. Preserve existing files and unexpected links; ask before replacing them. Verify the target with `test -L CLAUDE.md` and `test "$(readlink CLAUDE.md)" = AGENTS.md`. If symlinks are unsupported, report the limitation instead of copying the file.
3. Run every required check, fix failures, then rerun the complete `check` command. Use verifying-end-to-end for applicable public-interface and backing-service verification.
4. Report what works, the commands actually run, and remaining blockers. Missing dependencies, credentials, or services leave affected verification blocked.

## Common mistakes

A separate passing build does not make `check` complete. Include it in the aggregate command. A successful initializer or an empty test run does not establish working behavior. Preserve team guidance rather than replacing it to satisfy the symlink convention.
