---
name: setting-up-new-projects
description: Use when creating a repository, scaffolding an application or service, or standardizing an existing project's development setup.
---

# Setting up new projects

## Overview

Deliver the smallest working project with reproducible setup and one non-mutating `check` command covering every required check. Generated files are a starting point; successful verification establishes readiness.

## Establish the boundaries

1. Inspect the destination, applicable instructions, Git status, workspace configuration, and existing tooling. Preserve unrelated changes. Ask only about unresolved choices that affect the result or risk.
2. Initialize Git when the destination is new and outside an existing repository. Keep services inside the existing repository's topology.
3. Follow established project conventions. For a new stack, check current official documentation for maintained initializers, configuration, and supported options. If network access is unavailable, inspect installed versions and local help; report what you could not confirm.
4. Run the official initializer when it fits. Keep the lockfile, remove unused demo code and dependencies, and add only the requested functionality. Add CI when requested or already conventional.

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

1. Write concise, repository-specific `AGENTS.md` guidance: purpose, layout, exact commands, non-obvious conventions, generated files, environment requirements, and external services. Distinguish verified commands from blocked ones.
2. Create `CLAUDE.md` as a relative symlink to `AGENTS.md`. Preserve existing files and unexpected links; ask before replacing them. Verify the target with `test -L CLAUDE.md` and `test "$(readlink CLAUDE.md)" = AGENTS.md`. If symlinks are unsupported, report the limitation instead of copying the file.
3. Run every required check, fix failures, then rerun the complete `check` command. Use verifying-end-to-end for applicable public-interface and backing-service verification.
4. Report what works, the commands actually run, and remaining blockers. Missing dependencies, credentials, or services leave affected verification blocked.

## Common mistakes

A separate passing build does not make `check` complete. Include it in the aggregate command. A successful initializer or an empty test run does not establish working behavior. Preserve team guidance rather than replacing it to satisfy the symlink convention.
