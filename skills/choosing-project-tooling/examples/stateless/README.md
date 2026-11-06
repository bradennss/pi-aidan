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

## Operations

Run local-safe workflow checks with `just ci-test` (Docker required). See [operations](docs/operations.md) for production prerequisites, deployment, and recovery.

The reference uses [OpenTofu](https://opentofu.org/docs/language/state/encryption/), [OVHcloud US](https://us.ovhcloud.com/vps/), [Cloudflare DNS](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/dns_record), [Ansible](https://docs.ansible.com/), [SOPS](https://getsops.io/docs/), and [Kamal](https://kamal-deploy.org/docs/). [just](https://just.systems/man/en/) exposes commands; [act](https://nektosact.com/usage/runners.html) runs the safe CI job locally.
