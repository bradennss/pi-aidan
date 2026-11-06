# Packaged verification and final handoff

Final verification was shortened at the user's request to stop subagents and finish in the main session. Integration Task 2 received an independent spec/quality approval with no findings. Task 3 has the evidence below, but its five-reference final replay and independent review were not completed. Prior per-reference implementation reviews and checks remain historical evidence, not new final-run passes.

## Native packaging

The root `package.json` now explicitly includes extension runtime files (`index.ts`, `src`, `prompts`, `skills`), the five reference `.gitignore` files, and excludes nested `skills/**/node_modules/**`. Contributor-only root docs, tests and configuration remain in Git rather than the runtime package. Native package metadata and README inclusion still apply.

The reason is observed packaging behavior: default packing omitted all five reference `.gitignore` files, and pnpm's original package list admitted 22 generated nested monorepo dependency files. Disposable native probes established that pnpm 10.32.1 preserves the original `.gitignore` names through the scoped `files` entry, while npm 11.19.1 source packing does not. Use the project's pinned pnpm to produce this distribution; do not infer equivalent `npm pack` behavior. No prepack hooks, archive rewriting, scaffolder, or publication were introduced.

The resulting pnpm tarball contained 305 files. The worker verified the 304 tracked runtime/reference content files against source, all five original `.gitignore` paths, and absence of generated extras or symlinks. The parent then independently consumed the unpacked artifact with native Pi.

- Artifact: `pi-aidan-0.1.0.tgz`.
- SHA-256: `3752b1fd19b5553a18f8a0db040d18c9c928c3c98f5fa42075a0a41551d9d947`.
- Source snapshot: `dc2aceb64b96012e24cd6e02bda244c9d3346a9a` plus the packaging-only manifest change. This evidence document is outside the runtime allowlist.
- Local retained artifact/copy: `/private/tmp/pi-aidan-task3.2SXOoH/{pi-aidan-0.1.0.tgz,installed/package}`.

## Actual copied-package invocation

The parent ran two fresh, bounded native SDK sessions, separately from the 35 controlled recommendation trials. Both used `openai/gpt-6.1-sol`, high thinking, read-only `read`, `grep`, `find`, `ls`, in-memory settings/history, and empty host/agent directories outside the checkout. No skill body was pasted or catalog overridden. The official resource loader received `packages: [<unpacked-package>]`, loaded its actual `index.ts` extension and five skills, and reported no extension errors or skill diagnostics.

The actual imported SDK was `/Users/braden/.pi/agent/install/releases/1.5.0/node_modules/@earendil-works/pi-coding-agent/dist/index.js`; adjacent metadata was observed as **1.5.0**.

Both sessions received this command:

```text
/skill:choosing-project-tooling Recommend tooling and verification for a standalone TypeScript duration parser package. Read the closest bundled README from this installed package and only its relevant linked packaging/release docs. Do not implement, write files, use a sibling source checkout, publish, deploy, or run commands. In at most 250 words, name the matching reference and native tasks, and separate observed file reads from checks not run.
```

Both native commands expanded the installed skill and read only these two files under the unpacked package:

- `skills/choosing-project-tooling/examples/library/README.md`
- `skills/choosing-project-tooling/examples/library/docs/releasing.md`

Both answers selected the standalone dependency-free TypeScript/ESM library reference, named its native build/pack/consumer/act/Changesets tasks, retained unchanged-tarball release/retry boundaries, and explicitly stated that checks and live publication had not run. All observed read calls succeeded; neither session used the source checkout or performed writes or commands.

The first session measured `session.systemPrompt` after settlement, which did not contain Aidan's injected core. Inspection of the installed SDK showed that run-specific prompt options are cleared at settlement. A focused second session therefore captured the official `agent_start` event: the copied Aidan core was present during the active run, and absent from the settled getter as expected. This was a measurement-timing correction, not an extension fix or failed inference. Original records remain unchanged.

Local raw receipts are `.superpowers/sdd/2026-11-06-project-tooling-integration/task-3-package-{smoke,lifecycle}.{json,md}`. These two explicit invocation smokes do not establish natural discovery reliability, full ambient interactive configuration, or provider behavior.

## Final outside-copy checks

Fresh copies were outside the source checkout. Stateful and monorepo fixtures used disposable-copy-only, task-unique volume names so pre-existing volumes were not reused or deleted. Application configuration, images, schemas and test expectations were otherwise unchanged.

| Reference | Observed final replay before stopping |
| --- | --- |
| Stateless | Native checks, six browser checks, production-image work, infrastructure/host validation, and safe act Check succeeded. |
| Stateful | Fourteen unit/migration checks, six gateway integration checks, six browser checks, three recovery checks, native configuration validation, and safe act Check succeeded. |
| Monorepo | Native checks, race checks, three browser checks, recovery check, distinct image builds and native configuration validation completed. Safe act Check **failed**; the resumed run reached operations tests and failed when SOPS attempted to open `/dev/stdin`: `no such device or address`. Two other operations checks passed. This is not a successful act run and was left unresolved when the user stopped further work. |
| Minecraft | No new final replay. Previously reviewed local/configuration/filesystem evidence remains; accepted game startup, client joins, real RCON/save coordination, upgrades and game-visible restoration remain blocked/unverified. |
| Library | No new final replay. Previously reviewed parser, packed-consumer and artifact-release evidence remains; actual publication and provider identity remain unverified. |

The stopped worker's temporary logs are retained under `/private/tmp/pi-aidan-task3.2SXOoH/logs`. No production infrastructure, DNS, secrets installation, deployment, notification, EULA acceptance, publication, push or merge occurred. Final root format, typecheck, lint and all 20 tests passed in the main session. The additional final independent review was not run after the user stopped subagent work; this is a handoff with an explicit unresolved Linux/act failure, not an all-green completion claim.
