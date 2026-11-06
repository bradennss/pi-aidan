# Persistent Minecraft server

A self-contained vanilla Java Edition server with persistent storage and Minecraft-aware encrypted backups. Use this directory independently: it has no application package, custom image, or sibling runtime dependency. Local game/image pins live in `compose.yml`; production deployment deliberately selects an exact vanilla version and upstream image digest. [Production operations](docs/operations.md) covers one Debian 13 OVHcloud US host, DNS-only Cloudflare, SOPS/age, R2, scheduled backups, protected administration, and stop-before-start Kamal accessory deployment.

## Prerequisites

Install mise (2026.11.0 or newer), Docker with Compose 2.30.0 or newer, and Bash. Allocate at least 8 GiB to Docker: the server has a 6 GiB container limit and a 1–4 GiB Java heap; the one-shot backup has a 1 GiB limit. Leave additional memory for the host. Allow outbound downloads and authenticated identity lookup. Reserve disk for the world, repository, and a full restore.

**Only you can accept the [Minecraft EULA](https://www.minecraft.net/eula).** Running checks does not accept it. Starting the server requires your explicit acceptance in the local `.env` file, a licensed Java Edition account/client matching the configured game version, and an allowlist of Java profile names. Do not use offline mode, bots, or logs as substitutes for real-client verification.

## Set up

Run from this directory, or copy this entire directory to a separate project first:

```sh
mise trust
mise install
mise exec -- just check
cp .env.example .env
```

Follow [secret and storage bootstrap](docs/secrets.md) to create local password files and initialize the repository. Do not put passwords in `.env`. After personally accepting the EULA, edit `.env` so its single `EULA` entry is `TRUE`; set `WHITELIST` to comma-separated licensed Java profile names with no quotes or spaces. Leave it `FALSE` until then. An inherited shell `EULA` value cannot grant acceptance. Do not copy someone else's acceptance file.

## Use

```sh
mise exec -- just start
mise exec -- just status
mise exec -- just backup
mise exec -- just stop
mise exec -- just restore rehearsal-1
```

`start` fails closed without the local acceptance, allowlist, password files, and initialized storage directories. It waits at most 180 seconds for the image's native protocol health check. A timeout can leave the server running: inspect `just status`, then `just stop` before troubleshooting. Health checks cannot prove a player can authenticate, join, or observe durable blocks.

Connect the real client to `127.0.0.1:25565`. Only that TCP game port is published, on loopback. RCON stays on the project-scoped Docker network at `server:25575`; it is unencrypted administration traffic, not a public service. Network membership and Docker access are privileged. Online authentication and the allowlist remain enabled. `stop` grants up to two minutes for the image's graceful shutdown and keeps all data.

`backup` runs upstream `mc-backup now`, which coordinates save-off, save-all flush, native restic capture, and save-on. It requires a running, ready server and refuses the upstream `.paused` bypass marker. Do not overlap backups, stop/restart, or edit data during capture. There is no automatic schedule or pruning here. A nonzero exit means failure; exit zero still requires snapshot and client verification. See [recovery](docs/recovery.md) for failure handling, independent key recovery, and the isolated restore procedure. `restore TARGET` accepts a fresh child name under `restores/`, never a filesystem path; it restores the matching latest snapshot to `restores/TARGET/data/` and never replaces active data.

## Verify and contribute

Run `mise exec -- just check` for non-mutating just/TOML formatting, workflow syntax, and local Compose schema validation. It needs no `.env`, credentials, game server, or Docker daemon. Also run `just infra-validate`, `just install-host && just host-check`, and local-safe `just ci-test` through mise for deployment configuration changes. `just format` formats just/TOML. Review YAML/Markdown directly; no application package is needed for tooling. [AGENTS.md](AGENTS.md) lists immediate contributor commands and safety constraints.

Use the [manual game-client procedure](docs/recovery.md#verify-world-persistence-and-backup) before claiming persistence or successful recovery. Without explicit EULA acceptance and licensed client access, record the entire game lifecycle as **blocked/unverified**, including the initial failing smoke. A schema check, no-EULA rejection, filesystem fixture, or log message is not Minecraft RED/GREEN evidence. No maintained container test suite is needed.

For upgrades, take and verify a coordinated backup while the old server is ready, then stop gracefully and deliberately update the game version and upstream image digest together. Keep the old image/config and matching snapshot for rollback: older servers may not read upgraded worlds. Recheck upstream save coordination and one-shot failure semantics. The tiny native post-backup status hook is explained in the recovery guide.

Local commands above create no cloud resources. Production files are conditional operator configuration, not a deployed or runtime-verified installation. Follow [operations](docs/operations.md) for account/runner/bootstrap/deployment prerequisites, [secrets](docs/secrets.md#production-sops-and-age-schema) for separate identities, and [recovery](docs/recovery.md#recover-a-failed-production-upgrade) for matching-image isolated recovery and infrastructure reconciliation. Actual game/client/upgrade/save-consistency checks remain blocked without explicit authorization. The same independent-key, persistent-volume, workload-aware capture, and isolated-restore practices apply to an AI assistant installation, with consistency matched to its own storage engine.

## Upstream references

- [itzg image versions and Java compatibility](https://docker-minecraft-server.readthedocs.io/en/latest/versions/java/)
- [Server properties, allowlist, and private RCON](https://docker-minecraft-server.readthedocs.io/en/latest/configuration/server-properties/)
- [mc-backup restic and save coordination](https://github.com/itzg/docker-mc-backup/tree/2026.11.0)
- [Restic repository preparation and recovery](https://restic.readthedocs.io/en/stable/)
