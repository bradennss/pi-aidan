# Bootstrap local secrets and storage

Run from the example directory. These instructions are for the operator; they do not authorize an assistant to accept the EULA, install account credentials, or start a game server. Checks require none of these secrets.

## Local file schema

| File | Contents and purpose |
| --- | --- |
| `.env` | Copy of `.env.example`; explicit operator `EULA` choice and comma-separated `WHITELIST` Java profile names. No passwords. |
| `.secrets/rcon-password` | One independently generated random password line for server administration and backup coordination. |
| `.secrets/restic-password` | A different random password line for repository encryption. Losing this and all recovery keys makes the repository unrecoverable. |
| `.local/data/` | Active server data, including world files and generated RCON credentials. Sensitive even though ignored. |
| `.local/restic/` | Local encrypted restic repository. Same-host storage does not survive host/disk loss. |

Do not use symlinks for storage roots or secrets. Keep `.env`, `.secrets/`, `.local/`, and `restores/` out of Git, logs, images, and ordinary artifacts. Compose uses native file-backed secrets, not a secret-loading script or passwords in YAML. Docker administrators can read them. The server also writes its RCON password into generated server properties, so protect the whole active-data directory.

## Initialize a new local installation

Do not rerun password generation over an existing installation. Recover its existing repository password instead.

```sh
umask 077
mkdir -m 700 .secrets .local
# The backup image may use a different UID from the server. It must traverse
# data/; the private .local/ parent still protects this directory on the host.
mkdir -m 755 .local/data
mkdir -m 700 .local/restic
# noclobber refuses to replace existing password files.
(set -C; openssl rand -hex 32 > .secrets/rcon-password)
(set -C; openssl rand -hex 32 > .secrets/restic-password)
# File-backed Compose secrets keep host file permissions on Linux. The image's
# unprivileged user must read them; the enclosing host directory stays 0700.
chmod 644 .secrets/rcon-password .secrets/restic-password
mise exec -- restic --repo .local/restic --password-file .secrets/restic-password init
mise exec -- restic --repo .local/restic --password-file .secrets/restic-password check
```

Keep `.local/` mode `0700` even when the server adjusts ownership inside `data/`. Keep `data/` traversable and its files readable by the backup container; the vanilla image's default umask permits this. If you tighten data permissions or change container users, verify backup readability before relying on captures. Use a dedicated local account on shared machines. Do not print the password files or run shell tracing. Do not run verbose `docker compose config` with secrets or acceptance files for troubleshooting; `just check` uses quiet validation.

## Keep recovery independent of the server

Before relying on backups, store the restic password in a separate password manager or encrypted recovery medium accessible without this Docker host. Keep another encrypted copy of the repository on independent storage using an authorized transfer after backups finish. Keep the config/image pins and snapshot identifiers alongside the recovery instructions, without plaintext credentials. Recoverability needs both repository data and a usable password/key; neither alone is enough.

You can add a separately escrowed restic key with `restic key add --new-password-file /protected/path/to/independent-password`, supplying the current repository and password-file flags. Verify it by running `restic snapshots` with the independent password file before removing any old key. Rehearse recovery without the original host, and keep the recovery medium offline or separately access-controlled. Never put the key on the only disk holding the repository.

For RCON rotation, stop the server, replace only the RCON file with a new generated value, and start again so server and backup read the same value. For restic rotation, use native `restic key add`, verify the new key, then deliberately remove the old key with `restic key remove`; overwriting a password file does not rekey a repository or revoke previously copied data.

The production schema below is independent of local bootstrap. Configuring it does not install credentials or authorize cloud deployment. Do not reuse local passwords or claim the local repository is off-host storage.

## Production SOPS and age schema

Production credentials are separate from local files. `.sops.yaml` has empty, fail-closed recipient rules. Replace them with real, separately scoped age recipients **before** creating actual ciphertext. Create independent recovery copies of the age identities, the OpenTofu state passphrase, and restic password/key outside both the VPS and GitHub. Losing the state key prevents native state/plan recovery; losing every restic key makes world backups unrecoverable.

| Encrypted file | Required flat string keys |
| --- | --- |
| `secrets/state.enc.yaml` | `TF_VAR_state_passphrase`: independent high-entropy state/plan encryption passphrase. |
| `secrets/infra.enc.yaml` | `OVH_APPLICATION_KEY`, `OVH_APPLICATION_SECRET`, `OVH_CONSUMER_KEY`, `CLOUDFLARE_API_TOKEN`, `TF_VAR_zone_id`, `TF_VAR_domain`, `TF_VAR_account_id`, `TF_VAR_backup_bucket`. Optional deliberate `TF_VAR_vps_plan_code` only after catalog/sizing review. |
| `secrets/host.enc.yaml` | `DEPLOY_HOST`, `BOOTSTRAP_USER`, `HOST_SSH_KEY`, `SSH_KNOWN_HOSTS`, `ADMIN_PUBLIC_KEY`, `ADMIN_CIDRS` (comma-separated nonzero CIDRs, no spaces), `PUBLIC_INTERFACE`, `ALERT_WEBHOOK`, `RESTIC_REPOSITORY`, `RESTIC_PASSWORD`, `RCON_PASSWORD`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`. |
| `secrets/deploy.enc.yaml` | `DEPLOY_HOST`, `DEPLOY_SSH_KEY`, `SSH_KNOWN_HOSTS`, `REGISTRY_USER`, `KAMAL_REGISTRY_PASSWORD`, `WHITELIST`. Docker Hub registry access is pull-only. `WHITELIST` contains licensed Java profile names, comma-separated without spaces. No EULA, backup key, or cloud administration credential. |

`RESTIC_REPOSITORY` is `s3:https://ACCOUNT_ID.r2.cloudflarestorage.com/BUCKET/minecraft`, using the dedicated OpenTofu-managed private bucket. R2 S3 credentials must be Object Read & Write scoped to that bucket only, and are delivered only through host configuration. The infrastructure Cloudflare token is separate. Keep the restic encryption key separately recoverable even if R2 token access is revoked; recover both data access and key independently.

Generate separate long random URL-safe passwords (for example, `openssl rand -hex 32`) for state, RCON, and restic. Host validation deliberately permits only unambiguous single-line password/S3/env-file values; do not loosen those constraints to accommodate newline/quote/expansion syntax. SSH private keys remain multiline SOPS strings and enter `ssh-add` through stdin, never a plaintext key file. Use console-verified known-host lines. Do not use environment dump, shell tracing, raw decrypt substitution, or `GITHUB_ENV` for decrypted values.

For a **new** identity on an authorized operator machine:

```sh
umask 077
age-keygen -o /protected/off-repo/location/state.agekey
# Set its public recipient in .sops.yaml, then use SOPS's editor.
sops secrets/state.enc.yaml
# Create the other files with their own recipients and actual schema values.
```

Use a trusted editor without unprotected swap/history/backups, or protected temporary memory-backed input with native SOPS encryption. Do not commit fake encrypted fixtures or sample working credentials. Commit only real SOPS ciphertext and public recipients after secret scanning. `secrets/README.md` points here rather than duplicating the schema.

Install GitHub environment secrets only with authorization: `STATE_AGE_KEY` plus `INFRA_AGE_KEY` in `production-infrastructure`; `HOST_AGE_KEY` in `production-host`; `DEPLOY_AGE_KEY` in `production-game`. No production identities belong in unprivileged PR jobs. Plan/apply combines only state and infrastructure identities in process memory; recovery uses only the state identity. Protect default branch, dispatch and environment access according to the account's actual GitHub capabilities.

Kamal uses **native environment references** in `.kamal/secrets`, evaluated inside `sops exec-env secrets/deploy.enc.yaml 'COMMAND'`. Do not substitute raw decrypted strings into dotenv assignments: passwords containing `$` can be corrupted. Kamal stores accessory environment files on the protected host and Docker administrators can read them. Never print loaded configuration with real inputs. Use the native configuration-initializer check in [operations](operations.md#validate-without-starting-a-game); the pinned CLI display has an accessory-only limitation.

### Host file contract

Ansible creates `/etc/minecraft` mode `0750`, root-owned and deploy-group traversable. Individual RCON/restic password files are `0644` inside that protected parent so container users can read the explicitly mounted files. It writes `backup.env` mode `0600` with native repository/S3 inputs and a restic password-file path. Server and backup mount the same RCON file; only backup receives repository/S3/restic credentials. The server writes RCON credentials into its live data, so protect the entire world tree. Changing UIDs/file permissions requires a backup readability rehearsal.

`/etc/minecraft/eula.env` is a nonsecret native environment file initialized once to `EULA=FALSE`. Only the operator may change it after personally accepting the EULA; no SOPS field, workflow input, or inherited environment value substitutes for that action. Reconfiguration preserves the existing file and does not manufacture acceptance.

Rotate host RCON only during a deliberate stopped-server window, then update SOPS and rerun host configuration so the server and backup use the same file. Rotate R2 access independently, test repository access, then revoke the old token. For restic, add/verify a new key before removing the old one; merely overwriting a password file does not rekey a repository. Rotate SOPS recipients with native `sops updatekeys`, verify independent decryption and CI access, then revoke prior identities. Keep protected recovery copies consistent and test restoration without the original host.
