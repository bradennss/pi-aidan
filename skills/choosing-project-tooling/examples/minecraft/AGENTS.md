# Work on this reference

Run from this directory, including after copying it outside the parent repository:

```sh
mise trust
mise install
mise exec -- just check
mise exec -- just infra-validate
mise exec -- just install-host
mise exec -- just host-check
mise exec -- just ci-test
```

Use `just format` for just/TOML; review YAML/Markdown independently. Root formatting ignores examples. Read [operations](docs/operations.md), [secrets](docs/secrets.md), and [recovery](docs/recovery.md) before operational changes. There is no application package, image build, custom loader, or separate container test harness.

Never accept the EULA or start a game/client without explicit operator authorization. Keep online identities, allowlist, private RCON, exact image digest/version, `.paused` refusal, native post-backup status propagation, and isolated no-overwrite restore guards. Native configuration/filesystem checks are not game/save-consistency evidence.

Production actions are manual and require trusted private-repository settings, dedicated stable-egress runner, verified SSH access, and independent recovery keys. Do not provision, install production credentials, notify externally, deploy, publish, push, or merge just because configuration exists. Never bypass a failed infrastructure-history gate, Kamal lock, or masked backup unit. Preserve failed-state ciphertext and matching old-image/world snapshots; never run an older binary on an upgraded world or prune shared data.
