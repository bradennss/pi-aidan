# Verify backups and recover into isolation

Run commands from the example directory unless stated otherwise. A successful restore needs an independently recoverable repository password, an intact repository, the matching image/game configuration, and a licensed real client. See [secret bootstrap](secrets.md). Local restic encryption protects stored backup contents, not the live server, Docker administrators, or host loss.

## Verify world persistence and backup

This is a manual game-client procedure, not a retained container test suite. If the operator has not explicitly accepted the EULA or a licensed authenticated client is unavailable, stop at that boundary and record **BLOCKED/UNVERIFIED**. Do not accept on anyone's behalf, authenticate an account, enable offline mode, or manufacture a world. No initial failing Minecraft smoke or successful lifecycle can be claimed from configuration checks or a filesystem fixture.

1. Complete bootstrap and personally accept the EULA. Set the licensed client's Java profile name in `.env` `WHITELIST`. Keep online authentication enabled. Close other servers using loopback port 25565. Record the configured image/game version and the intended world directory `.local/data/`.
2. Run `mise exec -- just start`. The native protocol health check has a 180-second wait limit. For a direct bounded status query, run:

   ```sh
   docker compose --env-file /dev/null --file compose.yml exec -T server \
     mc-monitor status --host 127.0.0.1 --port 25565 --timeout 5s --retry-limit 5 --retry-interval 2s
   ```

   Require the expected version and an actual successful response, then connect the matching real Java client to `127.0.0.1:25565`. A log line or open TCP port is insufficient. If readiness times out, collect relevant non-secret errors, run `just stop`, fix the cause, and retry deliberately. Do not leave an unknown partial start running.
3. In the client, place a distinctive block pattern at recorded coordinates and dimension, away from spawn protection. Record a screenshot and the coordinates outside secrets. Disconnect cleanly, run `just stop`, and confirm the server exits gracefully within two minutes. Run `just start`, reconnect, and verify the same blocks remain. An exit timeout or missing blocks is failure, not a pass based on startup logs.
4. Leave the server ready, disconnect the client, and run `just backup` without simultaneous stop/restart, other backups, or file edits. Record its exit status and new snapshot ID. Inspect snapshots and verify repository integrity:

   ```sh
   mise exec -- restic --repo .local/restic --password-file .secrets/restic-password \
     snapshots --host minecraft-local --tag minecraft-data,minecraft --path /data
   mise exec -- restic --repo .local/restic --password-file .secrets/restic-password check --read-data
   ```

   Require a new snapshot from this capture with the expected `/data` path and tags. A pre-existing snapshot or exit zero alone is not proof. A repository check verifies stored bytes, not in-game consistency. Do not prune until independent recovery succeeds.
5. Stop the original server gracefully. Restore and verify in isolation using the next section. Record protocol/client results and the recognizable blocks after restore, plus the unchanged-original-data check. Retain a failed outcome and its diagnosis if any stage fails.

## Restore to fresh storage

`just restore TARGET` accepts only a 1–64 character child name (letters, digits, underscores, hyphens; first character alphanumeric). It rejects paths, traversal, shell metacharacters, symlinked storage roots, active-world aliases, and existing targets. It atomically reserves `restores/TARGET/`, then uses native restic restore with content verification. Never run restores concurrently with directory changes by another process.

```sh
mise exec -- just restore rehearsal-1
```

Expected result: `restores/rehearsal-1/data/` contains the captured server data. No write to `.local/data/` occurs. A failed restore can leave a partial reserved target: keep it for diagnosis and retry with a new name. Never use an overwrite/delete option or point a native restore command at active data. For an older snapshot, inspect `restic snapshots` and use native `restic restore SNAPSHOT_ID` with a separately reserved fresh directory and `--verify`, matching the snapshot's game/image version.

### Run a separate recovery instance

The following commands are for an authorized operator after a real backup. Stop the original first; recovery reuses the loopback game port but never its data. Do not run these instructions as an assistant without EULA/server/client authorization.

```sh
mise exec -- just stop
recovery=$(mktemp -d "${TMPDIR:-/tmp}/minecraft-recovery.XXXXXX")
# Baseline the stopped original. Keep this manifest private with the recovery copy.
find .local/data -type f -exec shasum -a 256 {} \; > "$recovery/original.sha256"
cp compose.yml justfile mise.toml .env.example "$recovery/"
# Transfer only YOUR existing operator acceptance and allowlist, never someone else's.
cp .env "$recovery/.env"
cp -R .secrets "$recovery/.secrets"
mkdir -m 700 "$recovery/.local"
cp -R restores/rehearsal-1/data "$recovery/.local/data"
mkdir -m 700 "$recovery/.local/restic"
(cd "$recovery" && mise trust && mise exec -- env COMPOSE_PROJECT_NAME=minecraft-recovery just start)
```

The new empty repository directory is reserved for recovery-instance use; it is not the original repository. Do not run backups in this instance until you deliberately initialize that repository. Do not share the original world mount or switch the original mount to the recovered data.

Connect the real client to `127.0.0.1:25565`, verify the recorded dimension/coordinates/block pattern, then stop only the recovery project:

```sh
(cd "$recovery" && mise exec -- env COMPOSE_PROJECT_NAME=minecraft-recovery just stop)
# Run from the original example directory.
shasum -a 256 --check "$recovery/original.sha256"
```

All original file hashes must match. Also inspect that no files were added/removed in the original world and that Compose used the recovery copy's bind mount. The original server must have remained stopped throughout. Start the original again only after stopping recovery. Remove only the task-owned recovery project/temporary directory when finished; do not delete shared volumes or run global Docker prune. Do not promote the recovery world or deploy anything as part of this rehearsal.

## Handle backup failures

`mc-backup now` natively checks/initializes the repository, uses bounded RCON retries, disables saving, flushes, captures with restic, and reenables saving. Its exit trap attempts save-on if capture coordination is interrupted. At the pinned version it catches a failed restic capture and otherwise exits zero. The supported `POST_BACKUP_SCRIPT` setting contains only `exit "$1"` (Compose spells `$` as `$$`) to propagate the native capture status **after** native save-on; it implements no save/flush/capture/secret logic. Recheck upstream ordering/status behavior on every upgrade. Any later scheduled unit must preserve this failure propagation.

If `just backup` fails, do not call the backup complete or immediately prune. Record the exit status and non-secret diagnostic. Confirm the server is alive and saving is enabled with the native administrative command if the game server is authorized:

```sh
docker compose --env-file /dev/null --file compose.yml exec -T server rcon-cli save-on
```

The private password file supplies authentication; never pass the password on the command line. A hard kill, host loss, or failed RCON reconnection cannot guarantee save-on. Stop/restart safely if necessary, verify the client world, resolve disk/permission/repository/credential problems, then take a fresh coordinated backup and verify its new snapshot. Partial snapshots from a failed restic capture are not successful captures.

For an authorized live failure rehearsal, use a disposable copy of this configuration/world and a separate repository. After a successful backup and recorded snapshot, override only the backup invocation with `-e INCLUDES=/data/definitely-missing` using native `docker compose run --rm --no-deps -T`, service `backup`. Require nonzero exit, saving reenabled, and no new complete snapshot; then retry with normal `just backup` and verify a new snapshot and client restoration. Never corrupt/delete the only repository, rotate production credentials, or force a backup failure on a shared world.

Without a running authorized server, disposable restic file fixtures can check encryption, restore isolation, and the upstream `.paused` filesystem-only branch's success/failure status. Do not place `.paused` in an actual world: it bypasses RCON coordination, and `just backup` deliberately refuses it. Such fixtures prove neither save coordination nor game consistency, protocol readiness, licensed client access, or world persistence.

## Recover without the original host

Obtain the independent password/key and repository copy from their separate recovery locations. On a clean authorized machine, install the pinned tools, copy this configuration, and supply the password through a protected local password file. Run native `restic snapshots` and `restic check --read-data` against the recovered repository before restoring to a fresh target. Use the matching historical configuration for the chosen snapshot; a prior image alone cannot roll back an upgraded world. Follow the same isolated real-client procedure before any promotion.

A repository plus no usable key is unrecoverable. A key plus lost repository is also insufficient. Local-only rehearsal does not verify off-host R2 transport, SOPS/age identity recovery, Debian 13 hardening, deployment, monitoring, or a production recovery time objective.
