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

Production SOPS/age configuration, a separately escrowed age identity, protected CI identity installation, and R2 access keys belong to the later production phase. Do not create fake ciphertext, reuse local passwords as production credentials, or claim the local repository is an off-host backup.
