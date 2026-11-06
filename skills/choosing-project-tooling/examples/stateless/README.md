# Stateless checklist

A small React, Vite, and strict TypeScript app. Add a task and toggle its completion. Tasks live only in React memory: refreshing or closing the page clears them. There is no backend, authentication, storage, or deployment configuration.

This directory is a standalone project. Copy it anywhere without the parent repository, including its dotfiles and `pnpm-lock.yaml`.

## Prerequisites and setup

Install [mise](https://mise.jdx.dev/getting-started.html) and activate it for your shell. From this directory:

```sh
mise trust
mise install
just install
just install-browser
```

`mise.toml` pins Node, pnpm, and just. If mise is not activated, prefix just commands with `mise exec --`, for example `mise exec -- just check`. The first install needs network access to tool registries, npm, and Playwright's browser download service. No credentials or external accounts are needed. On Linux, consult [Playwright's system requirements](https://playwright.dev/docs/intro#system-requirements) and install the required OS libraries before running Chromium. `just install-browser` downloads Chromium without modifying system packages.

## Tasks

| Command | Purpose |
| --- | --- |
| `just dev` | Serve the app on the loopback address printed by Vite. Stop with Ctrl+C. |
| `just check` | Check types, lint, formatting, and Vitest tests without rewriting source. |
| `just format` | Rewrite formatting with Prettier. |
| `just build` | Build static assets into `dist/`. |
| `just test-browser` | Build, start a loopback-only preview server, and run Playwright against built assets. |
| `just install` | Install dependencies with the frozen lockfile. |
| `just install-browser` | Download the pinned Playwright version's Chromium build. |

Use `just check && just build && just test-browser` before sharing changes. Browser tests cover adding and completing tasks by keyboard, blank-input rejection, and reset on refresh on desktop and a 390px mobile viewport. Playwright owns and stops its server. It requires port 4173 to be free and refuses to reuse an existing server.

## Directory orientation

- `src/App.tsx` owns the in-memory checklist and input validation; `src/App.test.tsx` tests its interactions with Vitest and Testing Library.
- `src/main.tsx` loads local fonts, Arc tokens, and the app. `src/styles.css` owns page layout.
- `src/components/arc/` contains free Arc registry components and their shared foundation and motion tokens. They are checked by the same TypeScript, ESLint, and formatting commands as app source.
- `test/browser.spec.ts` exercises the real page through Playwright. `playwright.config.ts` starts the production preview server.
- `vite.config.ts`, `tsconfig.json`, and `eslint.config.js` configure native tooling. `justfile` exposes the package commands without custom runners.

The UI composes Arc's free [Button](https://uiarc.dev/components/button), [Input](https://uiarc.dev/components/input), and [Switch](https://uiarc.dev/components/switch) components. Completion takes effect immediately, so each task uses a switch with an accessible task name. The completed text is also struck through. Arc supplies keyboard focus and reduced-motion behavior. The empty state needs no extra component. Fonts are bundled locally, with no runtime font service.

Registry sources were installed with `pnpm dlx shadcn@4.23.0 add --yes https://uiarc.dev/r/arc-foundation.json https://uiarc.dev/r/button.json https://uiarc.dev/r/input.json https://uiarc.dev/r/switch.json`. `components.json` records installation aliases; it is not a runtime dependency. Registry URLs are mutable, so review upstream changes before regenerating. The committed sources and lockfile define this project's reproducible version. TypeScript 6.0.3 is pinned within typescript-eslint's supported range rather than using the newer incompatible TypeScript major. Playwright 1.64.1 and jsdom 30.1.3 are the newest stable releases that satisfied pnpm 12's default release-age policy at verification time. No release-age exceptions are configured.

## Limitations and troubleshooting

This is a local application reference, not production infrastructure. No containers, CI, hosting, domains, secrets, or external provisioning are included. Nothing persists, and tasks cannot be recovered after refresh. A second tab starts with its own empty checklist. Automated Chromium checks do not establish support for every browser or a full accessibility audit.

If dependencies are missing, run `mise install` and `just install`. Do not delete or regenerate the lockfile to bypass an installation failure. If Playwright reports a missing executable, run `just install-browser`. If port 4173 is busy, stop the process you own before retrying; do not terminate unrelated services. Failed browser runs retain local traces in ignored `test-results/`; inspect them with `pnpm exec playwright show-trace <trace.zip>`. Build output, traces, browser reports, and dependencies are ignored by Git and formatting checks.
