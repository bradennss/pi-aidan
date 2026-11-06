# Recover reports and queued work

Obtain authorization before remote changes or notifications. Suspend app/host/infrastructure writers relevant to the incident and establish no active writer remains before recovery. Retain independent age identities, state encryption keys, and the restic password outside the VPS and GitHub. One host with daily snapshots provides neither high availability nor zero data loss.

## Back up and verify the database

Ansible installs `database-backup.timer` for 03:00 UTC daily, with 15 minutes of jitter and catch-up. The service has a one-hour deadline. Native `pg_dump --format=custom --no-owner --no-privileges` inside `monorepo-api-db` captures the entire database in one consistent PostgreSQL transaction snapshot, including reports, report_results, River jobs/schema/migration journal, and goose's journal. It does not copy a running cluster directory. Writes after snapshot start belong to a later backup. Global roles are not captured; provision the intended owner independently.

The dump lives in a 0700 systemd runtime directory with umask 0077. `ExecStopPost` removes it after success or failure; systemd removes the directory. Abrupt host/kernel loss can prevent cleanup: treat residual host data as sensitive. Restic encrypts before upload to private R2. Backup credentials are host-only, separate from the migration env and all application/deploy jobs. The production Debian package and pinned local restic client are independent; verify repository compatibility before enabling backups.

Initialize the repository exactly once with authorized bucket-scoped credentials and `AWS_DEFAULT_REGION=auto`, never to conceal an access failure. Run `sudo systemctl start database-backup.service`, inspect its journal privately, and verify snapshots. Capture, upload, or pruning failure returns nonzero and invokes `monorepo-alert.service`. Retention keeps 7 daily, 5 weekly, 12 monthly snapshots for the production host/tag. Check backup freshness and HTTPS independently: this host cannot alert during total machine/network loss. Test real webhook delivery only with authorization.

Use `restic check` periodically and rehearse isolated restoration comparing IDs/text/results/jobs and their journals, followed by actual API/worker completion. Listing snapshots alone is not recovery evidence. R2 Object Read & Write credentials include deletion for locks/pruning; compromised host credentials can delete backups. Restic encryption does not prevent deletion. Never configure object lifecycle expiry that deletes restic chunks independently. This example does not configure immutable storage or ransomware protection. Restic password or historical state-key loss can make intact backups/state permanently unusable.

For local-only rehearsal:

```sh
just test-recovery
just build-images FULL_SOURCE_SHA
TEST_DEPLOYMENT_IMAGES=true TEST_IMAGE_REVISION=FULL_SOURCE_SHA just test-integration
```

The Go recovery regression creates a completed report and pending accepted work across an additive migration, captures a real custom pg_dump through `just backup`, restores a fresh task-owned DB, checks rows and both journals, runs required River migrations, and resumes pending work with real services. Equivalent delivery produces one result per report; the source remains untouched. Existing/unsafe targets and failed capture/upload are rejected. The native-unit regression renders the actual backup/alert templates, checks restricted dump/cleanup, nonzero upload failure, unchanged snapshots, and a loopback notification receiver. Local filesystem restic is a substitute, **not R2 evidence**. macOS cannot establish systemd sandboxing/scheduling. The opt-in image regression runs the real hook with only local transport/path substitution, injects a real failed goose migration, then reuses the previous API image and restarts native services while accepted work remains.

## Restore only into a fresh database

Never restore over production. Freeze the affected writers and backup timer, retain old data/state, verify the exact snapshot's provenance, and use protected temporary storage with cleanup. Native `createdb` must refuse existing targets. Do not use pg_restore `--clean`, drop shared schemas, truncate queue tables, or restore a partial report-only dump.

For disposable local data, export an absolute local `RESTIC_REPOSITORY` and disposable `RESTIC_PASSWORD` outside shell history, initialize with `restic init`, then run `just backup`. It defaults to the development DB; `BACKUP_DATABASE=monorepo_test_HEX` permits a task-owned test fixture. `just restore postgresql://monorepo_local:disposable-local-only@127.0.0.1:55434/monorepo_restore_HEX` accepts only a fresh task-owned loopback DB with no URL overrides/fallbacks. It selects latest from the local host/tag, restores all tables, and runs native River migrations. For incidents, select a reviewed explicit snapshot rather than assuming latest is healthy.

For separately authorized production-data recovery, create an isolated PostgreSQL container using the same pinned major version, a new empty dedicated volume/network, no published port, and an explicit incident-owned name, for example `monorepo-restore-INCIDENT`. Create a fresh `monorepo_restore_INCIDENT` database under its intended role. On a trusted recovery workstation with independent backup access:

```sh
umask 077
dump=$(mktemp -d)
trap 'rm -rf "$dump"' EXIT
# SNAPSHOT is an explicitly reviewed exact ID, not an unverified latest pointer.
restic dump SNAPSHOT reports.dump > "$dump/reports.dump"
# Independently verify this is the incident-owned target before executing.
docker exec -i monorepo-restore-INCIDENT pg_restore -U monorepo \
  -d monorepo_restore_INCIDENT --exit-on-error --no-owner --no-privileges < "$dump/reports.dump"
```

Run the selected compatible API image's goose `up` and native River `migrate-up` against only that private restored database before starting a worker. Verify completed report IDs/text/word counts, unique result constraints, accepted pending jobs, goose/River journal versions, and job arguments. Test authenticated reads and bounded pending-work completion with isolated services, never production DNS or unauthenticated public API. Restore failure leaves that target for inspection; use a different fresh DB for retry.

A snapshot can contain a running/retryable River job. Let River's native startup/rescuer/retry lifecycle recover it; honor job scheduling/rescue intervals and inspect native state rather than rewriting queue rows. A restored completed job and result remain completed; available pending work resumes. Equivalent execution remains idempotent only because results use the report ID primary key. Real workloads with email, payments, remote writes, or other external effects can replay after restore, including effects performed after snapshot start or before an unrecorded acknowledgement. They need application-level idempotency/reconciliation at those external boundaries. This reference does not promise exactly-once execution.

Production cutover requires separate authorization, a write freeze/final consistent capture, explicit URL/volume/image selection, backward-compatibility review, and retained old volume. No production-overwrite or automatic cutover command is provided.

## Recover a failed release

1. Suspend app/host dispatches; wait for each native Kamal lock holder or establish it is dead. Inspect exact deployed images and schema/job health without printing credentials. Migration failure leaves previous services running; failure after stop can leave API/worker unavailable. Web can remain old or return temporary upstream errors. PostgreSQL data/queue persist.
2. Prefer retrying the same current revision after correcting the operational cause. Authenticated registry checks reuse all existing images. If code is incompatible, select a retained full-SHA image set compatible with the additive schema and current job payloads. Never reverse SQL automatically or restore a stale database simply to revert code.
3. With CI suspended and explicit operator authorization, the verified SOPS/SSH environment, and base `IMAGE_REPOSITORY`, run `DEPLOY_AUTHORIZED=true just deploy PREVIOUS_FULL_SHA`. This deliberately bypasses CI's current-main guard for recovery, reuses existing images, and repeats migration → API → worker → web. Old goose migration files can coexist with the already-applied additive migration; neither the journal nor schema is downgraded. A destructive migration or incompatible River job payload requires a separately designed recovery. Do not use bare `kamal rollback`/`app start` to bypass the migration/alias stop discipline.
4. Verify all image identities, private connectivity, public HTTPS/authentication, completed records, and newly accepted work through worker completion. If API succeeded but worker failed, durable pending work should finish when a compatible worker returns. Retain failure evidence and repair/revert bad main before resuming automation so it does not immediately redeploy the failure.

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

If SSH/firewall changes lock out administration, use the independently tested OVH console/rescue path, repair `/etc/nftables.conf` and SSH drop-ins, validate with `nft -c -f`/`sshd -t`, and restore verified admin access before rerunning Ansible. Do not permanently open SSH to the Internet. For disk alerts, inspect journals and `docker system df`, remove only known unused images/containers, and preserve retained rollback versions; do not blindly prune. For host loss, reconcile infrastructure state first, obtain separate replacement authorization, reprovision Debian 13, verify new fingerprints, rerun Ansible, and deploy the existing GHCR images. Restore PostgreSQL into an isolated fresh target and verify reports and queued work before separately authorizing cutover. Preserve the old volume and independent backup credentials.

For backup failure, inspect the unit exit status and repository/network/disk health before retrying. Never treat a failed pg_dump as an empty successful backup, reinitialize a repository to hide access failure, prune a shared Docker daemon, or delete old snapshots to repair corruption. A timer may retry on its next scheduled run after an operator fixes the cause; inspect freshness before relying on it.
