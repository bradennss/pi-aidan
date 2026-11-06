# Stateless checklist

A [React](https://react.dev) checklist. Tasks live in memory and disappear on refresh.

## Setup

Install [mise](https://mise.jdx.dev/getting-started.html) and activate it for your shell. From the project directory:

```sh
mise trust
mise install
just install
just install-browser
```

`just install` uses the frozen lockfile. Browser tests need Chromium; on Linux, also install [Playwright's system libraries](https://playwright.dev/docs/intro#system-requirements). Without shell activation, prefix just commands with `mise exec --`.

## Working on the checklist

Use mise for pinned tooling, pnpm for dependencies, and the recipes in `justfile` for tasks. Preserve the small, accessible UI; adding persistence, a backend, authentication, or deployment needs approval.

Keep secrets and generated output out of Git. Do not bypass dependency-install policies or perform provisioning, deployment, publishing, or external-account changes without authorization.

## Layout

- `src/App.tsx` owns task state and validation; `src/App.test.tsx` tests interactions.
- `src/main.tsx` mounts the app; `src/styles.css` defines page layout.
- `src/components/arc/` holds committed UI components and shared tokens.
- `test/browser.spec.ts` verifies the built app through Playwright.
- `justfile` exposes setup, development, formatting, and verification tasks.

## Verifying changes

Run `just check` for every change. Use `just format` to fix formatting. For executable or rendered changes, also run the build and browser tests:

```sh
just check
just build
just test-browser
```
