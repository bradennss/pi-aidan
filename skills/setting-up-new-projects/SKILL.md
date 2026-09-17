---
name: setting-up-new-projects
description: Set up new software projects with current package and runtime tooling, strict linting, formatting, type checking, tests, an AGENTS.md guide, and a CLAUDE.md symlink. Use when creating, bootstrapping, scaffolding, or standardizing a new repository or service.
---

# Setting up new projects

Build the smallest working project that meets the request. Leave it with one command that runs every required check. Use this skill directly for a new project outside an existing repository and skip environment setup.

## Workflow

1. Confirm only decisions that change the scaffold: language, framework, package or module name, public interface or one-sentence behavior, package manager, deploy target, CI provider when requested, initial Git branch when creating a repository, and whether the destination may be overwritten. Infer the rest from the request and nearby repositories. When CI is requested, use the provider that hosts the repository; ask if there is no remote or convention to identify it.
2. Inspect the destination before writing. Preserve existing files and stop on conflicts instead of deleting or replacing them silently.
3. Before creating project files, determine whether the canonical destination is already a Git repository. For a brand-new destination outside Git, create the destination directory, initialize Git there with the requested or stated conventional initial branch, and verify `git rev-parse --show-toplevel` equals the destination. For an existing repository being standardized, preserve its current Git topology and branch.
4. Check official documentation when an initializer, config format, or tool option may have changed. Use the stable release available through the selected package or toolchain manager, and keep its lockfile.
5. Run the ecosystem's official initializer when it produces the requested shape. Keep its useful defaults, remove demo code, and avoid optional dependencies without an immediate use.
6. Add strict static checks, deterministic formatting, a small test, and scripts or task-runner targets for each check. Configure warnings to fail CI.
7. Write `AGENTS.md` from the files and commands in this repository. Then create `CLAUDE.md` as a relative symlink to it.
8. Run formatting, linting, type checking, tests, and a build when the project builds an artifact. Fix every failure, then rerun the full check command.
9. Load `finishing-up-work` before reporting the new project complete.

## Tooling baseline

Use the repository's chosen ecosystem. For JavaScript or TypeScript, prefer TypeScript, pnpm, ESLint flat config with type-aware strict rules, Prettier, and the framework's established test runner. Enable `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, and `noImplicitOverride` in `tsconfig.json`.

For Python, prefer uv for environments and dependencies, Ruff for linting and formatting, Pyright in strict mode, and pytest. For Rust, use Cargo, rustfmt, Clippy with warnings denied, and built-in tests. For Go, use modules, gofmt, go vet, Staticcheck, and built-in tests. For another ecosystem, choose maintained tools recommended by its official documentation and apply the same checks.

Do not install two tools for the same job unless the framework requires both. Keep generated configuration explicit enough that a future dependency update does not silently weaken checks. Pin the runtime or toolchain with the ecosystem's standard version file when one exists.

Expose predictable commands for:

- development
- formatting and format checking
- linting
- type checking when the language supports it
- tests
- building when applicable
- a single `check` command that runs all CI checks without modifying files

Keep write-mode formatting out of `check`. Add CI only when the user asks for it or the repository already has a CI convention.

## `AGENTS.md`

Write repository-specific instructions, not a generic template. Include:

- a one-paragraph purpose and the main stack
- a short layout of important directories
- exact setup, development, check, test, and build commands
- code and test conventions that the configuration does not make obvious
- generated files or directories agents must not edit
- any environment variables, external services, or setup steps needed to validate changes

Only claim commands that exist and that you ran. Keep the file short enough to scan before making a change.

## `CLAUDE.md` symlink

Create the link from the repository root with:

```sh
ln -s AGENTS.md CLAUDE.md
```

If `CLAUDE.md` already exists or is a symlink, inspect it first. Keep it when `readlink CLAUDE.md` returns `AGENTS.md`. Otherwise stop and report the conflict; do not overwrite it without approval. Offer to merge its unique instructions into `AGENTS.md`, then replace it with the symlink after approval. Never discard unique instructions. Use a relative target so the repository remains portable, and do not duplicate the `AGENTS.md` content in a second file.

Verify the result with:

```sh
test -f AGENTS.md
test -L CLAUDE.md
test "$(readlink CLAUDE.md)" = "AGENTS.md"
```

If the filesystem cannot create symlinks, report that limitation instead of copying the file.
