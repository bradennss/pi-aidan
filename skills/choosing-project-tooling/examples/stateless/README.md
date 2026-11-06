# Stateless checklist

A small web app for keeping a temporary task list. Add tasks, mark them complete, and use the controls with a mouse or keyboard.

## Run locally

Install [mise](https://mise.jdx.dev/getting-started.html) and activate it in your shell, then run:

```sh
mise trust
mise install
just install
just dev
```

## Development

Run the checks before submitting changes:

```sh
just check
```

This checks types, lint, formatting, and component tests. Apply formatting with `just format`.

For changes to the application, also run the browser tests:

```sh
just install-browser
just test-browser
```

The tests build the app and exercise it in desktop and mobile-sized Chromium.

On Linux, install [Playwright's system libraries](https://playwright.dev/docs/intro#system-requirements) separately.
