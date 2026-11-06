# Minecraft Deployment Reference Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a reproducible Minecraft Java server deployment with consistent backups and deliberate upgrades.

**Architecture:** Use an unmodified established upstream image, Kamal with HTTP proxying disabled, persistent world storage, and workload-aware backup coordination. Local Compose testing establishes game/server behavior before any authorized VPS trial.

**Tech Stack:** itzg/minecraft-server, established Minecraft backup tooling, restic/R2, shared operational stack.

**Spec:** `docs/superpowers/specs/2026-11-06-project-tooling-skill-design.md`

## Global Constraints

- All constraints and the shared operational contract in [the parent plan](2026-11-06-project-tooling.md) apply.
- This example is independently runnable; no dependencies on sibling projects or root node_modules.
- No paid provisioning, live deployment, domain changes, credential installation, or npm publication is authorized.

## Review Focus

1. Game image/version changes cannot start two writers against the same world.
2. Server readiness is established by protocol/client behavior, not merely container startup.
3. Shutdown and backup preserve a recognizable world change.
4. Restore targets isolated storage and cannot accidentally overwrite production.
5. RCON stays private and DNS does not enable Cloudflare HTTP proxying.

---

### Task 1: Local persistent server and backup rehearsal

**Files:**

- Create beneath `skills/choosing-project-tooling/examples/minecraft/`: `mise.toml`, `justfile`, `compose.yml`, `.gitignore`, `README.md`, `docs/recovery.md`.
- Add secret schema/bootstrap instructions, not real credentials.

**Interfaces:** `just start`, `just stop`, `just status`, `just backup`, `just restore TARGET`, `just check`. Server uses game port 25565; RCON is available only on a private container network. Restore refuses the active world path. Explicit user acceptance of the Minecraft EULA is a prerequisite, not an assistant action.

- [ ] Define and run a failing smoke procedure before configuration exists: start server, await protocol readiness with a bounded timeout, connect a real client, place a recognizable block, stop gracefully, restart, and verify the block remains.
- [ ] Pin supported upstream image digest and exact vanilla game version. Configure allowlist, online authentication, explicit heap limits, private RCON, and persistent world storage. Keep credentials out of Compose literals and logs.
- [ ] Use an established Minecraft-aware backup component to coordinate save/flush with the server; feed captured data to restic without a custom backup script. Document game/client prerequisites and license/EULA handling.
- [ ] Rehearse backup into a disposable local restic repository and restore into a separate world path/server. Assert the recognizable change exists and production paths were not modified. Rehearse a failed backup and observe a nonzero outcome.
- [ ] Run `just check`, Compose validation, and actual server lifecycle checks. If no real client or authenticated account is available, record that boundary as blocked rather than substituting logs for client evidence.
- [ ] Commit the local reference and restore instructions.

### Task 2: OVH deployment and upgrade safety

**Files:**

- Create parent operational files beneath this example; no Dockerfile or application package.
- Create: `ansible/templates/{minecraft-backup.service.j2,minecraft-backup.timer.j2}`.
- Modify `config/deploy.yml`, `justfile`, and `docs/recovery.md` for deliberate upgrades.

**Interfaces:** Consumes Task 1's pinned image, lifecycle, and backup procedure. `deploy.yml` is manually dispatched for a selected upstream version/digest, not automatic on main. No custom image publication. Public game port only; DNS-only Cloudflare record; isolated persistent world path.

- [ ] Verify current Kamal behavior for non-HTTP roles and upstream images. Configure proxy disabled and explicit port/volume options. Define an explicit stop-before-start upgrade command sequence; do not rely on HTTP rolling replacement or accessory upgrade semantics.
- [ ] Rehearse the upgrade sequence with disposable local containers: safe stop, consistent backup, start selected image, readiness, failed-start recovery. Verify only one game-server process mounts the writable world at any time. Older-version recovery restores a matching world backup.
- [ ] Implement all parent operational procedures, R2 backup provisioning, host memory bounds, scheduled backups, retention, failure notification, and protected administration. Do not publish RCON or use Cloudflare's ordinary HTTP proxy.
- [ ] Run OpenTofu/Ansible/actionlint validation and safe act jobs. Rehearse local encrypted-state partial failure/push recovery. Inspect actual loopback/private port bindings in local container tests.
- [ ] Copy the example outside the repository and repeat setup/checks without sibling files. Document authorized live VPS/network/game-client checks still outstanding.
- [ ] Commit the complete deployment reference without accepting EULA, ordering infrastructure, or deploying on the user's behalf.
