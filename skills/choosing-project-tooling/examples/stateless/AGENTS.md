# Stateless checklist

Keep this independently runnable React reference small, accessible, and ephemeral. Do not add persistence, a backend, authentication, or deployment infrastructure without explicit approval.

## Editing

Keep example changes within this directory; changes to the parent repository or other examples need separate authorization. Preserve the pinned mise tooling, pnpm lockfile, and just entry points. Review upstream Arc changes before regenerating committed components.

## Verification

Use the recipes in `justfile` as the canonical entry points. Run `just check` for every change; use `just format` when formatting needs to change. Run `just build` and `just test-browser` when executable or rendered behavior changes. Parent repository checks do not verify this example.

## Safety

Keep secrets and generated output out of Git. Do not weaken dependency-install policies to bypass failures. Local validation does not authorize provisioning, deployment, publishing, or external-account changes. Do not stop unrelated processes to free a test port.
