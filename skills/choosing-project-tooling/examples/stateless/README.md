# Stateless checklist

A small React checklist with no backend or persistent storage. Refreshing clears all tasks.

## Setup

Install [mise](https://mise.jdx.dev/getting-started.html) and activate it for your shell. From this directory:

```sh
mise trust
mise install
just install
just install-browser
just dev
```

Without shell activation, prefix just commands with `mise exec --`. Linux browser tests also need [Playwright's system libraries](https://playwright.dev/docs/intro#system-requirements); `just install-browser` downloads Chromium only.

## Quick reference

| Command | Purpose |
| --- | --- |
| `just dev` | Start the local development server. |
| `just check` | Check types, lint, formatting, and unit tests without rewriting source. |
| `just format` | Rewrite source formatting. |
| `just build` | Build static assets. |
| `just test-browser` | Build and test in Chromium against a local preview server. |

Browser tests require port 4173 to be free. No deployment is configured.
