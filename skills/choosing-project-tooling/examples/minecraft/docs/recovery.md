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

## Recover a failed production upgrade

Actual upgrade/start/readiness/save consistency and recognizable-world recovery remain **BLOCKED/UNVERIFIED** until explicitly authorized EULA/server operation and licensed-client access exist. The following is a future operator procedure, not a claim of rehearsal. Use [operations](operations.md#install-or-deliberately-upgrade) for the native accessory sequence and [production secrets](secrets.md#production-sops-and-age-schema) for independent keys.

1. Suspend deployment/host dispatches and establish the runner has terminated or the active operation has completed. Do not release its Kamal lock or unmask backup units yet. Inspect `kamal lock status --hosts "$DEPLOY_HOST"`, `systemctl show` for both backup units, and only nonsecret container state/image/mount fields. A failed SSH call does not establish whether the remote command executed. The backup timer can be masked while an earlier backup is still completing; never kill it to obtain the world.
2. Confirm the old pre-upgrade capture succeeded, saving was reenabled, the matching snapshot exists, and repository integrity is valid. The upgrade recipe adds `keep` to the verified pre-upgrade snapshot after masking backup starts; record the resulting snapshot ID because native restic tagging changes it. Retain old exact image/game and source/config revision from the nonsecret deployment output, not a full inspect dump containing credentials. Native `restic snapshots` and `check --read-data`, supplied via protected `systemd-run ... -p EnvironmentFile=/etc/minecraft/backup.env`, inspect encrypted off-host storage. Do not prune or reinitialize after a failed capture.
3. Stop any failed/new game writer gracefully, inspect exit/OOM state, and verify no running container mounts the primary world (including parent/child mounts). If shutdown was forced/OOM or save-on cannot be confirmed, treat the active world as suspect and preserve it for diagnosis. Never start an older binary against it. No automated rollback does this for you.
4. Reserve a **fresh** child directory under `/srv/minecraft/restores`, validating a 1–64 character alphanumeric/underscore/hyphen name with first character alphanumeric, checking all roots are real directories (no symlinks/aliases), and using atomic `mkdir` to refuse an existing target. Run native `restic restore MATCHING_SNAPSHOT_ID --host minecraft-production --tag minecraft-data,minecraft --path /data --target FRESH_TARGET --verify` through the protected backup environment. It creates `FRESH_TARGET/data/`. Never use active `/srv/minecraft/worlds/primary` as target or use an overwrite option. A failed restore reserves a partial target; retry with a new name rather than overwriting it.
5. In a separate protected recovery checkout/configuration, bind only that restored `data/` to `/data`, use the matching **old exact image and vanilla game version**, a distinct accessory service/name/lock and loopback-only alternate game port. Keep RCON private and preserve the operator's existing acceptance/allowlist; do not manufacture acceptance. Keep the original stopped while verifying. Do not call the standard `just deploy install`: it intentionally refuses nonempty primary data, and is not a restore command. Adapt the native Kamal accessory configuration explicitly and validate through the native configuration initializer described in operations before booting the isolated target; select its single trusted host explicitly on every lock/lifecycle command. No permanent staging service or custom simulator is provided.
6. Use the image's bounded native protocol query and the matching real licensed client, through a source-restricted SSH tunnel if necessary, to verify the recorded dimension/coordinates/block pattern. Check that the original primary tree is unchanged using protected before/after file hashes and added/removed-file inventory. A healthy process or a byte-identical fixture is not proof of a readable Minecraft world. Stop the isolated instance before any promotion.
7. Choose an explicit cutover only after this verification and separate authorization. Preserve the failed primary tree and snapshot; change the reviewed mount to the recovered path rather than deleting/overwriting active data. Ensure exactly one writer, the matching image/version, correct backup source, and the same private password-file interfaces. If changing the primary path, update and review **all** fixed-path guards, Ansible storage, and backup mounts together before future automation. This reference intentionally does not automate that migration or point the old binary at an upgraded world.
8. After successful recovery, verify a new coordinated capture and client readback. Unmask `minecraft-backup.service` and `minecraft-backup.timer`, restore the previously intended timer state, then run `kamal lock release --hosts "$DEPLOY_HOST"` with `KAMAL_LOCK` unset. Keep `keep`-tagged rollback snapshots until their recovery window ends, then explicitly remove only that tag using native restic. Do not clear lock/masks merely to make a retry green.

For interrupted backups, confirm native save-on with authorized `kamal accessory exec game --hosts "$DEPLOY_HOST" --reuse rcon-cli save-on`; never put passwords on the command line. Hard kill/host loss/RCON failure cannot guarantee saving was reenabled. Inspect logs privately, repair repository/disk/permissions/network, safely stop/restart if needed, and capture again. The native post-hook propagates capture failure only after upstream save-on; its filesystem branch does not prove the real server path.

## Recover after an infrastructure failure

Git and cloud operations are not atomic. Runner loss after resource mutation but before state persistence/upload can leave no recovery artifact. The exact-workflow prior-success gate is a stop signal, not a transaction or independently durable cloud inventory. Administrators can defeat it by deleting/changing workflows/history; loss, unknown history, or run-number gaps require reconciliation. Do not delete failed runs or rerun them to hide their conclusions.

1. Suspend new infrastructure dispatches, cancel only pending requests, and wait for the active writer to finish or prove its runner has terminated. Suspend game/host workflows when recovering the VPS. Record the failed run and exact current `main` SHA.
2. Obtain the latest state commit or `encrypted-state-RUN_ID` recovery artifact before its **three-day expiry**. Verify provenance and keep a protected independent copy. Artifacts are available to trusted private-repository readers, regardless of environments; no key/plaintext belongs there. Compare current Git state, lineage/serial privately, and actual authorized read-only OVH/Cloudflare inventory. A failed apply can have created/changed resources. Do not order again to discover what happened.
3. If state is missing or the runner vanished, reconcile every mutation since last persistence using supported OpenTofu import/refresh under break-glass authorization with CI suspended. This cannot be automatically reconstructed from Git history alone. Never replay an apply merely to recover its state.
4. In fresh trusted current `main`, supply the independent state identity, carry the reconciled ciphertext to `infra/production.tfstate`, and run `sops exec-env secrets/state.enc.yaml 'tofu -chdir=infra init -input=false -lockfile=readonly && just verify-state'`. It discards decrypted native `state pull` output. Do not print full state, upload plaintext, or commit plans/backups. For a rejected push with no competing state writer, commit the verified ciphertext onto fresh main through the authorized state-only path, handling source conflicts separately. Never merge ciphertext or automatically rebase/reapply. If both states changed, reconcile inventory/lineage first.
5. If the very first bootstrap failed and no resources/state genuinely exist, create actual empty native-encrypted state under break-glass authorization using the same encryption configuration and a built-in local-only resource, remove that local-only resource with a local apply, and carry only the empty encrypted state into production. This is real OpenTofu output, not invented JSON. Import actual resources instead if any exist.
6. Compute `sha256sum infra/production.tfstate` (`shasum -a 256` on macOS), then dispatch **recover**, never apply, with exact current `revision`, `state_sha256`, and attestation `I reconciled cloud resources and encrypted state`. Recover has state identity access only, validates the encrypted file/hash and current revision, and performs no cloud plan/apply. Missing/unreadable/plaintext state cannot be checkpointed.
7. Resume normal dispatch only after the recovery checkpoint succeeds and inventory/state are reconciled. Retain failed evidence and independent keys. A subsequent apply computes a fresh plan.

## Recover the production host

For SSH/firewall lockout, use independently tested OVH console/rescue access. Repair `/etc/nftables.conf` and SSH configuration with native `nft -c -f`/`sshd -t`, and restore source-restricted administrator access before rerunning Ansible. Never broaden SSH ingress as an automated fallback. Inspect disk/journal/container use and remove only known task-owned unused material, not world data, required images, or global volumes. Health/webhook jobs cannot report total host loss; independent monitoring and recovery access are required.

For host loss, reconcile infrastructure state, obtain replacement authorization, reprovision Debian 13, verify new console fingerprints, and configure the host with independent SOPS/age and R2 credentials. Restore into fresh isolated storage with the matching exact image/version, test using the real client, and authorize cutover separately. Preserve the old world/repository/keys. Local filesystem restoration and native state checks do not prove R2 transport, production hardening, systemd masking/activation, notifications, backup freshness, or a production recovery-time objective.
