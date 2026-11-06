Create real `state.enc.yaml`, `infra.enc.yaml`, `host.enc.yaml`, and `deploy.enc.yaml` with SOPS after setting separate age recipients in `.sops.yaml`. No credentials or encrypted sample files are supplied.

[Bootstrap and recovery](../docs/operations.md#prepare-secrets) defines each mapping, CI identity scope, and independent key recovery. Never put private age keys, plaintext mappings, or SSH identities in this directory.
