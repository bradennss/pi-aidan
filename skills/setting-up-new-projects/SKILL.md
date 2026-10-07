---
name: setting-up-new-projects
description: Create or standardize a software project with current tooling, strict checks, tests, repository guidance, and a CLAUDE.md symlink. Use for new repositories, services, scaffolds, or project setup.
---

# Setting up new projects

Create the smallest working project that meets the request and provide one non-mutating command for every required check.

1. Confirm only scaffold decisions that affect the result. Inspect the destination and stop on conflicts.
2. Initialize Git only for a new destination outside an existing repository. Preserve existing topology and files.
3. Check current official documentation for initializers, config, and tool options. Use the ecosystem's maintained defaults and keep the lockfile.
4. Run the official initializer when it fits. Remove demo code and unused dependencies.
5. Add strict formatting, linting, type checking, tests, and build checks where applicable. Fail on warnings and expose focused commands plus one `check` command.
6. Write a short, repository-specific `AGENTS.md` with purpose, layout, exact commands, hidden conventions, generated files, environment needs, and external services. Claim only commands you ran.
7. Create `CLAUDE.md` as a relative symlink to `AGENTS.md`. Preserve an existing file or unexpected link and ask before replacing it.
8. Run every check, fix failures, and rerun the full check command. Load `finishing-up-work` before reporting completion.

Prefer TypeScript with pnpm, strict compiler options, ESLint, Prettier, and the framework's test runner; Python with uv, Ruff, strict Pyright, and pytest; Rust with Cargo, rustfmt, Clippy warnings denied, and built-in tests; Go with modules, gofmt, go vet, Staticcheck, and built-in tests. For other ecosystems, use maintained official recommendations. Don't install overlapping tools without a framework requirement.

Add CI only when requested or already conventional. Keep write-mode formatting out of `check`.

Verify the symlink with:

```sh
test -f AGENTS.md
test -L CLAUDE.md
test "$(readlink CLAUDE.md)" = "AGENTS.md"
```

If symlinks aren't supported, report that limit instead of copying the file.
