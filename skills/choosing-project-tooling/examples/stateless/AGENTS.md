# Stateless checklist

React and Vite application with in-memory task state. There is no backend or persistent storage.

## Setup

Use [mise](https://mise.jdx.dev/getting-started.html) to install the project's tools. From the project directory:

```sh
mise trust
mise install
just install
```

If mise is not activated in the shell, prefix commands with `mise exec --`.

## Development and testing

```sh
just dev
just check
just build
```

For a focused component test run:

```sh
pnpm exec vitest run src/App.test.tsx
```

For browser tests:

```sh
just install-browser
just test-browser
```

On Linux, Playwright also needs its [system libraries](https://playwright.dev/docs/intro#system-requirements). Browser tests build production assets and start their own server on port 4173. Leave that port free; the runner does not reuse an existing server.

To run one browser scenario across the configured viewports:

```sh
pnpm exec playwright test -g refresh_starts_empty
```

## Making changes

- Reuse the Arc components and design tokens for UI changes. Preserve accessible labels and keyboard operation.
- Update behavioral tests alongside changed interactions. Component tests live beside the app; browser tests cover the built page, including reset on refresh.
- Run `just check` after changes. For application or build changes, also run `just build` and `just test-browser`.
- If a required check cannot run, report the missing prerequisite and the unverified behavior. Component tests do not replace browser verification.

Operational changes also require `just infra-validate`, `just install-host`, `just host-check`, `actionlint .github/workflows/*.yml`, and `just test-operations`. Run `just ci-test` with Docker for the local-safe CI job. Read [operations](docs/operations.md) before changing deployment or encrypted-state handling; local checks do not establish GitHub permissions or host hardening.
