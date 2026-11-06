# Recover persistent tasks

Use this runbook after a failed release, backup, host loss, or infrastructure write. Obtain authorization before remote changes or external notifications. Suspend the relevant workflows and establish that no active writer remains before recovery. Keep independent age identities and the restic password outside the VPS and GitHub. Daily snapshots permit data loss since the last successful capture; a single host, bucket, or credential is not a zero-loss guarantee.

## Back up and verify the database

Ansible installs `database-backup.timer` for 03:00 UTC daily, with up to 15 minutes of jitter and catch-up after missed runs. It invokes the oneshot service with a one-hour deadline. `pg_dump --format=custom --no-owner --no-privileges` runs inside the private PostgreSQL accessory and obtains PostgreSQL's consistent transaction snapshot while the app can continue writing. It captures the database's data, schema, and Drizzle journal, without a filesystem copy of a running cluster. Writes after snapshot start belong to a later backup. Global roles are not included; provision the intended database owner independently on recovery.

The temporary dump lives in a 0700 runtime directory under a 0077 umask, outside persistent app storage. Native `ExecStopPost` removes it on success or failure; systemd removes the runtime directory. Abrupt host/kernel loss can prevent process cleanup, so treat the machine and dump as sensitive until inspected. Restic encrypts before uploading to the private R2 repository. Root-only credentials never enter app containers. The Debian host uses its supported distro restic package; the pinned local rehearsal client is independent. Verify host/R2 client compatibility before enabling production backups.

After authorized initialization and deployment, run `sudo systemctl start database-backup.service`, inspect `sudo journalctl -u database-backup.service`, and check repository snapshots through the SOPS host environment. A successful capture is followed by restic retention/pruning: 7 daily, 5 weekly, and 12 monthly snapshots for this host/tag. Failure in capture, upload, or pruning makes the unit nonzero and triggers `stateful-alert.service` through `OnFailure`. Verify external webhook delivery only with authorization. That same host cannot notify during complete network or machine loss; monitor backup freshness and public HTTPS independently.

Run `restic check` periodically under authorized backup credentials, and schedule an isolated restore including task ID/title/completion comparisons. A snapshot listing is not restoration evidence. R2 Object Read & Write access includes deletion for pruning; stolen host credentials can delete backups. Native restic encryption does not prevent deletion. Retain independently protected recovery material/snapshots according to your loss tolerance; this example does not configure immutable storage or claim ransomware protection.

For local rehearsal from this project directory:

```sh
just test-db-up
docker build -t stateful:recovery .
just test-recovery
```

This uses only temporary restic repositories, task-owned disposable databases/containers/networks, and a loopback notification receiver. It restores exact rows after dropping its dedicated source DB, rejects an existing/production restore target, injects missing-database/wrong-password failures without extra snapshots, and executes actual rendered unit commands/cleanup. Linux systemd scheduling/sandboxing and R2 are unverified by this substitution. The release scenario runs the actual hook with local transport/path substitution, fresh real PostgreSQL and Drizzle, then a real failing additive SQL migration, and recovers the prior image behind Caddy without losing rows. It is not a real Kamal rollback or R2 restore.

## Restore only into a fresh database

Do not restore over the production database. First suspend app/host deployments and the backup timer if the host is affected. Retain the failed host's data volume and current encrypted infrastructure state for investigation. Download only from a verified repository/snapshot using independent credentials. Keep dumps in protected temporary storage with an exit cleanup trap, not Git, ordinary CI artifacts, or world-readable files.

For disposable local data, export a local absolute `RESTIC_REPOSITORY` and `RESTIC_PASSWORD` outside shell history, initialize it with `restic init`, then run `just backup`. This defaults only to the task-owned `stateful_test` database; `BACKUP_DATABASE=stateful_backup_NAME` permits a separately created fixture. `just restore postgresql://stateful_local:disposable-local-only@127.0.0.1:55433/stateful_restore_NAME` accepts only a fresh task-owned loopback database, and native `createdb` refuses existing targets. The latest local host/tag snapshot is selected. Choose an explicit snapshot with native restic commands for incident recovery rather than assuming latest is healthy.

For authorized production-data recovery, use an isolated Docker PostgreSQL container with the same pinned major version, **no host port**, a dedicated empty volume/network, and an explicitly recovery-owned name such as `stateful-restore-INCIDENT`. Use `docker exec ... createdb -U stateful stateful_restore_INCIDENT` to create a new database, never a drop/clean/overwrite flag. On the trusted recovery workstation with backup-only SOPS access:

```sh
umask 077
dump=$(mktemp -d)
trap 'rm -rf "$dump"' EXIT
# Replace SNAPSHOT with the reviewed exact snapshot ID, using backup credentials.
restic dump SNAPSHOT tasks.dump > "$dump/tasks.dump"
# Docker must target only the independently verified recovery-owned container.
docker exec -i stateful-restore-INCIDENT pg_restore -U stateful \
  -d stateful_restore_INCIDENT --exit-on-error --no-owner --no-privileges < "$dump/tasks.dump"
```

Verify the selected snapshot's task rows, completion states, constraints, and Drizzle journal using native psql. Point an isolated app/gateway pair at the restored DB and check authenticated reads/mutations; do not expose an unauthenticated app or reuse production DNS. A failed restore leaves that disposable target for inspection; start a new empty target for the next attempt. Production cutover needs separate authorization, a write freeze/final consistent snapshot, explicit URL/volume selection, matching app/schema verification, and a retained old volume. This runbook deliberately supplies no production-overwrite or automatic cutover command.

## Recover a failed release

1. Suspend automatic app dispatches and wait for any active Kamal lock holder to finish or be confirmed dead. Inspect the hook/migration/app health logs without dumping secrets. A hook failure can leave the old app stopped and the gateway unavailable. Do not assume an app rollback undoes migrations.
2. Select a known retained full-SHA image compatible with the additive schema. Verify its immutable registry identity and current schema/data with authorized access. The `created_at` migration preserves previous inserts and `id,title,completed` queries. Existing rows receive the migration timestamp, not their unknown historical creation time. Never automatically reverse SQL or restore a stale snapshot just to revert app code.
3. With the approved SOPS/verified SSH environment, run `DEPLOY_AUTHORIZED=true just deploy PREVIOUS_FULL_SHA`. Keep CI suspended: this deliberately bypasses CI's current-main guard for explicit operator recovery, reuses the prebuilt image, and still runs the stop/verify/migrate/start hook under Kamal's deployment lock. The previous migration journal must be compatible with the additive schema; an old image cannot repair a destructive/incompatible migration. Do not use a bare `kamal rollback` or `app start` while any other writer is running.
4. Verify public HTTPS `GET /up`, unauthorized 401 reads/mutations, authenticated task reads/completion writes, and retained rows. Revert the bad source or keep automatic deployment suspended before resuming it, or main can redeploy the failure. If compatible code cannot run, use isolated database restoration and a separately authorized cutover.

## Recover after an infrastructure failure

Git and cloud operations are not atomic. A runner can disappear after resource mutation but before state persistence/upload; GitHub history is a conservative stop signal, not a distributed transaction. Do not delete failed runs, re-run them to erase their conclusion, rename/recreate the workflow to reset numbering, or prune recovery artifacts before reconciliation. Administrators can defeat the history gate by changing/deleting history or workflows. History loss, run-number gaps, and runner loss require manual inventory/reconciliation. The gate does not claim to solve this limitation.

1. Suspend new infrastructure dispatches and cancel **pending** requests, not an active apply. Wait for the active writer to finish or establish that its runner has terminated. Disable application/host workflows too if recovering the VPS. Record the failed run ID and the exact current `main` SHA.
2. Obtain the most recent encrypted state from its state commit, or download `encrypted-state-RUN_ID` from the failed run before its three-day expiry. Check artifact provenance and retain a protected copy. Compare it with current `main` and actual OVH/Cloudflare inventory using authorized read-only access. Do not assume a failed apply made no changes, or replace newer state blindly. If the artifact is absent, reconcile every resource created/changed since the last persisted state, using OpenTofu's supported import/refresh facilities under break-glass authorization. Never repeat the order to find out what happened.
3. In a fresh trusted checkout of current `main`, install the independent recovery identity, copy the reconciled ciphertext to `infra/production.tfstate`, and run `sops exec-env secrets/state.enc.yaml 'tofu -chdir=infra init -input=false -lockfile=readonly && just verify-state'`. Do not print decrypted state with `show -json` or `state pull`, upload plaintext, or commit a saved plan. Inspect lineage/serial privately if reconciliation needs them. `just verify-state` discards native `state pull` output.
4. For a rejected push with no newer state writer, carry the saved encrypted file onto fresh `main`, inspect only the intended state diff/provenance, and make a normal state-only commit. Resolve unrelated source changes separately; never merge ciphertext. If both sides changed state, stop and reconcile lineage, serial, and cloud inventory before committing. Use the protected repository's authorized state-commit path. A push conflict must never cause an automatic second apply.
5. If the very first bootstrap failed and there are genuinely no cloud resources/state, create an actual empty native-encrypted state locally under break-glass authorization with the same encryption configuration and a built-in local-only resource, remove that local-only resource with a local apply, and copy only the resulting empty encrypted state into the production checkout. It must contain no invented production resources. This is a recovery artifact created by OpenTofu, not a fabricated JSON file. If cloud resources exist, import them instead. Keep CI suspended throughout.
6. Compute `sha256sum infra/production.tfstate` (on macOS, `shasum -a 256`). Dispatch **recover**, never apply, from `main` with the exact current `revision`, encrypted file `state_sha256`, and attestation `I reconciled cloud resources and encrypted state`. This operation has only state decryption access, verifies the file and current commit/hash without plaintext output, and emits a distinct recovery checkpoint. It never plans/applies or calls the cloud APIs. A missing/unreadable state cannot be checkpointed.
7. Resume normal dispatches only after that recovery run succeeds and operators agree inventory and state match. The next apply creates a fresh plan from reconciled state. Retain the failed-run evidence and recovery keys independently.

## Recover the host

If SSH/firewall changes lock out administration, use the independently tested OVH console/rescue path, repair `/etc/nftables.conf` and SSH drop-ins, validate with `nft -c -f`/`sshd -t`, and restore verified admin access before rerunning Ansible. Do not permanently open SSH to the Internet. For disk alerts, inspect journals and `docker system df`, remove only known unused images/containers, and preserve retained rollback versions; do not blindly prune. For host loss, reconcile infrastructure state first, obtain separate replacement authorization, reprovision Debian 13, verify new fingerprints, rerun Ansible, and deploy the existing GHCR image. Restore PostgreSQL into an isolated fresh target and verify tasks before separately authorizing cutover. Preserve the old volume and independent backup credentials.

For backup failure, inspect the unit exit status and repository/network/disk health before retrying. Never treat a failed pg_dump as an empty successful backup, reinitialize a repository to hide access failure, prune a shared Docker daemon, or delete old snapshots to repair corruption. A timer may retry on its next scheduled run after an operator fixes the cause; inspect freshness before relying on it.
