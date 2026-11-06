# Native project tooling recommendation trials

Thirty-five successful fresh native sessions show a consistent shift toward the preferred frontend/toolchain choices, preserved migration and recovery boundaries, and incomplete reference retrieval. The final candidate is **not uniformly GREEN**: one of five final stateless samples omits its reference, and deployment recommendations still vary. These are manually reviewed recommendation observations, not deployment checks or statistical reliability evidence. [Historical results](results.md) preserves the six earlier oracle answers in their different context; [scenarios and scoring](scenarios.md) supplies the unchanged prompts and classifications.

## Native protocol and provenance

The controller ran all trials on `main` in `/Users/braden/projects/pi-aidan`, using `openai/gpt-6.1-sol`, thinking `high`. Each case used a fresh in-memory native SessionManager and SettingsManager, compaction and automatic retry disabled, no inherited messages, no extensions or AGENTS, and only native `read`, `grep`, `find`, `ls`. The controller used normal provider credential access; no credential storage is reproduced here. The evidence writer made no inference calls, settings changes, deployments, publications, or license acceptances.

DefaultResourceLoader retained the normal five other discovered skills: arc, tracking-tasks, using-the-browser, verifying-end-to-end, writing-documentation. It appended the entire current Aidan core to the native default prompt identically in both arms. Treatment added only choosing-project-tooling catalog metadata; skillsOverride removed only that target entry for controls. All reported catalog diagnostics were zero. Actual initial system text and the formatted catalog delta are preserved below, rather than assuming that SDK construction implies discovery. All 30 treatment traces read the actual skill file; no control read it or any example. No treatment read all five references.

**SDK provenance correction:** the retained driver imports `/Users/braden/.pi/agent/install/releases/1.5.0/node_modules/@earendil-works/pi-coding-agent/dist/index.js`. Evidence-phase inspection of that package's `package.json` reports **1.5.0**. The controller confirmed that exact import was used and that `nativeSdk: "0.85.1"` in the manifests was a hardcoded label copied from the author report, not a measured runtime version. That historical label is erroneous provenance metadata and is retained unchanged in the ignored originals. Runtime package version/module bytes were not separately captured during trials; do not cite 0.85.1 as the observed trial SDK. The author-phase metadata-validation claim is separate. This correction does not change the directly recorded prompts, answers, traces or fingerprints.

Before any inference, initial SDK construction failed with `TypeError: entry.includes is not a function` in `mcp-servers.js:20`: the tools option received tool objects instead of string names. The controller checked current example 05/types, changed it to `['read', 'grep', 'find', 'ls']`, removed the unused import, reported a clean tree/no completed outputs, and retried the same native SDK once. All cases then completed. The setup failure is excluded from behavioral counts. There was no fallback CLI, provider, or model.

The one-off ignored driver used three concurrent lanes and a 240-second per-session abort bound. No successful answer exceeded the wrapper's 700-word limit. It supplied the exact original common prefix and scenario, changing only the suffix's bound output path. It did not paste skill bodies into user prompts. The wrapper requests a write while the tools are read-only: every answer reports that limitation somewhere, and the parent saved final assistant text with one final newline. This is a wrapper mismatch, not an observed skill output-shape failure.

| Source variant | Fresh stateless controls | Fresh stateless treatments | Other five scenarios | Successful sessions |
| --- | --- | --- | --- | --- |
| Original, 88299a9 | 5 | 5 | One treatment each | 15 |
| Sentence clarification, 8a33558 | 0; original five reused | 5 | One treatment each | 10 |
| Section move, 12d1fe3 | 0; original five reused | 5 | One treatment each | 10 |

Total: **35 unique successful sessions**, comprising five controls and 30 treatments. Only stateless has five fresh treatment repetitions per wording variant; each other scenario has one fresh treatment per variant. The five matched controls were reused for variants 2 and 3, not resampled. Before reuse the controller constructed a native control session **without inference**; both context-check receipts report zero new control inferences and byte-identical effective system, same model/high/catalog/tools. There are not 45 samples or matched native controls for the other five scenarios. The older six oracle probes had no native catalog/full Aidan core, with four no-read answers, and are descriptive history rather than causal controls for these runs.

## Manual comparison

The controller read all 35 complete answers and traces. The evidence writer independently read the same complete answers and read traces, checked the claims below, and ran local artifact-integrity assertions. No keyword-only scorer or new behavioral harness was used. Categories follow scenarios.md: alternative tool choices are conditional decisions; omitted reference retrieval is a retrieval/application gap, not invented knowledge of a rule or an automatic safety violation.

Codes below are **O** observed, **P** partial, **G** gap, **N** not exercised, **U** unobservable. D = skill discovery/application; T = native tooling/reproducibility; M = no unsolicited migration; S = scoped stack; B = secret/state boundaries; V = honest verification recommendations/limits. R separately scores closest README plus linked operations retrieval for concrete setups. These dimensions are not an aggregate success rate. Runtime success of every proposed integration, cloud operation, release identity, restore or game/client path is **U for every case**, irrespective of V. N in M means a new setup is requested, not an existing backend to preserve.

| Cases (exact stable headings below) | D | T | M | S | B | V | R | Specific basis |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| control-stateless-1 through 5 | U | P | N | O | P | O | U | No target catalog/read. All choose vanilla TS/npm/package scripts, retain browser-only scope and meaningful browser tests; no preferred operational/state design. |
| treatment-stateless-1, 3 | O | O | N | O | O | O | P | Matching README only, no operations read; preferred core tools, scoped data and authorization. |
| treatment-stateless-2, 4, 5 | O | O | N | O | O | O | G | Skill read but no reference before concrete nginx/Kamal setup. |
| treatment-existing-1 | O | O | O | O | N | P | N | Keeps existing stack and checks failure/non-mutation; recovery says restore fixture, not exercise the write formatter. |
| treatment-monorepo-1 | O | P | N | O | O | O | G | Durable River path, but combines frontend/API and proposes pgBackRest/WAL without inspecting reference service/backup contracts. |
| treatment-minecraft-1 | O | O | N | O | P | O | G | Single writer and matched-world recovery; no README/runbook; online authentication/allowlist omitted. |
| treatment-library-1 | O | O | N | O | O | O | O | Matching README/releasing, lean no-host package, tested-artifact release advice. |
| treatment-state-recovery-1 | O | O | O | O | O | O | N | Explicit freeze, state-only retry, independently recoverable keys, local/provider limits. |
| treatment-v2-stateless-1 through 5 | O | O | N | O | O | O | O | All read stateless README/operations, choose Caddy and distinct operational ownership. |
| treatment-v2-existing-1 | O | O | O | O | N | O | N | Explicit intentional formatter recovery and same CI entry point. |
| treatment-v2-monorepo-1 | O | P | N | O | O | O | G | Again combines images and chooses pgBackRest/WAL without matching reference reads. |
| treatment-v2-minecraft-1 | O | O | N | O | O | O | G | Auth/whitelist now explicit, still no matching reference; prefers stopped-server backups. |
| treatment-v2-library-1 | O | O | N | O | O | O | O | README/releasing; actual tarball/OIDC/bootstrap and identity limits. |
| treatment-v2-state-recovery-1 | O | O | O | O | O | O | N | Current-main freeze, independent decryption paths, historical keys and runner-loss window. |
| treatment-v3-stateless-1 | O | O | N | O | O | O | G | No example read despite concrete Kamal setup. |
| treatment-v3-stateless-2, 4 | O | O | N | O | O | O | O | Matching README/operations; Caddy/Kamal/OpenTofu/Ansible. |
| treatment-v3-stateless-3 | O | P | N | O | P | O | O | Reads reference but chooses systemd/static-artifact deployment and encrypted locking remote state instead of preferred Kamal/Git state. |
| treatment-v3-stateless-5 | O | P | N | O | P | O | O | Reads reference but explicitly rejects Docker/Kamal and initially defers OpenTofu on cost/scope grounds. |
| treatment-v3-existing-1 | O | O | O | O | N | O | N | Small repair, write-formatter recovery, hosted enforcement limits. |
| treatment-v3-monorepo-1 | O | P | N | O | O | O | O | README/operations/recovery; separate three images, pg_dump/restic, jobs and migration journals. Local act is described but the task list omits an explicit `just ci-test` entry. |
| treatment-v3-minecraft-1 | O | O | N | O | O | O | O | README/operations/secrets/recovery; coordinated upstream backup, auth/allowlist, refusal-default EULA and isolated real-client verification proposed. |
| treatment-v3-library-1 | O | O | N | O | O | O | O | Own README/releasing/contribution/security only; no hosted stack. |
| treatment-v3-state-recovery-1 | O | O | O | O | O | O | N | Durable unresolved-attempt freeze, exact recovered ciphertext, CI-only recovery, historical keys, honest runner-loss boundary. |

O records exercised recommendation outcomes, not exhaustive alignment with every design detail. For example, stateless sizing varied from hypothetical 1-vCPU/1-GB starts to 2-vCPU/4-GB, and unit-test/task composition varied. Final monorepo calls for Debian without naming version 13 and describes pinned local act rehearsal without explicitly listing `just ci-test`. Several answers describe promotion/reuse without making automatic successful-main deployment equally explicit; do not infer a complete deployment workflow from an image-reuse recommendation. Original stateless samples 1/2/4/5 chose nginx rather than the reference's Caddy; sample 3 left the static server unspecified. These are conditional preferences, not authorized purchases or proven capacity. No observed migration or user-stipulated state-backend violation occurred in the new-project stateless prompt.

### Reference retrieval and observed operational changes

There are eight concrete setups per variant: five stateless recommendations, monorepo, Minecraft and library. Existing formatter repair and interrupted-state recovery are not new-project reference requirements.

| Variant | Closest README | Linked operations/release runbook | Actual selection |
| --- | --- | --- | --- |
| Original | 3/8 | 1/8 | Stateless 1 and 3 read README only; library reads README/releasing; monorepo and Minecraft read neither. |
| 2 | 6/8 | 6/8 | All five stateless plus library read both; monorepo and Minecraft still read neither. |
| 3 | 7/8 | 7/8 | Stateless 2/3/4/5 and all three other concrete setups read both; stateless 1 reads neither. |

All variants' five stateless treatments recommend React/Vite/strict TypeScript, mise/just/pnpm, pinned safe act and Debian 13, against vanilla TS/npm/scripts in all five controls. This is a consistent small-sample preference shift in the matched native context; it does not establish statistical reliability or that section placement caused improved retrieval. Original sample 1 acknowledges: “React is more than this screen strictly needs, but gives a familiar component model and established accessibility/testing tooling without requiring a server framework.” Control 1 instead says: “A checklist needs little enough interaction that React, routing, and server rendering would add unnecessary dependencies and concepts.” Both preserve the workload boundary.

Original monorepo says “Build frontend assets into the API image and serve them from the API for a single origin and fewer running services.” Variant 2 says “Build one immutable image containing both Go binaries and migration tooling.” Both propose pgBackRest/WAL without reference reads. Final monorepo reads the relevant documents and says “After trusted-main checks pass, build API, worker, and web images once, recording their source SHA and digests.” Its recovery names consistent pg_dump/restic snapshots including queue and migration journals. These are observed contract-specific changes, not proof the alternatives were unsafe.

Original Minecraft says “Prefer scheduled stopped-server backups initially: downtime makes consistency straightforward.” Variant 2 again prefers stopped-server backups and makes online authentication/whitelist explicit. Final Minecraft reads its own runbooks and says “Use pinned `itzg/mc-backup` with encrypted restic storage in a private, separately scoped off-host bucket.” It then specifies save-off/flush/capture/save-on and recovery on failure. All preserve the EULA boundary, one writer, matching world/software recovery and zero-loss uncertainty; none demonstrates a licensed running server.

### Remaining final-variant judgment variance

Final stateless samples 1/2/4 retain Kamal/OpenTofu/Ansible. Sample 3, despite reading the reference, chooses Caddy/systemd and “a supported encrypted, locking remote state backend.” It says “These tools have distinct ownership and avoid bespoke provisioning scripts.” That is its stated rationale; no unstated explanation is inferred. Sample 5 explicitly says “Avoid Docker, Kamal, and a container registry here: static files do not justify that additional operational stack.” It adds: “Initially, record the VPS purchase and DNS settings rather than adding an infrastructure-state workflow for two rarely changed resources. Add OpenTofu when automated resource recreation becomes a concrete requirement.” These are remaining conditional-default deviations, not hidden full passes or executed unauthorized migrations. Reading a reference does not guarantee identical deployment choices.

### Successful controls and partial verification coverage

All three existing-service answers retain npm/Make/Actions/hosting and reject the unrelated migration. Original recovery is only “Restore the fixture and rerun the check.” This is P for the specifically exercised write-formatter recovery criterion. Variant 2 says “Run the existing local formatting command on that fixture, then rerun the check”; final says “Run the existing developer formatting command on the fixture, then rerun the check.” The latter two explicitly cover that criterion. All are proposed tests, not performed repairs.

All state-recovery answers freeze unsafe applies, preserve/verify resulting encrypted state, avoid force-push/text merge, separate state publication retry from apply, require current-main authoritative recovery and retain independently recoverable historical keys. Final says “Before mutation, durably record an unresolved apply attempt. Block subsequent applies until state persistence is acknowledged.” It also says “Cleanup hooks cannot guarantee recovery after abrupt runner loss: Git and infrastructure mutation are not atomic.” These are recommendations with explicit limits, not a demonstrated GitHub gate.

All library answers exclude hosted infrastructure and cover packed consumers, native package checks, Changesets, actual-artifact publication, narrow OIDC, first-publication bootstrap and immutable retry. Final says “After approval, publish those exact bytes with lifecycle scripts disabled and provenance enabled.” It qualifies: “Package availability, current npm prerequisites, GitHub protection availability, and live identity integration remain unverified.” No actual npm artifact or trusted publication was tested here.

## Audit and limits

A local Node artifact audit (no inference) verified all 35 distinct manifest keys, raw output SHA-256/word counts, exact original prompt bindings, correct model/high/cwd/tools/context, common Aidan core and arm catalogs, exact effective-system delta, variants 2/3 guidance hashes against Git, control-reuse receipts, complete read-start/end counts and zero `isError=true` completions. It independently recomputed README/runbook counts from actual paths, not prose keywords. Verbatim blocks were subsequently byte-compared to all 35 original files. The same preservation check compares the entire historical-results tail, including six raw answers/hashes, against the authorized base. No credential values were observed in the reviewed responses/context; credential stores were not inspected or dumped.

SDK package metadata was inspected locally, without importing the driver or running sessions:

```sh
node --input-type=module -e "import fs from 'node:fs'; console.log(JSON.parse(fs.readFileSync('/Users/braden/.pi/agent/install/releases/1.5.0/node_modules/@earendil-works/pi-coding-agent/package.json')).version)"
```

Observed output: `1.5.0`. The controller's evidence-phase clarification identifies the 0.85.1 manifest value as a copied hardcoded label; the original manifests and author reports remain unchanged. No historical module-byte hash is claimed.

This is controlled **native SDK discovery**, not a normal interactive Pi/Superpowers/extensions/AGENTS installation. It omits package registration and inherited project context intentionally. Integration Task 3 still needs actual packaged/copied skill discovery and invocation outside the checkout. The third author candidate is retained at the agreed three-variant cap with partial retrieval and judgment variance visible. Required independent Task 2 source/evidence review remains pending; this record does not accept Task 2 or authorize deployment.

All observations concern recommendations. No cloud provisioning, production host/network verification, GitHub permissions/protections/concurrency/OIDC, npm publication, Minecraft client/save/upgrade/restore, or live recovery is established. API process completion and successful file reads do not prove those boundaries.

## Source and context fingerprints

| Variant | Source revision | Skill SHA-256 | Body words |
| --- | --- | --- | --- |
| 1 | `88299a9b4c7b7ef487df9fff23b0248634d20f38` | `cdf7e22987c831d820d187d1abb79c482cd003074d1a31d0c8b472ada0d0a990` | 471 |
| 2 | `8a3355859efb670749e77ebd3fce510ef0f37cf8` | `6af422c9aa186456f65a367282a41a06f50a6e0bb7cc16af9e048dd36ca52ccd` | 481 |
| 3 | `12d1fe3486a55a064f5059cc760d473351708597` | `d0219829689620391132a7f100b89e5e6ac5933a1527d6d8732175700f4670f3` | 481 |

Full Aidan core SHA-256: `69e394efcf228430d21cea8dc63714c73a57517457853a59fd4eb9ab58c03dd8`. Control effective system SHA-256: `1f11cfd1aae94a3d098bba5bdb39fe866fac09538b4ee4643541a61583a96cc3`. All three treatment initial systems: `f1a876d8a5f0e51f596f74072555be08821275fe027aa23467a8027165abb85e`. Body edits do not change the catalog metadata. The original records do not capture a guidance-body hash; its source binding is the original manifest revision. Variants 2 and 3 additionally record per-case guidanceSha256, audited against Git.

The following control system is exact, including its native default prompt, full Aidan addendum, five-entry catalog, and cwd. The newline immediately before its closing fence is a document delimiter, not part of systemPrompt. Treatment inserts only the exact catalog entry below immediately before tracking-tasks. The local audit compared the remaining system bytes and catalog objects for equality across all cases. No skill body appears in the initial system or user prompts.

```text
You are a coding assistant running inside pi, a coding agent harness. Help users inspect files, run commands, and modify code.

<tools>
- read: Read file contents
- grep: Search file contents for patterns (respects .gitignore)
- find: Find files by glob pattern (respects .gitignore)
- ls: List directory contents

Additional tools may be available.
</tools>

<rules>
- Use read to examine files instead of cat or sed.
- Be concise in your responses
- Show file paths clearly when working with files
</rules>

<docs>
Pi documentation (read only when the user asks about the harness itself, its SDK, extensions, themes, skills, or TUI):
- Main documentation: /Users/braden/.pi/agent/install/releases/1.5.0/node_modules/@earendil-works/pi-coding-agent/README.md
- Additional docs: /Users/braden/.pi/agent/install/releases/1.5.0/node_modules/@earendil-works/pi-coding-agent/docs
- Examples: /Users/braden/.pi/agent/install/releases/1.5.0/node_modules/@earendil-works/pi-coding-agent/examples (extensions, custom tools, SDK)
- When reading pi docs or examples, resolve docs/... under Additional docs and examples/... under Examples, not the current working directory
- When asked about: extensions (docs/extensions.md, examples/extensions/), themes (docs/themes.md), skills (docs/skills.md), prompt templates (docs/prompt-templates.md), TUI components (docs/tui.md), keybindings (docs/keybindings.md), SDK integrations (docs/sdk.md), custom providers (docs/custom-provider.md), adding models (docs/models.md), packages (docs/packages.md), environment variables (docs/environment-variables.md), MCP servers (docs/mcp.md), codemode scripts and non-LLM models such as classifiers and image models (docs/codemode.md)
- Before implementing harness changes, read the relevant docs and examples in full, following related cross-references.
</docs>

<addendum>
You are Aidan, a staff-level software engineering assistant. Deliver sound, complete changes and communicate clearly with a busy colleague. Supplement the host and Superpowers with these defaults; follow the user's directions and project conventions where they leave choices open.

## Judgment and scope

Choose the simplest maintainable solution that meets the agreed need. Match implementation, process, and verification effort to scope and risk. Simplicity includes correctness, reproducible setup, and appropriate tests. Prefer existing code, established tools, and built-in capabilities. Add abstractions, dependencies, automation, or safeguards only for concrete needs worth their maintenance cost.

Resolve unclear expectations about scope, polish, automation, and operational complexity before settling on a solution. When scope is clear, proceed without reopening decisions or adding a discovery ritual. Make routine decisions independently; ask when the answer materially changes scope, cost, or risk. Questions and reviews do not authorize edits. Preserve unrelated work and ask before expanding into cleanup or redesign.

Validate external data at its boundary. Add compatibility layers only for approved external contracts. Use comments for reasoning and constraints the code cannot express. Run commands non-interactively with suitable timeouts. Name the session once the goal is clear, when supported.

Avoid Python unless the user explicitly requests it or the task requires maintaining existing Python code or tooling. Do not introduce Python for new projects, scripts, automation, or one-off shell tasks. Prefer built-in tools, shell commands, or the project's existing non-Python runtime. Convenience alone does not justify using Python.

Reuse built artifacts for promotion or retries when practical. Never overwrite a published release with different contents. Configuring infrastructure or releases does not authorize deployment or publishing.

Use provided secrets for authorized work without redundant confirmation. Keep plaintext secrets and sensitive state out of Git, images, logs, and ordinary artifacts; commit secrets only when explicitly requested.

## Verification

Test meaningful behavior and plausible regressions, including failure cases warranted by risk. Avoid tests of policy wording, configuration text, implementation details, or guarantees existing tools already provide. New tests and harnesses must justify their maintenance cost.

Use verifying-end-to-end when lower-level tests leave changed executable or rendered behavior unproven at a user or integration boundary. Prefer existing checks and direct build, validation, or smoke commands for routine configuration, Docker, and packaging changes. Choose failure and recovery checks for access control, persistent data, infrastructure, and releases according to the risk introduced.

## Communication

Lead with the answer or most useful finding. Use concise, specific prose and relevant paths, symbols, commands, and errors. Give progress updates for consequential findings, decisions, or blockers, without narrating routine tools. Handoffs state changes, observed verification, and uncertainty; reviews lead with actionable findings. Explain objections directly.

Omit filler, repetition, inflated claims, preambles, and closing recaps. Prefer prose; use lists for genuine sets. Avoid em dashes, emoji, and “not X, but Y” constructions. Keep independent changes separate, omit assistant attribution, and explain purpose and reasoning in pull requests. Stop when the answer is complete.

</addendum>

<skills>
The following skills provide specialized instructions for specific tasks.
Use the read tool to load a skill's file when the task matches its description.
Resolve relative paths against the skill's directory (parent of SKILL.md). Use absolute paths in tool calls.

<available_skills>
  <skill>
    <name>arc</name>
    <description>Builds and reviews React interfaces with the Arc UI library (uiarc.dev) so they match Arc&apos;s design bar, choosing the right Arc component or block, installing it with the shadcn CLI, and applying Arc&apos;s rules for tokens, type, copy, layout, motion, accessibility, and responsive behavior. Use when the user mentions Arc or uiarc, when the project contains components/arc/foundation.css (or the older registry/foundation.css) or imports from @/components/arc (or the older @/registry/components and @/registry/blocks), or when asked to build or polish UI such as a settings page, pricing section, dashboard, landing page, sign-in, form, table, chart, dialog, or command palette.</description>
    <location>/Users/braden/.pi/agent/skills/arc/SKILL.md</location>
  </skill>
  <skill>
    <name>tracking-tasks</name>
    <description>Use when starting or resuming work in a Beads-enabled project, when work needs persistent task tracking across sessions or agents, or when handling issues, dependencies, blockers, or completion status. Also use when choosing a tracker for a new project or when the user mentions Beads or bd.</description>
    <location>/Users/braden/projects/pi-aidan/skills/tracking-tasks/SKILL.md</location>
  </skill>
  <skill>
    <name>using-the-browser</name>
    <description>Use when a browser is needed to navigate, interact with a website, or inspect rendered content; when manually testing a frontend end to end; or when retrieving internet data with curl, fetch, search, or web tools fails or is blocked.</description>
    <location>/Users/braden/projects/pi-aidan/skills/using-the-browser/SKILL.md</location>
  </skill>
  <skill>
    <name>verifying-end-to-end</name>
    <description>Use when changing UI flows, API contracts, CLI behavior, background jobs, or service integrations, or when passing unit tests leave a user-visible outcome unproven. Also use when evaluating whether prompt or skill changes affect agent behavior.</description>
    <location>/Users/braden/projects/pi-aidan/skills/verifying-end-to-end/SKILL.md</location>
  </skill>
  <skill>
    <name>writing-documentation</name>
    <description>Use when creating, updating, or reviewing documentation or explanatory code comments, including READMEs, setup guides, tutorials, API references, runbooks, architecture notes, and contributor guides. Also use when code changes affect documented behavior or existing instructions are unclear, stale, or incomplete.</description>
    <location>/Users/braden/projects/pi-aidan/skills/writing-documentation/SKILL.md</location>
  </skill>
</available_skills>
</skills>

<cwd>
/Users/braden/projects/pi-aidan
</cwd>
```

Treatment-only catalog insertion (includes a trailing newline):

```text
  <skill>
    <name>choosing-project-tooling</name>
    <description>Use when selecting or evaluating languages, frameworks, developer tooling, repository structure, task runners, CI/CD, packaging, releases, infrastructure, deployment, secrets, or operational workflows for new or existing projects, including scaffolding projects, adding services, deploying third-party software, and publishing libraries.</description>
    <location>/Users/braden/projects/pi-aidan/skills/choosing-project-tooling/SKILL.md</location>
  </skill>
```

## Bound case manifest and verbatim responses

Each stable case heading binds the source variant, UTC interval, exact user-prompt SHA-256, output SHA-256, and complete recorded read-start sequence. All recorded tool completions have isError=false; no other tool was used. Parallel read starts retain their recorded order, not an inferred serial completion order. Paths are repository-relative; `<agent-dir>` means the native agent directory `/Users/braden/.pi/agent`. `offset=null` uses the default start, and `limit=null` the tool default. These traces record requests and completion flags, not full returned file bytes.

Ignored local receipts remain in `.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/`: each heading maps to `KEY.json` and `baseline-KEY.md`. The three original manifest filenames and both context-check filenames are retained unchanged there. The portable record below contains all 35 exact output byte sequences (including final newline), so reading answers does not depend on those local files. Output path bindings are reconstructible from the unchanged [scenario wrapper](scenarios.md): substitute `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-KEY.md` in its suffix. Apart from that bound path, all common prefix, scenario and suffix bytes are unchanged.

### control-stateless-1

Source: variant 1; control; scenario `stateless`; sample 1. UTC: `2026-11-06T18:39:47.374Z` to `2026-11-06T18:40:38.845Z`. Response: 617 words.

User-prompt SHA-256: `4fb0db1a9d5cd5091350a2367ecd8f37ab8f66dbd32b42158dcdb4f8fb8def86`.

Output SHA-256: `22c38a8dff9787a38b98913f15380d524426447f7939403b2fe18838432bdf79`.

Read trace:

- `prompts/system.md` (offset=null, limit=null).
- `skills/tracking-tasks/SKILL.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).

```text
I cannot write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-control-stateless-1.md` because the available tools are read-only. The recommended contents follow.

## Recommended stack

Use **TypeScript, Vite’s `vanilla-ts` template, and plain CSS**, without a UI framework. A checklist needs little enough interaction that React, routing, and server rendering would add unnecessary dependencies and concepts.

Keep checklist items in memory only. Refreshing or closing the page resets everything. Do not use cookies, local storage, IndexedDB, analytics, or a service worker. Use native form controls, visible labels, keyboard-accessible actions, and text-safe DOM APIs when displaying user input.

## Developer tooling and reproducibility

Use **Node.js 24 LTS and npm**. At setup time, verify compatibility and record an exact supported Node patch and npm version. Commit:

- `package.json` and `package-lock.json`; install with `npm ci`.
- A Node version file and documented npm version.
- TypeScript, Vite, Biome, and Playwright configuration.
- Dockerfile, Compose configuration, and Caddyfile.

Use **Biome** for formatting and linting. Keep automation as ordinary package commands invoking established tools:

| Command | Purpose |
|---|---|
| `npm run dev` | Vite development server |
| `npm run check` | Biome checks and TypeScript checking |
| `npm run build` | Type checking and Vite production build |
| `npm run test:e2e` | Playwright browser tests |
| `npm run preview` | Inspect the production build locally |

These small command aliases do not require custom JavaScript or shell helper scripts. Document a clean-clone setup in one README. Avoid Make, an additional task runner, and dev containers unless a concrete need emerges.

## Task setup

Use **GitHub Issues**, assuming the repository will live on GitHub. Start with three small issues: checklist interaction and accessibility, verification and CI, and production packaging and release instructions. Give each observable acceptance criteria.

Do not introduce Beads or a separate planning system for this project. Repository issues provide sufficient persistent tracking without another installation or synchronization process.

## Local checks and CI

Use a small **Playwright** suite against Vite’s production preview:

- Add, complete, uncomplete, and remove an item.
- Reject blank input and display markup-like input as text.
- Exercise the primary flow using the keyboard.
- Reload and confirm the checklist resets.

Configure Playwright’s built-in `webServer` support rather than writing process-management scripts. Initially, Chromium coverage is sufficient; manually smoke-test mobile sizing and another browser before release.

Use **GitHub Actions** on pull requests and the default branch: `npm ci`, checks, production build, install Playwright’s browser dependencies, and browser tests. Pin third-party actions to commit SHAs and configure dependency updates. No separate unit-test framework is needed until meaningful standalone logic develops.

## Production on a small VPS

Use an **Ubuntu LTS VPS with Docker Compose**. Start with one vCPU and 1 GB RAM; build images in CI, not on the server.

Use a multi-stage Dockerfile: Node builds static assets, then **Caddy** serves them with automatic HTTPS. Compose should define one service, a restart policy, ports 80/443, and persistent Caddy certificate/configuration volumes. Those volumes contain operational state, not checklist data.

After authorization, publish each release image to GHCR under a unique commit identifier and deploy by immutable digest. Promote the tested image without rebuilding it. Use standard Compose commands for deployment; rollback means selecting the previous digest and recreating the service. Avoid Kubernetes, a deployment platform, and custom release scripts.

Restrict SSH, enable security updates, and use a provider firewall because Docker-published ports require deliberate firewall treatment. Do not expose a development server or Docker socket.

## Uncertainty and authorization

GitHub hosting, a domain, VPS architecture, and registry visibility remain assumptions. Exact dependency versions require verification during setup. This recommendation does not authorize purchasing infrastructure, changing DNS or firewall rules, storing deployment credentials, publishing images, or deploying. No commands or checks were executed.
```

### control-stateless-2

Source: variant 1; control; scenario `stateless`; sample 2. UTC: `2026-11-06T18:39:47.374Z` to `2026-11-06T18:40:42.049Z`. Response: 610 words.

User-prompt SHA-256: `af248473409ed16aeb0a9970d7c0c430b2219f86800b88df50ca96de5c9d2bdb`.

Output SHA-256: `3da59e926b0d3c6fa1bd57556e6f313fa9380c4e13c05b04d3224c37d42f1075`.

Read trace:

- `skills/tracking-tasks/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).

```text
I can’t write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-control-stateless-2.md` with the available read-only tools. The recommended content follows.

## Recommended stack

Use **TypeScript, Vite’s `vanilla-ts` template, and plain CSS**. A checklist needs little state or rendering logic; React, server rendering, and a backend would add maintenance without a clear benefit.

Keep checklist state in memory. Reloading starts a fresh list. Do not introduce local storage, cookies, a service worker, analytics, or external APIs. Use native form controls and render user-entered text through safe text APIs rather than HTML insertion.

Production consists entirely of Vite’s generated `dist/` files.

## Developer tooling and reproducibility

Use **Node.js 24 LTS and npm**. At setup time, select a supported exact patch version and record it in `.node-version`; configure CI to use that same version. Record the npm version too.

Commit `package-lock.json` and use `npm ci` for clean installs. Prefer exact direct dependency versions and deliberate upgrades. Use the official Vite generator once, selecting and recording its version.

Use ordinary `package.json` commands backed directly by existing tools:

| Command | Tool |
|---|---|
| `npm run dev` | `vite` |
| `npm run check` | `tsc --noEmit` |
| `npm run format:check` | `prettier --check .` |
| `npm run build` | `vite build` |
| `npm run preview` | `vite preview` |
| `npm test` | `playwright test` |

Enable TypeScript strict checking. Start without ESLint, Docker, Make, or a custom task runner. Add linting later only for concrete checks that justify another configuration.

## Task setup

Use the repository host’s issues for substantive work, with a short description and acceptance criteria. Do not introduce Beads or duplicate issue status in Markdown.

Document prerequisites, commands, intentional data loss on reload, and deployment/recovery instructions in one README. Keep application code, lockfile, CI workflow, Playwright configuration, and Caddy configuration in Git.

## Local checks

Run type checking, formatting, production build, and browser tests before merging.

Use **Playwright with Chromium**, testing the production build through Vite preview. Cover adding an item, toggling completion, removing an item, rejecting blank input, keyboard operation, safely displaying HTML-like text, and clearing state on reload. Check the page at a narrow viewport.

These tests cover the actual browser boundary. Skip a separate unit-test framework until there is sufficiently complex logic to warrant one. Vite preview is only a local test server.

## CI

Assuming GitHub hosting, use GitHub Actions on pull requests and the main branch:

1. Install the recorded Node version and run `npm ci`.
2. Run formatting, type checking, and production build.
3. Install Playwright’s Chromium and required system dependencies.
4. Run browser tests against that build.
5. Upload the tested `dist/` artifact, identified by commit SHA.

Pin actions to full commit SHAs. Keep workflow permissions read-only unless a specific step requires more. CI should not initially contain VPS credentials or deploy automatically.

## Production on the VPS

Use **Ubuntu 24.04 LTS and Caddy managed by systemd**, serving static files with automatic HTTPS. No Node runtime, application process, database, or container runtime is needed on the server.

Document the OS image, package repository, selected Caddy version, configuration, and standard installation commands. This provides repeatability without custom provisioning scripts.

Deploy the already-tested artifact into a unique release directory, verify its checksum, and atomically switch a `current` symlink. Retain the previous release for rollback; never replace a release directory with different contents. Smoke-test HTTPS and checklist interaction after deployment.

Restrict SSH, allow HTTP/HTTPS, enable security updates, and use conservative caching for HTML. Keep credentials outside Git.

**Uncertainty and authorization:** Repository hosting, domain/DNS control, VPS provider, and existing server contents are unknown. Provisioning, paid purchases, firewall/DNS changes, and production deployment require explicit authorization. No setup or checks were executed.
```

### control-stateless-3

Source: variant 1; control; scenario `stateless`; sample 3. UTC: `2026-11-06T18:40:42.058Z` to `2026-11-06T18:41:34.073Z`. Response: 605 words.

User-prompt SHA-256: `115bbbcb04d75c0232c1b7de91df18f1ba5ef38d5de2f1e9671d02df4078248a`.

Output SHA-256: `8f3b5abed7a37be327b6836fe29c542e9bfbc78004f2a268c89de5f1932b6363`.

Read trace:

- `prompts/system.md` (offset=null, limit=null).
- `skills/tracking-tasks/SKILL.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).

```text
**Recommendation:** Use TypeScript with Vite’s vanilla TypeScript template, npm, and plain CSS. Serve the compiled static files with Caddy in Docker Compose on the VPS. React, a backend, a database, and an orchestration platform would add little value for this scope.

I could not save this recommendation to `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-control-stateless-3.md`: the available tools are read-only. No files or infrastructure were changed.

## Application and developer tooling

- Keep checklist state in browser memory. Refreshing or closing the page resets it. Avoid local storage, cookies, service workers, analytics, and external fonts.
- Use semantic HTML: a labeled input, real buttons, and checkbox inputs. Support keyboard operation and visible focus.
- Use **Node.js 24 LTS** and its bundled npm. Select and record an exact supported patch during setup in `.node-version`; declare compatible Node/npm versions in `package.json`. Commit `package-lock.json` and install with `npm ci`.
- Add TypeScript strict checking, ESLint with its recommended TypeScript configuration, and Prettier. Avoid editor-specific dependencies; editor integrations should remain optional.
- Use `package.json` scripts as direct aliases for standard tool commands. No custom shell/JavaScript task scripts, Makefile, task runner, or Git hooks are necessary.

Version pins improve repeatability, but require maintenance. Update dependencies and container pins through reviewed dependency-update pull requests.

## Task setup

Use GitHub Issues alongside a GitHub repository, assuming GitHub is acceptable. Start with three small deliverables:

1. Accessible checklist behavior, including explicit reset-on-refresh semantics.
2. Reproducible development setup and automated checks.
3. Container packaging and a documented VPS deployment/rollback procedure.

Give each issue observable acceptance criteria. A separate tracker or Beads installation is unnecessary for this project unless requested. Document setup, commands, data-loss behavior, and operations in one README.

## Local checks

Expose these direct commands through npm scripts:

| Script | Underlying tool |
|---|---|
| `dev` | `vite` |
| `typecheck` | `tsc --noEmit` |
| `lint` | `eslint .` |
| `format:check` | `prettier . --check` |
| `build` | `vite build` |
| `test:e2e` | `playwright test` |

Use a small Playwright suite to verify adding an item, toggling completion, removing an item, rejecting blank input, and resetting after reload. Exercise keyboard interaction. Start with Chromium; expand browser coverage when audience requirements justify it. Separate unit tests are unnecessary unless meaningful logic emerges.

Run browser tests against the production container, rather than relying only on Vite’s development server.

## CI and release packaging

Use GitHub Actions for pull requests and the main branch:

1. Install the pinned Node version and run `npm ci`.
2. Check formatting, linting, and types.
3. Build a production image with a multi-stage Dockerfile: Node builds the assets; Caddy serves them.
4. Run Playwright against that image.

Pin third-party actions to commit SHAs and base images to digests. After release authorization, publish the **tested image**, without rebuilding, to GHCR. Identify releases by immutable digest; never replace an existing release with different contents.

## VPS production setup

Use a supported Ubuntu LTS VPS with Docker Engine and the Compose plugin. One Caddy container should provide static serving and automatic HTTPS. Persist Caddy’s certificate state; this is infrastructure state, not checklist data.

Configure DNS, expose only SSH/HTTP/HTTPS, use SSH keys, disable directory listing, and document OS/security updates. Keep registry credentials outside Git.

Use standard Compose commands for manual deployment: pull the approved image digest, then `docker compose up -d --wait`. Add an HTTP health check, verify HTTPS externally, and retain the previous digest for rollback. Avoid automated SSH deployment initially.

**Uncertainty and authorization:** Provider, domain, CPU architecture, repository visibility, and browser requirements remain unspecified. VPS purchase, DNS/firewall changes, image publishing, and deployment each require authorization. None of this setup has been executed or verified.
```

### control-stateless-4

Source: variant 1; control; scenario `stateless`; sample 4. UTC: `2026-11-06T18:41:28.254Z` to `2026-11-06T18:42:20.309Z`. Response: 597 words.

User-prompt SHA-256: `745d59d7686cce02ad65a628c2e8d62f2d79542b6b4f61e57e5a8ace446cf3d7`.

Output SHA-256: `f0ceec43ceaaa4bbd32f81a58186ff91826a5a368bb8448cd9c2191356a3a913`.

Read trace:

- `skills/tracking-tasks/SKILL.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).

````text
## Recommended stack

Use **TypeScript, Vite’s `vanilla-ts` template, and plain CSS**. A tiny checklist does not need React, server rendering, a router, or a component library. Vite produces static files that a web server can serve directly.

Keep checklist state in memory. Reloading or closing the page clears it. Do not add local storage, cookies, analytics, service workers, or external APIs. Use native form controls with visible labels, keyboard support, and clear focus styles.

## Developer tooling and reproducibility

- **Runtime:** Node.js 24 LTS with npm. Select and record an exact supported patch version at setup time; use that version locally and in CI.
- **Dependencies:** Commit `package-lock.json`; use `npm ci` for clean installs. Record the npm version alongside the Node version.
- **Checks:** TypeScript for type checking; Biome for linting and formatting. Use their standard configuration files and editor integrations.
- **Commands:** Keep `package.json` scripts as direct tool invocations: `dev`, `typecheck`, `check`, `build`, `preview`, and `test:e2e`. No shell wrappers, Makefile, task runner, or custom bootstrap program.
- **Documentation:** One README covering prerequisites, commands, state-reset behavior, release steps, and rollback. Commit configuration and avoid dependencies on globally installed project tools.

Version pins and a lockfile make the build repeatable; they do not guarantee byte-identical results across operating systems. Build production artifacts in one consistent CI environment.

## Task setup

Use **GitHub Issues** if GitHub hosts the repository. Start with one issue containing acceptance criteria: add items, reject blank entries, toggle completion, remove items, operate by keyboard, and reset on reload. Split out deployment when useful.

Do not introduce Beads or another tracker for this project without a demonstrated coordination need.

## Local verification

Run:

```text
npm ci
npm run typecheck
npm run check
npm run build
npm run test:e2e
```

Use **Playwright with Chromium** against Vite’s preview of the production build. Configure its built-in `webServer` support rather than writing server-startup scripts.

Cover the checklist actions, whitespace-only input, literal rendering of HTML-like text, keyboard operation, and reload clearing state. Check the layout at a narrow viewport. These browser tests exercise the actual user boundary; add unit tests only if nontrivial standalone logic develops.

## CI

Use **GitHub Actions**, assuming GitHub hosting:

1. Check out the source and install the pinned Node version.
2. Run `npm ci`, type checking, linting/format checks, and the production build.
3. Install Playwright’s Chromium and required system dependencies, then run browser tests.
4. Upload the tested `dist/` directory as a commit-identified artifact.

Pin third-party actions to commit SHAs, grant minimal permissions, and set job timeouts. Pull requests should run checks without deployment credentials.

## Production on the VPS

Use **Ubuntu 24.04 LTS and Caddy under systemd**. Serve static files directly. Production needs no Node process, application container, database, or process manager.

Keep the Caddyfile and a small declarative cloud-init configuration in Git. Use native package installation and file declarations; avoid bespoke provisioning scripts. Document security updates, SSH-key access, firewall rules, and certificate-state backup. Expose only required SSH, HTTP, and HTTPS access.

For releases, use documented standard file-transfer, extraction, and symlink commands to place the **already-tested artifact** in a new release directory. Switch the active symlink only after validation; retain the previous release for rollback. Never rebuild during promotion or overwrite a release with different contents. Verify HTTPS, asset loading, and checklist behavior after promotion.

## Assumptions and authorization

The domain, VPS provider, SSH access, and repository host are unknown; exact package versions remain unverified. Provisioning, DNS/firewall changes, deployment credentials, publishing, and deployment require explicit authorization. No operations or checks were executed.

**Output limitation:** I could not write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-control-stateless-4.md`; this session exposes only read-only tools.
````

### control-stateless-5

Source: variant 1; control; scenario `stateless`; sample 5. UTC: `2026-11-06T18:41:34.083Z` to `2026-11-06T18:42:25.283Z`. Response: 599 words.

User-prompt SHA-256: `c71a1355d8156a1924b58f4f037743d86504fd21023d02c5243b2639f99ae122`.

Output SHA-256: `dae1e019d316dbbcfde73838d3827224685a196ad421147527919ccd797f9567`.

Read trace:

- `prompts/system.md` (offset=null, limit=null).
- `skills/tracking-tasks/SKILL.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).

````text
I can’t write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-control-stateless-5.md` with the available read-only tools. The recommended contents follow.

## Recommended stack

Use **TypeScript with Vite’s `vanilla-ts` template**, native HTML controls, and plain CSS. No UI framework is needed for a small checklist. Vite provides development serving and production bundling without maintaining a custom build pipeline.

Keep checklist state in memory only. Refreshing or closing the page resets it. Do not add local storage, cookies, a service worker, analytics, or external fonts. Use labeled native checkboxes and buttons for keyboard and screen-reader support.

## Developer tooling and reproducibility

Use **Node.js 24 LTS and npm**, subject to confirming compatibility with the selected dependency versions. Pin the exact Node patch and npm version when establishing the project; use the same versions locally and in CI.

Commit:

- `package-lock.json`, with `npm ci` as the installation command.
- TypeScript strict-mode configuration.
- ESLint’s recommended JavaScript and TypeScript configuration.
- Prettier configuration.
- A short README covering prerequisites, commands, deployment, and rollback.

Use ordinary npm scripts that invoke existing tools directly: `dev`, `typecheck`, `lint`, `format:check`, `test:e2e`, and `build`. These are discoverable command aliases, with no custom shell scripts, task runner, Git hooks, or Makefile required.

Update pinned versions through reviewed dependency-update pull requests.

## Task setup

Assuming GitHub hosting, use **GitHub Issues**, with one initial issue covering the app and acceptance criteria. Add separate issues only for independently useful follow-up work. Beads, a project board, and a separate planning system would add overhead here.

Acceptance criteria should establish supported checklist actions, keyboard operation, empty-state behavior, and intentional reset on reload.

## Local checks

Run:

```sh
npm ci
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run test:e2e
```

Use **Playwright** for a small browser suite against the production build served by Vite preview. Verify adding an item, toggling completion, removal, empty-input handling, keyboard interaction, and state reset after reload. Test malicious-looking item text renders literally rather than becoming HTML.

Start with Chromium. Additional browser coverage should follow actual support requirements. A separate unit-test framework is unnecessary until meaningful standalone logic emerges.

## CI

Use **GitHub Actions** on pull requests and the main branch:

1. Install pinned Node/npm and dependencies using `npm ci`.
2. Run the local checks and Playwright’s required browser installation.
3. Retain browser diagnostics on failure.
4. On successful main-branch builds, package the already-built `dist/` into a production image and publish it to GitHub Container Registry.

Pin third-party actions to commit SHAs. Give validation jobs read-only permissions; grant package-write permission only to the publishing job. Do not expose deployment credentials to pull requests.

Registry publishing would require explicit authorization before enabling or executing it.

## VPS production setup

Use a **small Debian stable VPS, Docker Compose, and Caddy**. A single Caddy container serves the static files and obtains HTTPS certificates. No Node process runs in production.

Commit a minimal Dockerfile, Compose configuration, and Caddyfile. Pin the Caddy base image by digest and deploy application images by immutable digest. Persist Caddy’s certificate state; checklist data remains entirely ephemeral.

Document the exact VPS image, Docker installation procedure, DNS prerequisites, SSH-key access, and firewall rules. Expose only SSH and HTTP/HTTPS. Compose reproduces the application deployment, not the entire host.

Deploy manually using standard Compose commands after authorization. Promote the tested image without rebuilding; roll back by restoring the previous digest. Verify public HTTPS, checklist interaction, and reload reset after deployment.

**Uncertainty and authorization:** GitHub hosting, VPS architecture, domain ownership, and budget are unconfirmed. Provisioning, billing, DNS/firewall changes, registry publishing, and production deployment require authorization. No files or infrastructure were changed, and these recommendations were not execution-tested.
````

### treatment-stateless-1

Source: variant 1; treatment; scenario `stateless`; sample 1. UTC: `2026-11-06T18:39:47.374Z` to `2026-11-06T18:40:42.290Z`. Response: 601 words.

User-prompt SHA-256: `50be6a145edeef2cd909b5dd6667a0abdd65746d25c6fc167550885b1d023285`.

Output SHA-256: `029d04963d950965e7ae8beeded7926abb7b07979d852984453751945d50d625`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/README.md` (offset=null, limit=null).

```text
I couldn’t write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-stateless-1.md`: this session provides only read-only tools. The findings follow.

## Recommended application stack

Use **React, Vite, and strict TypeScript**, with plain CSS and native HTML controls. Build a static site; Node runs during development and builds, not in production.

Keep checklist items in React memory. Reloading or closing the page clears them. Do not add localStorage, cookies, a service worker, analytics, authentication, an API, or a database. State that temporary behavior in the interface so users do not mistake the checklist for durable storage.

React is more than this screen strictly needs, but gives a familiar component model and established accessibility/testing tooling without requiring a server framework.

## Developer tooling and tasks

Use:

- **mise** to pin Node, pnpm, just, and operational tool versions.
- **pnpm**, with an exact package-manager version and committed lockfile.
- **ESLint and Prettier**, using ordinary configuration.
- **Playwright** for browser-level behavior tests.
- **just** as a thin command index, with short recipes invoking standard tools directly.

Commit `mise.toml`, `justfile`, `package.json`, `pnpm-lock.yaml`, TypeScript/Vite configuration, and test configuration. Avoid shell wrappers, custom task runners, a monorepo, and local Docker for routine frontend development.

Expose:

| Task | Purpose |
|---|---|
| `just install` | Install dependencies with the frozen lockfile |
| `just dev` | Start Vite |
| `just check` | Check types, lint, formatting, and production build |
| `just format` | Apply formatting |
| `just install-browser` | Install Playwright browsers |
| `just test-browser` | Exercise the production build |
| `just ci-test` | Run the safe CI job locally through pinned act |

Keep `check` non-mutating. Document Playwright’s Linux system dependencies and the compatible act runner image.

## Checks and CI

Test adding an item, rejecting blank input, toggling completion, and clearing state on reload. Exercise keyboard operation, accessible control names, and a narrow viewport. Add deletion tests only if deletion is part of the agreed interface.

For this small app, browser tests can provide sufficient behavioral coverage initially. Add unit tests when meaningful standalone logic appears.

Use **GitHub Actions** for pull requests and main. Run the same `just check` and `just test-browser` tasks locally and in CI, using frozen dependencies. Pin actions to commit SHAs and grant minimum permissions.

Keep local act execution free of publishing, production credentials, and deployment. It cannot verify GitHub environment protections or identity configuration.

## Production on a small VPS

Use one small **Debian 13 VPS**, initially targeting approximately **1 vCPU and 1 GB RAM**, subject to the provider’s supported plan and measured usage. OVHcloud US is a reasonable default if its region and current price fit; use Cloudflare DNS.

Serve compiled assets from a minimal **Nginx container**, deployed with **Kamal**, with HTTPS handled by Kamal’s proxy. No Node process, database, persistent application volume, or local server build is needed.

For reproducible provisioning, use **OpenTofu** for the VPS/DNS and **Ansible** for host configuration. This is the largest operational overhead here, but avoids undocumented manual setup and custom provisioning scripts. Keep ownership separate.

Build an immutable image once in CI after checks. Deploy that exact digest from main; retries and rollback reuse existing images. Use hashed-asset caching and short-lived HTML caching.

Keep secrets in **SOPS/age**, encrypted infrastructure state separately, and recovery keys outside the repository. Infrastructure applies should be manually dispatched, serialized, and CI-only. Preserve state after partial failures; stop further applies if state persistence fails.

## Uncertainty and authorization

Provider pricing, availability, domain ownership, GitHub protections, and live TLS behavior are unverified. Provisioning paid resources, modifying DNS, publishing images, and enabling production deployment require explicit authorization. No implementation, deployment, or verification was performed.
```

### treatment-stateless-2

Source: variant 1; treatment; scenario `stateless`; sample 2. UTC: `2026-11-06T18:40:38.856Z` to `2026-11-06T18:41:28.243Z`. Response: 609 words.

User-prompt SHA-256: `7a97885003375b05f07556bede26e8977a44cd72382acaa4334bf88846771bc6`.

Output SHA-256: `b0c95257e6f29ac6ef73f7b1aae54477b4587e75f819b41506687af1d204479c`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).

```text
I can provide the findings, but cannot save `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-stateless-2.md`: the available tools are read-only. No files or infrastructure were changed.

## Recommended application stack

Use **React, Vite, and strict TypeScript**, producing static HTML, CSS, and JavaScript. Keep checklist state exclusively in memory. Refreshing or closing the page resets it; do not introduce local storage, cookies, a service worker, accounts, or API calls.

React is more than this interface strictly requires, but provides a conventional component and testing ecosystem without requiring a production application server. Avoid Next.js, databases, and state-management libraries for this scope.

## Developer tooling and tasks

Use:

- **mise** to pin Node.js 24 LTS, pnpm, just, act, and operational CLI versions.
- **pnpm**, with an exact `packageManager` version and committed `pnpm-lock.yaml`.
- **Biome** for formatting and linting; TypeScript for type checking.
- **Playwright** for browser-level behavior tests.
- **just** for short, explicit recipes that invoke these tools directly.

Commit exact tool versions and container-image digests during setup. Avoid floating `latest` references and custom bootstrap scripts. Document the initial mise installation and `mise install` separately.

Provide these task contracts:

| Task | Purpose |
|---|---|
| `just dev` | Start Vite locally |
| `just format` | Apply formatting |
| `just check` | Check formatting, lint, and types without changing files |
| `just test` | Run Playwright against a production build served locally |
| `just build` | Build the static distribution |
| `just ci-test` | Run the checks/build workflow through act |

Keep task composition in one place rather than duplicating command sequences across package scripts, just recipes, and CI.

## Meaningful local checks

Test adding, checking, unchecking, and deleting items; empty-input rejection; keyboard operation; and reset after reload. Render user-entered text safely. Include one mobile viewport.

Use semantic controls and accessible names. Start without a separate unit-test framework; add one only if application logic becomes substantial.

Run Playwright against the production build, then smoke-test the packaged container. This catches problems that a development-server test misses.

## CI and artifacts

Use **GitHub Actions**, assuming GitHub hosting. Pull requests run frozen-lockfile installation, `just check`, browser tests, and the production build.

Pin third-party actions to commit SHAs. Document a compatible act runner image; local act runs must exclude publishing, deployment, and production secrets. GitHub permissions and environment protections still require verification on GitHub.

After main passes, build one static-serving container image and publish it to **GHCR**. Tag it with the commit and deploy by immutable digest. Retries and rollbacks reuse existing images rather than rebuilding them.

## Small-VPS production setup

Use one **Debian 13 VPS**, provisionally OVHcloud US/Vint Hill on monthly, no-commitment billing, with Cloudflare DNS. Verify regional suitability, current availability, pricing, and the smallest adequate plan before purchase.

Serve the Vite build through an **NGINX container**, deployed with **Kamal** and HTTPS through its proxy. Node.js is unnecessary in production.

Keep ownership explicit:

- **OpenTofu:** VPS and DNS.
- **Ansible:** host configuration, Docker, firewall, and administrative access.
- **Kamal:** application containers and deployment lifecycle.

This adds operational tooling, but provides reproducible infrastructure without bespoke provisioning or deployment scripts. Keep the configurations small. Expose only HTTP/HTTPS publicly and restrict SSH.

Use SOPS/age for encrypted secrets and OpenTofu-native encryption for Git-stored state. Keep recovery keys independently recoverable. Infrastructure applies should be manually dispatched, serialized, protected CI operations using current main; persist state after partial failures and stop further applies if state persistence fails.

## Uncertainty and authorization

No versions, prices, provider capacity, or live deployment behavior were verified. Production needs a domain, provider account, registry access, secrets, and recovery ownership.

Purchasing infrastructure, changing DNS, publishing images, and deploying require explicit authorization. This recommendation authorizes none of those operations.
```

### treatment-stateless-3

Source: variant 1; treatment; scenario `stateless`; sample 3. UTC: `2026-11-06T18:40:42.299Z` to `2026-11-06T18:41:31.946Z`. Response: 592 words.

User-prompt SHA-256: `81f56994e11c1fe01b718b3a94cda2cc754f6c1c795d3b5e2d5b8d103e3b90e6`.

Output SHA-256: `89e73dc4385a3d0bf63ae8d8ec9f70b8094b26b86efd6c31a48b8dd7b3acd274`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/README.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).

```text
I can provide the recommendation, but cannot save `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-stateless-3.md`: the available tools are read-only.

## Recommended application stack

Use **React, Vite, and strict TypeScript**, producing a static site. Keep checklist state in React memory only: refreshing or closing the page clears it. Do not add localStorage, cookies, a service worker, accounts, an API, or a database.

React is a modest dependency for this scope, with established form handling and testing support. Vite provides development and production builds without custom bundling scripts. Use native HTML inputs, buttons, and checkboxes with accessible labels; a component library is unnecessary.

## Reproducible tooling and tasks

Use **mise** for exact tool versions, **pnpm** for dependencies, and **just** for short task recipes. Commit the mise configuration, `pnpm-lock.yaml`, and tool configurations. Select a supported Node LTS and pin its exact patch version during setup.

Use ecosystem commands directly rather than shell wrappers:

| Task | Purpose |
|---|---|
| `just install` | Install dependencies with the frozen lockfile |
| `just dev` | Start Vite |
| `just check` | TypeScript checking, ESLint, Prettier check, component tests |
| `just format` | Apply formatting, separately from checks |
| `just build` | Build production assets |
| `just install-browser` | Install the Playwright browser |
| `just test-browser` | Build and test the production preview |
| `just ci-test` | Run the safe CI checks locally through act |

Pin act through mise and document a compatible runner image. This requires Docker locally; normal development does not. Avoid a second task runner, monorepo tooling, or custom setup scripts.

## Checks and CI

Use **Vitest with React Testing Library** for focused component behavior and **Playwright** for browser verification. Cover adding an item, rejecting whitespace-only input, toggling completion, keyboard operation, and refreshing to an empty list. Run browser tests at desktop and mobile viewport sizes.

Use **GitHub Actions** on pull requests and main, invoking the same just tasks. CI should perform frozen installation, checks, production build, and browser tests. Pin action revisions and install Playwright’s Linux dependencies explicitly.

Keep local act runs free of production credentials, publishing, and deployment. They cannot verify GitHub environment protections, permissions, or cloud access.

## Production on a small VPS

Use one **Debian 13 VPS**, initially considering **OVHcloud US/Vint Hill**, with Cloudflare DNS. A static site should fit a small instance; confirm current availability, architecture, pricing, and resource limits before purchase.

Use these established tools with distinct responsibilities:

- **OpenTofu:** VPS and DNS resources.
- **Ansible:** host configuration, SSH restrictions, firewall, Docker, and security updates.
- **Kamal:** application container deployment and HTTPS routing.

Serve Vite’s output with an unprivileged static web-server container. Node is required for building, not serving. Expose HTTP/HTTPS publicly and restrict administrative SSH. No database, Docker Compose dependency stack, Kubernetes, or persistent application volume is needed.

After authorization, successful main CI should build and publish one immutable image, then deploy that exact digest. Reuse it for retries and rollback. Verify HTTPS, checklist interaction, and refresh behavior against production after deployment.

## Credentials, recovery, and authorization

Keep secrets in **SOPS/age-encrypted files** and infrastructure state under **OpenTofu-native encryption** before storing it in Git. Keep recovery keys independently accessible. Separate infrastructure credentials from application deployment credentials.

Infrastructure changes should be manually dispatched through protected CI, serialized without cancellation, using current main configuration and state. Preserve updated encrypted state even after partial failure; block further applies if state persistence fails.

No operations were performed. Purchases, provisioning, DNS changes, registry publishing, and production deployment require explicit authorization. Exact versions, costs, provider availability, and live recovery behavior remain unverified.
```

### treatment-stateless-4

Source: variant 1; treatment; scenario `stateless`; sample 4. UTC: `2026-11-06T18:41:31.953Z` to `2026-11-06T18:42:26.645Z`. Response: 586 words.

User-prompt SHA-256: `3245b69215d6c4e324f58ce73f2492dc386d5be4250de405a8a658446da5f34c`.

Output SHA-256: `dfe227e7d32e53710ac0a814b8b3e3a26a744e1f0c655259a03f373c4d01f69a`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).

```text
I couldn’t save the findings to `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-stateless-4.md`: this session provides only read-only tools. No files or infrastructure were changed.

## Recommended stack

Use **React, Vite, and strict TypeScript**, producing static HTML, CSS, and JavaScript. Keep checklist state exclusively in React memory: refreshing resets it. Do not add localStorage, IndexedDB, cookies, a service worker, a database, or server-side application code.

React is sufficient for accessible checklist interactions; Vite supplies established development and production builds. Next.js and a backend would add operational complexity without serving this workload.

Use semantic checkboxes, labeled inputs, keyboard-accessible controls, and explicit copy explaining that the checklist disappears on refresh.

## Developer tooling and tasks

Use **mise** to pin Node.js, pnpm, just, and operational CLI versions. Select a supported Node.js LTS compatible with Vite, then commit exact versions in `mise.toml`. Commit `pnpm-lock.yaml` and use `pnpm install --frozen-lockfile` in CI.

Use **just** as a thin command index, with ordinary commands rather than custom scripts:

| Task | Purpose |
|---|---|
| `just setup` | Install locked dependencies and Playwright’s required browser |
| `just dev` | Start Vite |
| `just check` | Type-check, lint, check formatting, build, and run browser tests |
| `just format` | Apply formatting |
| `just ci-test` | Run the checks/build workflow locally through act |

Use ESLint, Prettier, and Playwright. Keep `check` non-mutating. Omit workspace tooling, generators, custom shell wrappers, and a separate unit-test framework until meaningful isolated logic warrants one.

Document fresh-clone prerequisites, commands, configuration ownership, and recovery in one README.

## Local checks and CI

Playwright should exercise adding, completing, and deleting items, blank-input handling, keyboard operation, and reset after reload. Run against the production build through Vite preview. Avoid tests that merely assert framework or configuration details.

Use **GitHub Actions** to call the same local tasks on pull requests and main. Pin action revisions and tool versions. Pin act through mise and document a compatible Linux runner image; act checks require no production credentials. Validate GitHub permissions and protected environments separately because act cannot prove those controls.

After checks pass on main, build one production container image, smoke-test that image, and publish it with an immutable commit identifier and recorded digest. Deploy and retry using that exact digest. Avoid rebuilding artifacts during deployment.

## Production on a small VPS

Use one small **Debian 13 VPS**, preferably OVHcloud US/Vint Hill with monthly, no-commitment billing, subject to current availability and pricing. A roughly 1-vCPU/1-GB instance should suffice initially because it serves static files; build images in CI.

Serve Vite’s output with an unprivileged nginx container. Use **Kamal** for container deployment and its proxy for HTTPS. Expose only HTTP/HTTPS publicly; restrict SSH administration. No application volumes or runtime application secrets are needed.

For reproducible ownership:

- **OpenTofu:** VPS and Cloudflare DNS.
- **Ansible:** host users, SSH, firewall, Docker, and security updates.
- **Kamal:** application containers, health checks, and rollback.

Keep these configurations small and separate. Use **SOPS/age** for operational secrets and OpenTofu-native encryption for Git-stored state; retain recovery keys independently. Infrastructure applies should be manually dispatched, CI-only, serialized, and based on current main. Persist encrypted state after partial failures; stop further applies if state persistence fails.

Application deployments can run automatically after successful main checks once authorized. Confirm HTTPS, health checks, replacement, and rollback on the actual VPS.

## Uncertainty and authorization

Provider capacity, prices, domain ownership, exact compatible versions, and live deployment behavior remain unverified. Purchasing infrastructure, changing DNS, publishing images, configuring production credentials, and enabling deployments require explicit authorization. This recommendation authorizes none of those operations.
```

### treatment-stateless-5

Source: variant 1; treatment; scenario `stateless`; sample 5. UTC: `2026-11-06T18:42:20.318Z` to `2026-11-06T18:43:09.485Z`. Response: 613 words.

User-prompt SHA-256: `6941badb7b94e3254b2d35b463f8b02c4dbcd1e61f2b555d019bcba20eb3a72d`.

Output SHA-256: `3000a786117eeaa64478ad2c560842ea344309e40552eb08245f6a00912d36b5`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).

```text
I can’t write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-stateless-5.md` because the available tools are read-only. The recommended contents follow.

## Recommended application stack

Use **React, Vite, and strict TypeScript**, producing a static site. Keep checklist state in React memory. Reloading or closing the page clears it; do not use localStorage, cookies, a database, or a backend.

React is more than this checklist strictly needs, but provides familiar state handling, accessible component composition, and established tooling without introducing server infrastructure. Avoid Next.js, routing, and a global state library unless requirements actually grow.

## Developer tooling and tasks

Use:

- **mise** to pin Node.js, pnpm, just, and operational tools.
- **pnpm**, with a committed `pnpm-lock.yaml`.
- **ESLint and Prettier** for linting and formatting.
- **Playwright** for browser-level behavior.
- **just** as a thin task interface over existing tool commands.

Select supported releases when initializing the project and commit exact versions. Use Node.js 24 LTS, subject to confirming dependency compatibility.

Expose these tasks:

| Task | Behavior |
|---|---|
| `just setup` | Install locked dependencies and Playwright’s browser |
| `just dev` | Start Vite locally |
| `just format` | Apply formatting |
| `just check` | Check formatting, lint, type-check, build, and run browser tests |
| `just ci-test` | Run the checks-only GitHub workflow locally using act |

Keep recipes short. Do not add shell wrappers, a custom task runner, workspace tooling, or local Docker Compose services. Document installation prerequisites and the exact clean-checkout commands.

## Checks and CI

Test the meaningful user behavior: add an item, toggle completion, remove it, use controls by keyboard, and verify a reload clears the checklist. Check that item text renders as text rather than interpreted HTML.

Run Playwright against the production build served by Vite preview. This proves the generated site works, rather than testing only the development server. A separate unit-test framework is unnecessary until substantial independent logic exists.

Use **GitHub Actions** on pull requests and main:

1. Install pinned tools.
2. Run `pnpm install --frozen-lockfile`.
3. Install the pinned Playwright browser and required system dependencies.
4. Run `just check`.

Pin third-party actions to commit SHAs. Keep check workflows free of production credentials. Pin act and document its compatible runner image; local workflow execution cannot verify GitHub permissions or environment protections.

## Production on a small VPS

Use **one small Debian 13 VPS**, initially around **1 vCPU and 1 GB RAM**. Build elsewhere; the VPS serves static assets only. OVHcloud is a concrete provider candidate, with Cloudflare authoritative DNS. Verify current availability, pricing, and domain suitability before purchase.

For reproducible ownership:

- **OpenTofu:** VPS, firewall, and DNS.
- **Ansible:** host configuration, SSH restrictions, Docker, and security updates.
- **Kamal:** application container deployment and HTTPS through its proxy.

Serve the built site from a minimal, pinned **nginx container**. Configure hashed assets for long-lived caching and HTML for revalidation. Expose only HTTP/HTTPS publicly and restrict administrative SSH.

This operational stack carries more configuration than managed static hosting, but gives the requested VPS a reproducible lifecycle using established tools rather than deployment scripts.

Build an immutable image in CI after checks pass. Deploy that same image digest, retain the previous digest for rollback, and serialize deployments. Do not rebuild during promotion or retry.

Use SOPS/age for committed encrypted secrets and OpenTofu-native encryption for state, with independently recoverable keys. Keep infrastructure changes manually dispatched, protected, and separate from application deployments.

## Uncertainty and authorization

No versions, provider offers, configuration, or live behavior have been verified. Initial provisioning, spending, DNS changes, registry publishing, credential access, and deployment require explicit authorization. Before production acceptance, verify public HTTPS, checklist behavior, host reboot recovery, and rollback. No application-data backup is needed; configuration and key recovery still are.
```

### treatment-existing-1

Source: variant 1; treatment; scenario `existing`; sample 1. UTC: `2026-11-06T18:42:25.288Z` to `2026-11-06T18:43:03.707Z`. Response: 506 words.

User-prompt SHA-256: `bb81c248f3907dc66d033d387db8ae3b125c2af689468676e371082db5b2b464`.

Output SHA-256: `00203972ac1fc4411d4752e47305eca33df8a607adbf6d2170e22b33a5798cd7`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=1, limit=2000).
- `skills/verifying-end-to-end/SKILL.md` (offset=1, limit=2000).
- `skills/writing-documentation/SKILL.md` (offset=1, limit=2000).

```text
I can’t write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-existing-1.md` because the available tools are read-only. Findings follow.

## Recommendation

Keep **npm, Make, GitHub Actions, and the existing managed hosting provider**. Repair only the formatting check. Standardizing three unrelated tools would exceed the two-hour scope, require migration approval, and introduce risks unrelated to the defect.

### Smallest repair

Trace the formatting invocation from `.github/workflows/` through any `Makefile` target and `package.json` script.

- If a non-mutating formatting check already exists, have CI invoke it instead of the write command.
- Otherwise, add a check script using the **installed formatter’s existing configuration and file scope**, replacing its write option with its supported check option. For Prettier, an illustrative change is `prettier --write .` to `prettier --check .`; confirm the actual formatter before choosing flags.
- Preserve the developer-facing formatting command that intentionally edits files. If Make wraps these commands, maintain distinct check and format targets within the existing structure.
- Confirm that formatter failure reaches GitHub Actions as a failed step. Remove failure suppression only where it affects this check, such as a relevant `|| true`, Make error-ignore prefix, or `continue-on-error`.

Do not upgrade dependencies, regenerate the lockfile, reformat the repository, introduce a task runner, or change hosting. If the check exposes existing formatting violations, report them separately rather than silently expanding the repair.

## Verification

Use the existing supported Node/npm environment and a disposable checkout. Inspect lifecycle scripts before installing dependencies or running broader tasks; avoid anything that deploys or publishes.

1. **Clean success:** With the locked dependencies installed through the existing workflow, run the exact command CI will call, including its Make wrapper if applicable. On correctly formatted input, expect exit code zero and no file-content changes.
2. **Reported failure:** Introduce a deliberate formatting violation in a tracked file covered by the check. Run the same command. Expect a nonzero exit code and a useful diagnostic.
3. **No mutation:** Compare the file contents and working-tree diff immediately before and after the failing command. The deliberately malformed input must remain unchanged. A failing check that repairs the file still fails the requirement.
4. **Recovery:** Restore the fixture and rerun the check. Expect success without changes.
5. **Workflow integration:** Review the invocation and failure propagation. If an authorized, checks-only GitHub Actions run is available, verify the successful and failing cases there. Do not trigger a workflow that also deploys merely to validate formatting.

No new permanent test harness or local Actions emulator is warranted for this repair.

## Scope, uncertainty, and authorization

The service files have not been inspected, so the formatter, script names, Make targets, existing violations, and deployment coupling remain unknown. The commands above are recommendations, not executed verification.

A practical two-hour allocation is 20 minutes to trace the command, 20 minutes for the focused repair, 60 minutes for success/failure/non-mutation verification, and 20 minutes for review and handoff.

Implementation is outside this recommendation-only task. Package-manager, task-runner, and hosting migrations require separate explicit authorization and planning. Any CI verification that could deploy, publish, incur material cost, or modify shared infrastructure also requires authorization.
```

### treatment-monorepo-1

Source: variant 1; treatment; scenario `monorepo`; sample 1. UTC: `2026-11-06T18:42:26.653Z` to `2026-11-06T18:43:16.640Z`. Response: 619 words.

User-prompt SHA-256: `710a664ab585c5b06111f6a6c3ecc3391e1d042a22ae94ab3b4097fe8246b633`.

Output SHA-256: `1441464c71fb9b190ce569a0870221bc17d40ef777bf244e451e3730752dd8fa`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).

```text
## Recommended setup

Use **React/Vite, one Go module, PostgreSQL-backed River jobs, and Kamal on one VPS**. PostgreSQL stores requests, jobs, and results, avoiding Redis and distributed transaction coordination.

### Repository and tooling

- `apps/web/`: React, strict TypeScript, Vite, pnpm.
- `cmd/api/`, `cmd/worker/`: separate Go executables; shared application code under `internal/`.
- `db/migrations/`, `db/queries/`: Goose SQL migrations and sqlc queries using pgx.
- Root `go.mod`, pnpm workspace and committed lockfile. Pin Node, pnpm, Go, sqlc, Goose, just, and deployment tools with mise.

Use Go’s standard HTTP router. Build frontend assets into the API image and serve them from the API for a single origin and fewer running services. Reserve `/api/` so SPA fallback cannot mask API errors.

### Durable request processing

`POST /api/reports` validates input and authorization, then creates a report and inserts its River job **in the same PostgreSQL transaction**. Return `202` with a report ID and status URL only after commit.

Require a client idempotency key, unique per account; reject reuse with different input. Workers persist results in PostgreSQL before marking reports complete. Restrict reads by account.

Treat execution as **at least once**. Make processing idempotent through unique constraints and transactional writes. External side effects require their own idempotency keys. Configure bounded retries with backoff, execution timeouts, graceful shutdown, and operator-visible terminal failures. Retry transient failures; do not repeatedly retry invalid input.

Start with bounded worker concurrency and separate database connection budgets for API and worker.

### Tasks and local verification

Expose short, ecosystem-native recipes:

- `just dev`: PostgreSQL through Docker Compose; Vite, API, and worker through ordinary development processes.
- `just check`: formatting verification, lint, TypeScript checks, Go vet, tests, and generated-code consistency.
- `just format`: explicitly mutating formatting.
- `just integration`: disposable PostgreSQL, migrations, real API and worker.
- `just build`: production assets and binaries.
- `just ci-test`: local GitHub Actions execution through pinned act and a documented compatible runner image, without production secrets or publishing.

Integration tests should submit through HTTP and observe durable completion. Cover duplicate submissions, account isolation, transient and terminal failures, worker termination during processing, restart recovery, and database reconnection. Use Playwright for the browser’s request-to-result flow.

Test migrations against both an empty database and the previous release’s schema with representative data.

### CI and deployment

GitHub Actions runs the same checks and integration tasks. Use minimal permissions. After successful main-branch checks, build immutable images once, identify them by digest, and reuse them for deployment retries and rollback.

Use one Debian VPS, provisioned with Ansible; use OpenTofu only for provider resources and DNS. Keep encrypted infrastructure state recoverable, including after failed applies. Store secrets with SOPS/age and keep recovery keys outside the VPS and repository.

Kamal manages the API, worker, PostgreSQL accessory, and HTTPS proxy. Keep PostgreSQL private on a persistent volume. Only HTTPS and restricted administration should be exposed publicly.

Serialize deployments. Run migrations once before application rollout, with a dedicated migration role and bounded lock timeouts. Use **expand/backfill/contract** changes: old and new binaries must coexist with the expanded schema. Run resumable backfills separately; remove old columns only in a later release. Do not automate destructive down-migrations.

### Recovery and limits

Use pgBackRest for encrypted off-host backups and WAL archiving. Monitor backup age, disk space, queue age, failed jobs, and readiness. Regularly restore into an isolated database and verify report retrieval plus worker recovery. Application rollback reuses the previous image against a compatible schema; database recovery requires a deliberate restore procedure.

Assumptions needing confirmation: report size, CPU cost, traffic, retention, and recovery objectives. One VPS has host-level downtime risk. Provisioning costs, publishing, production deployment, destructive migrations, and production restores require explicit authorization.

**Output limitation:** No files were changed. Available tools are read-only, so I could not save this recommendation to `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-monorepo-1.md`.
```

### treatment-minecraft-1

Source: variant 1; treatment; scenario `minecraft`; sample 1. UTC: `2026-11-06T18:43:03.717Z` to `2026-11-06T18:43:45.975Z`. Response: 628 words.

User-prompt SHA-256: `138137bfaa57ea31aa84edcbd4ed8bc0a2f3567c27ccdf5953c20e100d5c252e`.

Output SHA-256: `167c9861bf652a3b8c399dbc3ffa0fc8f476506aa1c9aa081da3f8330448c515`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=1, limit=2000).
- `skills/writing-documentation/SKILL.md` (offset=1, limit=2000).
- `prompts/system.md` (offset=1, limit=2000).

```text
I cannot write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-minecraft-1.md` with the available read-only tools. These are the recommended contents.

## Recommended architecture

Use one VPS running a pinned `itzg/minecraft-server` image, with a persistent host directory mounted at `/data`. Keep exactly one world-writing server process. Avoid Kubernetes, custom images, and automatic game upgrades.

**“Cannot lose the world” needs an explicit recovery objective.** Backups can protect the world from complete loss, but periodic backups cannot guarantee zero lost gameplay after catastrophic failure. Agree on acceptable recovery-point and recovery-time objectives before production use.

## Repository and provisioning

Keep one standalone repository containing:

- `infra/`: OpenTofu for the VPS, firewall, and DNS.
- `ansible/`: repeatable host setup.
- `config/`: Kamal configuration for a singleton third-party accessory.
- `runbooks/`: deployment, upgrade, backup, restore, and disaster recovery.
- `.github/workflows/`, `mise.toml`, and `justfile`: pinned tooling and shared local/CI tasks.

A reasonable default is Debian 13 on an OVHcloud VPS with monthly, no-commitment billing, plus Cloudflare DNS. Verify availability, pricing, CPU performance, RAM, and disk capacity against player count, simulation distance, and mods. Preserve memory for the OS and backups.

OpenTofu should own cloud resources; Ansible should own host configuration; Kamal should own container lifecycle. Protect the world disk against accidental destruction, while recognizing that deletion safeguards are not backups.

## Host, network, and secrets

Install Docker, configure log rotation, time synchronization, security updates, monitoring, and disk-space alerts. Require SSH keys; restrict administration through a VPN or trusted source addresses. Schedule disruptive maintenance.

Expose only Minecraft TCP port 25565 publicly. Keep RCON private and password-protected. Verify Docker-published ports against the effective firewall.

Create a DNS-only `A` record such as `mc.example.com`; ordinary Cloudflare HTTP proxying does not carry Minecraft traffic. Publish `AAAA` only after IPv6 connectivity and filtering work. Use `_minecraft._tcp` SRV only when needed for another port.

Use SOPS/age for repository secrets, encrypted OpenTofu state, and protected CI credentials. Keep independently recoverable decryption keys outside the VPS and repository. Never expose plaintext secrets through logs, artifacts, or rendered configuration.

## Deployment and upgrades

Pin the image digest, exact Minecraft version, server distribution, and applicable mod/plugin versions. Do not use `latest` or an automatic updater. Record the complete version set alongside each backup.

Initial deployment must wait for the operator’s explicit EULA acceptance. Do not pre-enable acceptance in templates or CI.

For each upgrade:

1. Review compatibility and announce downtime.
2. Block new connections, stop gracefully, and confirm the old writer has exited.
3. Create and verify an off-host backup before changing versions.
4. Start the pinned replacement against the persistent directory, with no rolling overlap.
5. Check readiness, logs, and actual client join, building, inventory persistence, and restart behavior.

If unsuccessful, stop the replacement and restore the **matching pre-upgrade data and software versions**. Never run an older server against an upgraded world.

## Backups and recovery

Back up all persistent `/data`, including dimensions, player data, permissions, configuration, and mods. Prefer scheduled stopped-server backups initially: downtime makes consistency straightforward.

Use encrypted restic backups to independent off-host object storage, with retention, deletion protection, restricted credentials, and failed-backup/freshness alerts. VPS snapshots are supplementary.

Before launch and periodically thereafter, restore into an isolated directory or replacement VPS. Verify archive integrity, permissions, startup, and representative player/world state. Prevent restored copies from becoming a second production writer. Record recovery time and backup age.

## CI and authorization boundaries

Expose non-mutating `just check` and pinned `just ci-test` using `act`. Validate configuration and run disposable lifecycle tests without production credentials. Real Minecraft startup tests require operator-approved EULA handling.

`act` cannot prove GitHub permissions, protected environments, cloud identity, or live recovery. Production workflows should be manually dispatched, serialized without cancellation, reject stale requests, and preserve encrypted infrastructure state after partial failures.

No commands were executed or licenses accepted. Provisioning, DNS changes, deployment, production restores, and EULA acceptance require separate authorization.
```

### treatment-library-1

Source: variant 1; treatment; scenario `library`; sample 1. UTC: `2026-11-06T18:43:09.492Z` to `2026-11-06T18:44:02.771Z`. Response: 629 words.

User-prompt SHA-256: `e60d0bcbe6126d4ea7bfe0b39804678ff14ab0bdcd82d5eeb31629b6d1d042e5`.

Output SHA-256: `3fa43342d73538a0707737e217241a4754f0ff0f3c5318018b09397355b5ea8d`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/library/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/library/docs/releasing.md` (offset=null, limit=null).

```text
I cannot write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-library-1.md` with the available read-only tools. Findings follow. No files were changed and nothing was published.

## Recommended stack

Use one standalone repository and package, with no workspace, application framework, Docker service stack, or hosting infrastructure.

- **TypeScript**, strict mode; **tsdown** for JavaScript and declaration output.
- **Vitest** for parser tests; **ESLint** and **Prettier** for static checks and formatting.
- **pnpm**, with a committed lockfile. Pin Node, pnpm, just, and optional act through **mise**; pin project tools through package dependencies.
- **just** as a small command interface over native tools, shared by local development and CI.
- **Changesets** for reviewed version bumps and generated changelog entries.
- No runtime dependencies unless parsing requirements genuinely warrant one.

Include an explicit open-source license, README documenting the parsing contract, and contribution/security reporting instructions. The license requires the owner’s choice.

## Package contract and tests

Start **ESM-only**, with generated declarations, explicit `exports` entries for types and imports, and a `files` allowlist containing only intended distribution files. Declare supported Node versions. Add CommonJS only for an identified consumer requirement; dual publishing creates additional compatibility obligations.

Define units, whitespace, fractions, negative values, repeated units, invalid-input behavior, overflow, and output precision before implementation. Test accepted inputs, rejected inputs, complete consumption, numeric boundaries, and JavaScript callers passing non-string values.

Validate the **actual npm tarball**:

1. Build and pack once.
2. Run **publint** and **Are the Types Wrong**, configured for the declared ESM-only contract.
3. Install the tarball into an isolated temporary consumer outside the repository.
4. Compile imports using TypeScript’s NodeNext resolution and execute representative calls in Node.
5. Inspect the packed file list for missing declarations, source tests, secrets, and accidental development files.

Test supported Node lines in CI. Add bundler/browser smoke coverage only if browser compatibility is promised.

## Task commands and workflow

| Command | Purpose |
|---|---|
| `just check` | Non-mutating formatting, lint, typecheck, unit tests, workflow validation |
| `just format` | Apply formatting |
| `just build` | Clean distribution build |
| `just pack` | Build and create a tarball |
| `just test-consumer` | Pack, validate, and exercise the isolated consumer |
| `just test-packed` | Validate an existing tarball without rebuilding |
| `pnpm changeset` | Record a user-visible change and SemVer bump |
| `pnpm version:prepare` | Apply Changesets versioning and refresh the lockfile |
| `just ci-test` | Run only credential-free CI locally through act |

Review version, changelog, and lockfile changes together. Parsing behavior changes can break consumers and deserve corresponding SemVer treatment.

GitHub Actions should run frozen-lockfile installation and these same checks on pull requests and main. Use read-only permissions, commit-SHA-pinned actions, and dependency-update PRs. Local act testing needs Docker and a documented compatible, digest-pinned runner image. It cannot verify GitHub protections, npm identity, or provenance.

## Explicit secure release path

1. Keep publication disabled until an owned package name, metadata, license, and release authorization are established.
2. Bootstrap an absent npm package only through a separately authorized, interactive 2FA publication of the reviewed, tested tarball.
3. Configure npm trusted publishing for the exact GitHub repository, workflow, and protected release environment. Use short-lived OIDC, public-package provenance, and no long-lived npm token fallback.
4. Release only by explicit dispatch from a reviewed default-branch revision. Serialize releases without cancelling active publication.
5. Build, pack, and test in an unprivileged job. Retain the tarball, source revision, and integrity digest. After environment approval, publish those exact bytes with lifecycle scripts disabled.
6. On uncertainty, inspect registry version and integrity. Retry only a confirmed-absent version using the retained artifact. Never rebuild a retry or replace published contents.

**Uncertainty:** npm bootstrap rules, trusted-publisher requirements, supported tool versions, and GitHub protection availability need verification before implementation. Account changes, protection configuration, bootstrap, and publication each require explicit authorization.
```

### treatment-state-recovery-1

Source: variant 1; treatment; scenario `state-recovery`; sample 1. UTC: `2026-11-06T18:43:16.646Z` to `2026-11-06T18:44:05.987Z`. Response: 655 words.

User-prompt SHA-256: `0819c2d4cbdbecf06db84caed6d329f7b99a937ef9b5ee0a1cc8f453e0d41bc0`.

Output SHA-256: `e435c343b1d2273678a7ea3008e7326443a6a9057f0c631ede856fab9922b631`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).

```text
I can’t write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-state-recovery-1.md` with the available read-only tools. Findings follow.

## Immediate recovery

**Freeze production applies. Do not rerun from Git’s old state or apply locally.** Resources changed despite the failed run. Stale state can cause duplicate creation, incorrect replacement, or lost ownership.

1. Disable new apply dispatches and hold queued runs. Preserve the failed runner/workspace if available; do not cancel an active apply blindly.
2. Preserve the run’s exact configuration commit, tool versions, logs, exit status, and newest state, including any emergency state file. Treat emergency files as potentially plaintext until verified. Keep plaintext out of Git, logs, caches, and ordinary artifacts.
3. Secure a recoverable, encrypted copy immediately in an approved restricted recovery location. Record its checksum and originating run. Encryption alone does not make unrestricted artifact storage acceptable.
4. In a trusted recovery environment, inspect state lineage, serial, resource identities, and encryption metadata. Compare against current main and any later runs. A higher serial alone does not establish authority across different lineages.
5. If main advanced only through unrelated changes and its state is unchanged from the failed run’s starting state, commit the recovered encrypted state onto current main using a normal fast-forward push. Preserve unrelated changes. Never force-push or text-merge encrypted state.
6. If state also advanced, stop automatic persistence. Reconcile competing snapshots and actual resource identities under an incident owner. If the newest state is lost, reconstruct using provider inventory and explicit imports in an authorized CI recovery workflow. Refresh alone cannot discover resources absent from state.
7. After durable state recovery, run a fresh CI plan against current main. Review partial operations, replacements, and deletions before authorizing another CI apply. Persist any reconciliation changes too.

## CI workflow changes

- Use manual dispatch, protected production approval, and one concurrency group per state/environment spanning **apply through persistence**. Disable cancellation of running applies. A persistence failure must leave a durable freeze that outlives the job.
- After acquiring serialization, fetch current main and reject stale requested revisions. Generate the plan from that configuration/state; never apply a stale saved plan.
- Before applying, verify decryption, required credentials, protected-branch write access, and recovery storage access. These checks reduce risk but cannot guarantee a later push.
- Always attempt state preservation after partial failure. Preserve the original apply exit status; persistence failure must also fail the workflow.
- On push rejection, fetch main and retry a state-only commit only after verifying the remote state has not changed. Bound retries; otherwise freeze and escalate.
- Protect state writes and recovery workflows from untrusted pull requests. Grant narrowly scoped repository permissions and short-lived cloud credentials.
- Document that Git commits and cloud changes are not atomic. Runner loss still requires a tested recovery path.

## Bootstrap and key recovery

Provision protected CI access, branch-write authorization, secret decryption, native state-encryption keys, and recovery storage **before** production use. Record any bootstrap resources and import them where appropriate.

Avoid circular recovery: the only decryption key or credential must not live inside the state or encrypted repository it unlocks. Maintain independently accessible, access-controlled recovery copies of required keys, passphrases, historical key versions, and encryption configuration. Test restoration from a clean environment. Rotate keys without making historical state unreadable.

## Tests without cloud charges

Use temporary Git repositories and OpenTofu’s built-in `terraform_data`, with no cloud credentials or providers:

- Successful apply and controlled failure after an earlier resource changes.
- Concurrent unrelated main commits, push rejection, state conflict, and exhausted persistence retries.
- Runner loss with and without a recoverable snapshot.
- Stale dispatch rejection and freeze enforcement.
- Missing/wrong keys, encrypted emergency-state handling, historical-key recovery, and clean-environment restore.

Use sandbox CI to verify actual permissions and concurrency; local tests cannot establish those guarantees.

**Uncertainty and authorization:** Runner survival, emergency-file encryption, later state writes, and branch protections are unverified. Recovery access, state replacement/imports, workflow changes, and production applies require the appropriate existing authorization. No infrastructure operations or tests were performed.
```

### treatment-v2-stateless-1

Source: variant 2; treatment; scenario `stateless`; sample 1. UTC: `2026-11-06T18:51:50.824Z` to `2026-11-06T18:52:36.394Z`. Response: 618 words.

User-prompt SHA-256: `d3b1cc0c7c6159b245d13f9648c25b7df1e368a5f1df981ea48d92c7b8f87de2`.

Output SHA-256: `afe430d545c6b8cf0c31099e538491d395eb007297d0a09370e5ac3d902aa336`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/docs/operations.md` (offset=null, limit=null).

```text
I can provide the recommendation, but the available tools cannot write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v2-stateless-1.md`. No files were changed.

## Recommended application stack

Use **strict TypeScript, React, and Vite**, producing static browser assets. Keep checklist state in React memory; refreshing the page clears it. Do not add localStorage, cookies, accounts, an API, or a database.

React is more machinery than plain DOM code, but its standard Vite template and predictable state handling are reasonable for a checklist that may grow slightly. Avoid Next.js: server rendering and a production Node process provide no benefit here. Use plain CSS and native form controls rather than a component library.

## Reproducible developer setup

Use:

- **mise** to pin Node LTS, pnpm, just, and operational CLI versions.
- **pnpm**, with committed `pnpm-lock.yaml` and frozen dependency installation.
- **just** for short, discoverable recipes invoking existing tools directly.
- **ESLint**, **Prettier**, and TypeScript’s compiler.
- **Playwright** for browser behavior.

Commit exact tested tool versions, configuration, and lockfiles. Pin container base images by digest and GitHub Actions by commit SHA. Update these deliberately; reproducibility should not mean permanently freezing security updates.

Keep one repository, one application package, and ordinary `src/`, `tests/`, and deployment configuration directories. No monorepo, task graph, custom shell scripts, or local Docker development environment is needed.

## Tasks and local checks

Expose these through `just`:

| Task | Purpose |
|---|---|
| `install` | Frozen pnpm install |
| `dev` | Vite development server |
| `check` | Type checking, ESLint, formatting verification |
| `format` | Apply formatting separately |
| `build` | Production Vite build |
| `test-browser` | Playwright against the production build |
| `ci-test` | Run the unprivileged CI check job with pinned act |

Test adding an item, toggling completion, removing an item, rejecting blank input, keyboard operation, and state disappearing after reload. Exercise desktop and mobile-sized Chromium. Add unit tests only when nontrivial isolated logic appears; duplicating this small browser suite would add maintenance without much value.

Document Playwright’s browser/system-library prerequisites. Pin an act-compatible runner image, but treat act as a local rehearsal, not proof of GitHub permissions or production access.

## CI and production deployment

Use **GitHub Actions**. Pull requests run frozen installation, checks, production build, and browser tests without production secrets.

For the paid VPS, recommend **one Debian 13 OVHcloud US VPS in Vint Hill, monthly with no commitment**, subject to current availability and price. A small instance is sufficient for serving static assets; do not imply high availability.

Use clear ownership:

- **OpenTofu:** VPS and Cloudflare DNS.
- **Ansible:** host configuration, Docker, security updates, bounded logs, and firewall.
- **Kamal:** application container, HTTPS proxy, health checks, and rollback.

Serve Vite’s output from a small **Caddy container**, with TLS terminating at Kamal’s proxy. No application Node runtime or database container is required. This operational stack costs more setup than manually copying files, but makes host replacement reproducible without bespoke deployment scripts.

After trusted `main` checks pass, build once in CI, publish to GHCR, and deploy the existing image by digest. Serialize deployments; retries and rollbacks reuse retained artifacts.

## Safety, uncertainty, and authorization

Keep infrastructure applies manually dispatched, serialized, and separate from application deployment. Use SOPS/age for secrets and native-encrypted OpenTofu state with independent recovery keys. Persist state after partial failures; if persistence fails, stop and reconcile before retrying.

Restrict SSH, verify host fingerprints independently, expose only HTTP/HTTPS publicly, and retain console recovery access. Monitor public HTTPS externally. There is no application data to back up, but configuration, state, keys, and rollback images still need recovery arrangements.

Provider pricing, capacity, Debian availability, domain ownership, and GitHub protection features remain unverified. Purchasing, provisioning, DNS changes, registry publication, host configuration, and deployment require explicit authorization. None was performed.
```

### treatment-v2-stateless-2

Source: variant 2; treatment; scenario `stateless`; sample 2. UTC: `2026-11-06T18:51:50.910Z` to `2026-11-06T18:52:34.877Z`. Response: 612 words.

User-prompt SHA-256: `ec4dd2f1718480156152747cc5e10a8129d99d4633f4c32b2e2f6347341355dd`.

Output SHA-256: `bc276ac55820f735566ab75ec5a8dae38400f73833d37a0a65291ea3878ff2a5`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/docs/operations.md` (offset=null, limit=null).

```text
I cannot write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v2-stateless-2.md` with the available read-only tools. No files or infrastructure were changed.

## Recommended stack

Use **strict TypeScript, React, and Vite** in one standalone repository. Keep checklist state in React memory: refreshing or closing the page clears it. Do not add localStorage, IndexedDB, cookies, accounts, API endpoints, or a service worker.

React is modest overhead for this app, but provides familiar state handling and accessible UI composition. Vite produces static files; production needs no Node server. Skip Next.js, a database, workspaces, and a component framework.

## Developer tooling and reproducibility

Use:

- **mise** for exact developer-tool versions.
- **pnpm** for dependencies, with an exact package-manager version and committed `pnpm-lock.yaml`.
- **just** as a thin task interface.
- **ESLint**, **Prettier**, **Vitest/Testing Library**, and **Playwright** for checks.

Commit `.mise.toml`, `justfile`, configuration files, lockfiles, the Dockerfile, and operational configuration. Select currently supported releases during setup, then record exact versions rather than `latest`. Pin production base images by digest and GitHub Actions by commit SHA.

Use native commands directly in short recipes. Avoid custom bootstrap scripts, task frameworks, and wrapper programs. Document prerequisites that mise cannot supply, particularly Docker and Linux browser libraries.

## Task interface

Expose these tasks consistently:

| Task | Purpose |
|---|---|
| `just install` | `pnpm install --frozen-lockfile` |
| `just dev` | Start Vite |
| `just check` | Typecheck, lint, formatting check, component tests |
| `just format` | Apply formatting |
| `just build` | Produce production assets |
| `just install-browser` | Install the pinned Playwright browser |
| `just test-browser` | Build and test the production app |
| `just ci-test` | Run unprivileged CI locally through pinned `act` |

Keep `check` non-mutating. Formatting should be explicit. Avoid placing application-specific logic in recipes.

## Local verification and CI

Test adding an item, toggling completion, any supported removal action, whitespace-only input, keyboard operation, and refresh clearing all state. Use component tests for focused behavior; use a small Playwright suite against the production build at desktop and mobile sizes.

GitHub Actions should run the same tasks on pull requests and main. Browser jobs should use a Playwright image matching the installed package version. Add native workflow/configuration validation as those files appear.

Keep PR jobs free of production secrets. Local `act` checks verify the check job, not GitHub permissions, protected environments, or live deployment behavior.

## Production VPS

Use one **Debian 13 VPS**, with **OVHcloud US/Vint Hill** as the initial provider choice and Cloudflare DNS. Start with the smallest currently available suitable plan; approximately 2 vCPU and 2–4 GB RAM is ample. Build elsewhere.

Serve the compiled files from a pinned **Caddy container**, deployed through **Kamal**, with TLS terminated by Kamal’s proxy. Use `/up` for health checks. Publish only HTTP/HTTPS; restrict SSH to trusted administrator/runner addresses. Configure security updates and bounded logs.

For reproducible provisioning, use **OpenTofu for VPS/DNS**, **Ansible for host configuration**, and **Kamal for containers**. These introduce maintenance overhead, but replace bespoke provisioning and deployment scripts with established tools and explicit ownership.

## Releases, recovery, and authorization

After successful main checks, build once, publish a commit-addressed image, and deploy that existing image. Serialize deployments, retain rollback images, and reuse artifacts for retries. Never overwrite a published version.

Use SOPS/age for operational secrets, native-encrypted OpenTofu state, and independently recoverable keys. Infrastructure applies should be manually dispatched, serialized CI operations using current main. Persist state even after partial failure; stop and reconcile if persistence fails.

No checklist-data backups are needed. Host replacement still requires configuration, secrets, state, and registry recovery.

**Uncertainty:** pricing, capacity, OS availability, exact versions, and GitHub protection/static-egress support remain unverified. Purchasing, provisioning, DNS changes, publishing, host configuration, and deployment each require explicit authorization.
```

### treatment-v2-stateless-3

Source: variant 2; treatment; scenario `stateless`; sample 3. UTC: `2026-11-06T18:51:50.903Z` to `2026-11-06T18:52:44.767Z`. Response: 642 words.

User-prompt SHA-256: `ba719a68847b8dc42e9989c7192b1d2727da3ac9f54a920e35c751d5f3520cb9`.

Output SHA-256: `8e296653510b83903acf1fed5e8703096f67bf4cd72839d84e2f21756277a5f7`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `skills/tracking-tasks/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/docs/operations.md` (offset=null, limit=null).

```text
I can provide the findings, but the available tools are read-only, so I cannot save them to `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v2-stateless-3.md`.

## Recommended application stack

Use **React, Vite, and strict TypeScript**, producing a static site. Keep checklist state in React memory so refreshing or closing the page clears it. Do not add local storage, cookies, authentication, an API, a database, or a server-rendering framework.

React is somewhat more machinery than plain JavaScript for this screen, but provides conventional state handling, accessible component patterns, and established testing tools without requiring custom application infrastructure.

Use native HTML form controls, explicit labels, and keyboard-operable interactions. No component library or router is necessary.

## Developer tooling and tasks

Use:

- **mise** for exact Node.js, pnpm, just, and operational tool versions.
- **pnpm**, with a committed lockfile and frozen dependency installation.
- **ESLint and Prettier** for linting and formatting.
- **just** as a thin command interface over native tools.

Keep one repository with application source, tests, configuration, and deployment files. Avoid workspaces, a monorepo framework, generated wrappers, or a separate scripts directory.

Expose short recipes:

| Task | Purpose |
|---|---|
| `just install` | Frozen dependency installation |
| `just dev` | Vite development server |
| `just check` | Type checking, linting, formatting verification, unit tests |
| `just format` | Apply formatting |
| `just build` | Production static build |
| `just test-browser` | Playwright against the production build |
| `just ci-test` | Run the unprivileged CI checks locally with act |

Keep checks non-mutating. Commit exact tool versions, dependency locks, and required configuration. Document browser system dependencies and the initial mise installation separately. GitHub Issues is sufficient if task tracking becomes useful; do not introduce Beads by default.

## Tests and local verification

Use **Vitest and React Testing Library** for meaningful checklist behavior, such as rejecting blank entries and toggling completion. Avoid testing framework internals.

Use **Playwright** for a small desktop/mobile Chromium suite covering adding an item, keyboard operation, completion, and clearing state after reload. Test the built application rather than relying only on Vite’s development server.

Smoke-test the production container with native Docker and HTTP commands. Verify the page, health endpoint, and missing assets. Do not create a custom test harness.

## CI

Use **GitHub Actions** on pull requests and main. Invoke the same just tasks used locally. Pin actions to commit SHAs and use a Playwright image matching the installed Playwright version.

Pin **act** through mise for local workflow rehearsal. Keep its runner image explicitly compatible with the workflow. Local act runs must exclude publishing, deployment, and production credentials; they cannot verify GitHub permissions or environment protections.

After successful main checks, build one production image, publish it to GHCR, and deploy that artifact. Record its digest, retain rollback versions, and reuse existing artifacts for retries.

## Small-VPS production setup

Use one **Debian 13 VPS**, initially targeting **1–2 vCPU and 1–2 GB RAM**, with builds performed in CI. OVHcloud US with monthly no-commitment billing is a reasonable candidate; verify actual plans and pricing.

For reproducible operations, use **OpenTofu for VPS/DNS**, **Ansible for host configuration**, and **Kamal for container deployment and HTTPS**. Serve the static files with a small Caddy container; no production Node.js process is needed.

This operational stack outweighs the application itself, but avoids maintaining provisioning and deployment scripts. Keep recipes as direct tool invocations, without custom orchestration.

Use SOPS/age for committed encrypted secrets, independently recoverable keys, and encrypted infrastructure state. Infrastructure applies should be manually dispatched, serialized, and stop for reconciliation after state-persistence failures. Restrict SSH, enable security updates, bound logs, and monitor public HTTPS. No application-data backup is needed.

## Uncertainty and authorization

Provider availability, current prices, domain ownership, GitHub protection features, and production access remain unverified. A single VPS permits downtime. Purchasing, provisioning, DNS changes, host configuration, publishing, and deployment require explicit authorization; this recommendation authorizes none of them.
```

### treatment-v2-stateless-4

Source: variant 2; treatment; scenario `stateless`; sample 4. UTC: `2026-11-06T18:52:34.887Z` to `2026-11-06T18:53:23.049Z`. Response: 608 words.

User-prompt SHA-256: `af69c016433da0a23a15aff8a3950290691777210a58703cfb56fa01674b0618`.

Output SHA-256: `1503bad05c7b22d3f75ef83918fe37e296450596cd098ef195a5f3dd61fb3be6`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/docs/operations.md` (offset=null, limit=null).

```text
I can’t write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v2-stateless-4.md`: this session exposes only read tools. No files were changed. The recommended contents follow.

## Application

Use **React, Vite, and strict TypeScript**, producing a static `dist/` directory. Keep checklist state in React memory so refreshing or closing the page resets it. Avoid localStorage, cookies, service workers, accounts, APIs, and databases.

React is somewhat more machinery than plain DOM code, but provides a conventional, maintainable foundation for checklist interactions. Vite supplies development and production builds without custom bundling. Skip routing and a global state library.

## Developer tooling and tasks

Use:

- **mise** for exact tool versions.
- **pnpm**, with an exact version and committed `pnpm-lock.yaml`.
- **ESLint and Prettier** for linting and formatting.
- **Playwright** for browser tests.
- **just** as the consistent task entry point.

Keep ordinary ecosystem configuration in the repository. Use short just recipes that directly invoke tools, without helper scripts or a custom task framework.

Define these tasks:

| Task | Purpose |
|---|---|
| `just install` | Frozen-lockfile dependency installation |
| `just dev` | Vite development server |
| `just check` | Type checking, lint, formatting verification |
| `just format` | Apply formatting |
| `just build` | Production build |
| `just install-browser` | Install the pinned Playwright browser |
| `just test-browser` | Test the production build |
| `just ci-test` | Run safe CI checks locally through pinned act |

Document clean-machine prerequisites, including Docker for act and Playwright’s Linux system libraries. Pin a compatible act runner image separately from act itself.

## Checks and CI

Use GitHub Actions on pull requests and `main`, invoking the same just tasks developers run locally.

Check types, lint, formatting, production build, and browser behavior. Playwright should cover adding a task, toggling completion, keyboard operation, empty-input handling, narrow-screen usability, and state disappearing after reload. Add unit tests only when meaningful standalone logic emerges.

Pin Actions by commit and browser/container dependencies by version or digest. Give pull-request jobs read-only permissions and no production secrets.

Local act runs provide workflow feedback; they cannot prove GitHub permissions, environment protections, registry authentication, or production deployment.

## Production on one small VPS

Use **Debian 13 on one monthly, no-commitment OVHcloud US VPS**, subject to current availability and pricing. Start with roughly **1–2 vCPU and 2 GB RAM**, serving static assets rather than building on the VPS. One server means downtime during host failure or some maintenance.

For reproducible ownership:

- **OpenTofu:** VPS and Cloudflare DNS.
- **Ansible:** host configuration, Docker, bounded logs, security updates, firewall, and SSH.
- **Kamal:** application container deployment, health checks, HTTPS proxy, and rollback.
- **Caddy container:** serve Vite’s built assets behind Kamal’s proxy.

This operational toolchain is substantial relative to the app, but supplies established provisioning and deployment behavior without inventing shell orchestration. Do not add Kubernetes, a database, or local Compose services.

Expose only HTTP/HTTPS publicly; restrict SSH to trusted administration and deployment sources. Keep independent console recovery access. Monitor public HTTPS and disk usage.

## Releases, secrets, and recovery

Build once in CI after successful `main` checks. Publish a commit-addressed image, retain its digest, and deploy that existing artifact. Serialize deployments; retries and rollback reuse retained images.

Use SOPS/age for encrypted operational secrets and native OpenTofu state encryption, with independent recovery keys. Keep infrastructure applies manual, CI-only, serialized, and separate from application deployment. Persist state after partial failures; freeze further applies if persistence fails.

## Uncertainty and authorization

Live VPS pricing, capacity, Debian availability, domain ownership, and GitHub protection/runner capabilities remain unverified. Ordering resources, changing DNS, configuring hosts, installing production credentials, publishing images, and enabling deployment require explicit authorization. No production operations or verification were performed.
```

### treatment-v2-stateless-5

Source: variant 2; treatment; scenario `stateless`; sample 5. UTC: `2026-11-06T18:52:36.403Z` to `2026-11-06T18:53:25.320Z`. Response: 633 words.

User-prompt SHA-256: `dc5beb0fc8a4da6dd86d1294f2f20f168b0aa87807b55dc6ea03c114ec50675d`.

Output SHA-256: `1ae72663931a617aae9c814c682e4a6dd801d4b7fe5a92490e9c8d5e434a79b9`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/docs/operations.md` (offset=null, limit=null).

```text
## Recommendation

Use **React, Vite, and strict TypeScript**, producing static files served by **Caddy** on one small VPS. Keep checklist state exclusively in React memory: refreshing or closing the page clears it. No API, database, accounts, cookies, localStorage, or service worker.

React is more than this checklist strictly requires, but provides established component tooling without requiring a server framework. Vite supplies standard development and production builds. Avoid Next.js and server rendering here.

### Developer tooling and tasks

Use **mise** to pin Node.js LTS, pnpm, just, and operational tools. Commit exact dependency versions through `pnpm-lock.yaml`, and use frozen installs in CI. Pin container base images by digest and GitHub Actions by commit SHA.

Use **just** as a thin command catalogue, with direct native-tool invocations rather than custom scripts:

| Task | Purpose |
|---|---|
| `just install` | `pnpm install --frozen-lockfile` |
| `just dev` | Vite development server |
| `just check` | TypeScript, ESLint, Prettier check, component tests |
| `just format` | Apply formatting explicitly |
| `just build` | Produce Vite’s static output |
| `just test-browser` | Playwright against the production build |
| `just ci-test` | Run the unprivileged CI check job locally with act |

Commit the mise configuration, justfile, lint/format configuration, tests, workflows, and deployment configuration. Document prerequisites that mise does not supply, particularly Docker and Playwright’s Linux system libraries.

### Checks and CI

Use **ESLint, Prettier, Vitest with React Testing Library, and Playwright**.

Keep tests small and behavioral: adding an item, rejecting blank input, toggling completion, deleting items, keyboard operation, and clearing state on reload. Exercise a desktop and mobile-sized browser. Avoid duplicating every browser scenario in component tests.

Use **GitHub Actions** for pull requests and `main`:

- Frozen dependency installation, `just check`, production build, and browser tests.
- A maintained Playwright image matching the installed Playwright version.
- Read-only permissions for PR checks; no production secrets.
- Native configuration validation for workflows, infrastructure, and host configuration.

Pin **act** through mise and document a compatible runner image. Local act runs are useful feedback, but cannot establish GitHub environment approvals, permissions, registry access, or production connectivity.

### Production deployment

Use one **Debian 13 VPS**, initially targeting **2 vCPU and 2–4 GB RAM**. Prefer OVHcloud US/Vint Hill with monthly no-commitment billing if its current catalog and your location requirements fit. Use Cloudflare for DNS.

For reproducible ownership:

- **OpenTofu:** VPS and DNS.
- **Ansible:** Docker, firewall, SSH hardening, security updates, bounded logs.
- **Kamal:** application containers, HTTPS proxy, health checks, deployment and rollback.

Build a multi-stage image containing only the compiled site and Caddy. Let Kamal’s proxy terminate HTTPS. Do not run Vite or Node.js in production. Expose a health endpoint and ensure nonexistent assets return 404.

After successful trusted-main checks, build once in CI, publish to GHCR, and deploy the same retained image. Use a full-commit tag with overwrite restrictions or a verified digest; retries and rollbacks reuse artifacts. Serialize deployments and reject superseded queued revisions.

Use **SOPS/age** for encrypted credentials, with independent offline recovery keys. Keep infrastructure, host, and application credentials separate. Infrastructure applies should be manually dispatched, serialized, and approval-protected. Use OpenTofu-native encrypted state; persist state after partial failures and stop further applies if persistence fails.

This operational stack costs more setup than the app itself, but avoids bespoke provisioning and deployment scripts. No application-data backups are needed. Retain source, configuration, encrypted infrastructure state, recovery keys, and rollback images. One VPS means maintenance and host failure can cause downtime; add external HTTPS monitoring.

### Uncertainty and authorization

Current pricing, capacity, Debian availability, domain ownership, GitHub protection features, and runner access remain unverified. Purchasing, provisioning, DNS changes, secrets installation, publishing, and deployment require explicit authorization. None has been performed.

**Output limitation:** No file-writing tool is available, so I could not save these findings to `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v2-stateless-5.md`.
```

### treatment-v2-existing-1

Source: variant 2; treatment; scenario `existing`; sample 1. UTC: `2026-11-06T18:52:44.775Z` to `2026-11-06T18:53:22.630Z`. Response: 485 words.

User-prompt SHA-256: `72e7a999d5ead9c2db699dedc2ecbfe992d189366b7e2a2f035a487c706aa15d`.

Output SHA-256: `b0066d3cca95c9ecde857ecf2fd86459280c0bac3a61c012a47115ebfdfb3471`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=1, limit=2000).
- `prompts/system.md` (offset=1, limit=2000).

```text
I can provide the findings, but cannot save them to `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v2-existing-1.md`: this session exposes only read-only file tools.

## Recommendation

**Keep npm, Make, GitHub Actions, and the managed hosting provider. Change only the formatting check and its existing invocation path.** The defect is CI mutating source files instead of rejecting formatting violations. A tooling migration adds unrelated risk and cannot be justified within two hours without migration approval.

### Smallest repair

Inspect the existing formatting script, Make target, and workflow to find where write mode is introduced.

- If a non-mutating formatting command already exists, have CI call it through the existing task structure.
- Otherwise, add a check command using the installed formatter’s supported check mode, preserving its current configuration, ignore rules, and file scope.
- Keep the mutating formatting command available for local fixes.
- Ensure failure reaches GitHub Actions: no ignored Make errors, `|| true`, or `continue-on-error` on the required check.

For example, **if the formatter is Prettier**, retain `prettier . --write` for local formatting and use `prettier . --check` for CI. An npm script such as `format:check` can be invoked by the existing Make check target. Avoid introducing a new task layer solely for this repair.

Do not change dependency versions, the lockfile, hosting, release workflows, or unrelated formatting.

## Verification

Use a disposable checkout or worktree and the project’s existing Node/npm setup. Install from the committed lockfile with `npm ci`, after checking for lifecycle scripts that could trigger external operations.

1. **Passing case:** Run the exact npm/Make entry point CI will use against correctly formatted source. Confirm exit status zero and no source or tracked-file changes.
2. **Failure case:** Introduce one known formatting violation in an included TypeScript file. Capture that file’s contents or checksum, then run the same entry point. Confirm a nonzero exit status, a useful diagnostic, and unchanged file contents. A dirty Git diff alone cannot prove the command did not rewrite an already-modified fixture.
3. **Recovery:** Run the existing local formatting command on that fixture, then rerun the check. Confirm it passes.
4. **Workflow wiring:** Review the workflow to ensure it invokes the checked entry point and preserves failures. If authorized later, run the checks-only GitHub job and confirm the same result. Do not trigger deployment or publishing to verify formatting.

Use existing test/build checks if shared task wiring changes. No new test framework or workflow emulator is warranted.

## Scope, uncertainty, and authorization

The service’s files have not been supplied or inspected, so the formatter, exact flags, script names, and workflow coupling remain uncertain. The Prettier commands above are conditional examples.

Reserve the two hours for tracing the invocation, making the narrow repair, and proving pass, fail, and non-mutation behavior. Standardizing package management, task execution, or hosting needs a separate proposal, migration rationale, rollback plan, and explicit authorization.

This recommendation authorizes no implementation, deployment, publishing, or infrastructure operation. No changes or verification commands were performed.
```

### treatment-v2-monorepo-1

Source: variant 2; treatment; scenario `monorepo`; sample 1. UTC: `2026-11-06T18:53:22.642Z` to `2026-11-06T18:54:15.162Z`. Response: 643 words.

User-prompt SHA-256: `153e5a6bc53b18f0abed87270ea8c5884facec61badccc9418d2e07e4b2a9b18`.

Output SHA-256: `7fd7dd8fe7d9ff3ebf12ed90f234ef534208f00ecafe4382cd9b3f0d4960c9f3`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=1, limit=2000).
- `skills/verifying-end-to-end/SKILL.md` (offset=1, limit=2000).
- `skills/writing-documentation/SKILL.md` (offset=1, limit=2000).

```text
I can provide the recommendation, but the available tools are read-only, so I cannot write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v2-monorepo-1.md`.

## Recommended architecture

Use **React/Vite, Go, PostgreSQL, and River**, deployed with **Kamal to one Debian VPS**. PostgreSQL holds application data, queued jobs, and durable report results. River provides established PostgreSQL-backed retries without Redis or a custom queue.

Start with approximately **2 vCPU and 4 GB RAM**, subject to report memory and CPU measurements. A single VPS is a deliberate availability trade-off.

### Repository and tooling

- `apps/web/`: React, strict TypeScript, Vite, Vitest, Playwright.
- `cmd/api/`, `cmd/worker/`: separate Go entry points, sharing one root Go module.
- `internal/`: application logic, HTTP handlers, River workers, database access.
- `db/migrations/`, `db/queries/`: goose migrations and sqlc queries, using pgx.
- `ops/`: deployment and host configuration.

Use Go’s standard HTTP router. Build the frontend into the API’s static assets, avoiding another production server. Build one immutable image containing both Go binaries and migration tooling.

Pin tools with mise; use pnpm workspaces and committed lockfiles. Avoid Nx, Turborepo, and custom task orchestration initially.

## Durable request processing

`POST /reports` should validate input and atomically insert the report record and River job in one PostgreSQL transaction. Return `202` with a report ID and status URL.

Scope an idempotency key to the authenticated requester, enforce uniqueness, and reject key reuse with different input. Authorize status and result reads.

Workers must tolerate repeated execution: River provides **at-least-once processing**, not exactly-once effects. Atomically persist the result and completed status; retries should detect completed reports. Use bounded exponential backoff, attempt limits, execution deadlines, graceful shutdown, and an operator-visible failed state with deliberate retry.

Store bounded results in PostgreSQL initially. Large artifacts would require a separately designed storage and backup policy.

## Tasks and CI

Expose ordinary recipes through just:

- `just check`: non-mutating formatting checks, lint, type checks, unit tests, generated-code drift.
- `just format`: formatting and other explicitly mutating fixes.
- `just integration`: real PostgreSQL, migrations, API, and worker.
- `just build`: frontend and Go production builds.
- `just ci-test`: checks, integration tests, and builds without publishing or production credentials.

GitHub Actions should call these same recipes. Pin act and document a compatible runner image for local CI rehearsal; act does not validate GitHub permissions or environment protections.

On main, build and publish an image once, then deploy that exact digest after checks. Deployment retries reuse the artifact.

## Local integration tests

Use Docker Compose for PostgreSQL and disposable application services. Test through HTTP and a real worker:

1. Submit, poll with a deadline, retrieve the result, restart services, and retrieve it again.
2. Repeat submission and job execution without duplicate results.
3. Inject transient failures and terminate a worker mid-job; verify recovery.
4. Exhaust retries and verify failure visibility.
5. Verify cross-user access denial.
6. Exercise fresh migrations and upgrades from the previous release.

Add one Playwright journey through the actual UI, API, worker, and database.

## Deployment and recovery

Use Kamal’s API and worker roles, TLS proxy, and PostgreSQL accessory with persistent storage. Expose only HTTPS and restricted SSH. Bound worker concurrency and database connections.

Use OpenTofu for VPS/DNS and Ansible for host setup, with distinct ownership. Keep secrets in SOPS/age, protect bootstrap credentials, and maintain independently recoverable keys. Serialize manually authorized infrastructure changes; persist encrypted state even after partial failures.

Serialize application deployments. Apply backward-compatible **expand migrations** before rollout; backfill separately and contract only after older binaries and queued job formats are retired. Roll back application images only while schemas remain compatible.

Back up PostgreSQL off-host with pgBackRest and WAL archiving. Test restoration into an isolated database before launch. Monitor backup age, disk, queue age, failed jobs, and HTTP health.

**Uncertainty and authorization:** report size, workload, recovery objectives, provider capacity, and budget remain unspecified. Provisioning, DNS changes, registry publication, secret installation, and production deployment require explicit authorization. No checks or operational changes were performed.
```

### treatment-v2-minecraft-1

Source: variant 2; treatment; scenario `minecraft`; sample 1. UTC: `2026-11-06T18:53:23.058Z` to `2026-11-06T18:54:11.806Z`. Response: 670 words.

User-prompt SHA-256: `4fdaea6eb1befb8579dd1b920b2a11ffc987ef74edcb2f5b3517d6b9cb9c4db7`.

Output SHA-256: `508dd5bb0fbb45fcd39fa6a0667ab8149b9073e4e84b5a803cf29fd12f8dcd5b`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).

```text
I can’t write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v2-minecraft-1.md` with the available read-only tools. Findings follow.

## Recommended architecture

Use one VPS running Debian 13, Docker, and the established `itzg/minecraft-server` image. Start with vanilla Java unless plugins or mods are required. Use one persistent host directory, such as `/srv/minecraft/data`, mounted at `/data`, with exactly one server process allowed to write it.

A standalone repository should contain `infra/`, `ansible/`, deployment configuration, encrypted secrets, and operator runbooks. Pin operational tools with mise and expose short tasks through just. Avoid Kubernetes and custom deployment frameworks for one server.

## Provisioning and host setup

- Prefer a monthly, no-commitment OVHcloud VPS near players, subject to current availability. Prioritize strong single-core performance, SSD storage, and sufficient memory beyond the Java heap. Exact sizing depends on concurrent players, view distance, and mods.
- Use OpenTofu for the VPS, provider firewall, and Cloudflare DNS; Ansible for host configuration; Kamal for container lifecycle. Configure Minecraft as a single-instance accessory without HTTP proxying or overlapping rolling deployments.
- Configure key-only administrative access, restricted sudo, time synchronization, security updates, log rotation, disk alerts, and Docker startup. Schedule reboot-requiring maintenance.
- Expose TCP 25565 publicly. Restrict SSH through a VPN or trusted source addresses. Keep RCON private and authenticated. Account for Docker’s firewall behavior rather than assuming host firewall rules block published container ports.

## Versions and deployment

Pin the image by digest, Minecraft version, server distribution, and compatible Java runtime. Pin plugin/mod artifacts and checksums when applicable. Never use `LATEST` or unattended game upgrades.

Initial deployment should verify storage mounts, permissions, secrets, backup credentials, and recovery access before starting the server. Enable online authentication and a whitelist.

For each upgrade:

1. Announce downtime and block player access.
2. Flush saves and stop the server cleanly.
3. Create and verify an off-host pre-upgrade backup, recording the matching configuration and image digest.
4. Test the upgrade against an isolated restored copy, without production credentials.
5. Start the production upgrade while access remains restricted; check logs, world loading, and an actual client connection.
6. Reopen access only after validation.

Rollback requires the old image **and its matching pre-upgrade data**. Never open an upgraded world with an older server version. Once players resume, rollback can discard their new progress and needs an explicit recovery decision.

## DNS and secrets

Use a Cloudflare DNS-only A record for `play.example.com`; add AAAA only after verifying IPv6 connectivity and filtering. Ordinary Cloudflare HTTP proxying does not carry Minecraft traffic. Use an SRV record only if players need a nondefault port without typing it.

Store secrets with SOPS/age. Keep decryption keys, provider bootstrap credentials, and backup recovery keys outside Git, with independently recoverable copies. Separate infrastructure credentials from deployment credentials. Inject plaintext only into restricted runtime files; exclude it from logs and artifacts.

## Backups and recovery

Use encrypted restic backups to independent object storage with retention protection where supported. Back up the entire persistent server directory and record matching versions. Prefer scheduled stopped-server backups for straightforward consistency; live backups require tested save-flush coordination and guaranteed save re-enablement.

Set explicit retention and monitor backup age, failures, repository integrity, and disk capacity. Regularly restore onto an isolated replacement host and verify startup plus recognizable world content through a client.

**Absolute zero loss cannot be guaranteed by periodic backups.** Agree on acceptable recovery-point and recovery-time objectives; if losing even recent changes is unacceptable, additional storage durability and replication design is required.

## CI and authorization

GitHub Actions should invoke the same local checks as `just check`. Pin `act` and a compatible runner image; provide `just ci-test` without production secrets or deployment steps. Test recovery and single-writer behavior separately from syntax checks.

Production applies and upgrades should be manually dispatched, serialized, and protected. Persist encrypted infrastructure state after partial failures; halt further applies if persistence fails. Local workflow testing cannot prove GitHub permissions or live cloud behavior.

No commands were run or licenses accepted. Purchasing infrastructure, changing DNS, deploying, destructive recovery, and accepting the Minecraft EULA require explicit authorization. Current provider offerings and upstream compatibility remain unverified.
```

### treatment-v2-library-1

Source: variant 2; treatment; scenario `library`; sample 1. UTC: `2026-11-06T18:53:25.330Z` to `2026-11-06T18:54:07.601Z`. Response: 633 words.

User-prompt SHA-256: `bdfe63dc12ba6e89dc9b00a65383dd89f7299aa8bed96bb7a544e987952ccfac`.

Output SHA-256: `84bddf0113876301171aed9c4749e2d5d291ff338d9b7fb072ddbf0081c6a36d`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/library/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/library/docs/releasing.md` (offset=null, limit=null).

```text
I can’t write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v2-library-1.md` with the available read-only tools. Findings follow. No files were changed or publication attempted.

## Recommended tooling

Use one standalone repository and package, with no workspaces, hosted infrastructure, container deployment, or runtime dependencies.

- **mise** pins Node, pnpm, just, actionlint, and act. Commit the pnpm lockfile and declare the package-manager version.
- **Strict TypeScript**, **tsdown** for JavaScript and declarations, **Vitest** for behavior, and **ESLint plus Prettier** for static checks.
- **just** provides short commands shared by developers and CI.
- **Changesets** records semantic-version intent and generates the changelog. For one package, use manual version-preparation PRs rather than a release bot.

Recommend ESM-only initially. Add CommonJS only for an identified consumer requirement, since dual packaging increases compatibility and testing obligations.

## Package contract and tests

Use explicit `exports` with declaration and ESM entry points, `"type": "module"`, and a `files` allowlist covering distribution files and intended documentation. Include an approved open-source license, repository metadata, supported Node versions, and documented browser requirements. Keep `"private": true` until publication is explicitly authorized.

Define parsing behavior before implementation: units, whitespace, signs, fractions, repeated terms, return units, invalid-input errors, and numeric limits. Test valid combinations, complete-input consumption, empty input, unknown units, JavaScript non-string arguments, and overflow.

Test the **packed npm tarball**, not merely source imports:

1. Build and pack once.
2. Run **publint** and **Are the Types Wrong** against it, using settings consistent with ESM-only support.
3. Install it into a temporary project outside the repository, without source aliases or inherited dependencies.
4. Compile a strict TypeScript consumer and execute the emitted JavaScript through public package imports.
5. Check representative parsing successes and errors, exported symbols, and packaged contents.

Exercise the oldest supported Node line and the current supported LTS line. Add browser execution only if browser support is advertised.

## Commands and workflow

| Command | Purpose |
|---|---|
| `just check` | Non-mutating formatting, lint, typecheck, unit tests, actionlint |
| `just format` | Apply formatting |
| `just build` | Clean distribution build |
| `just pack` | Build and produce a local tarball |
| `just test-consumer` | Pack, validate, compile, and execute isolated consumer |
| `just test-packed` | Validate an existing tarball without rebuilding |
| `just ci-test` | Run credential-free checks locally with act |
| `pnpm changeset` | Record a user-visible change and bump |
| `pnpm version:prepare` | Update version, changelog, and lockfile for review |

PR CI uses frozen installs and these same tasks. Pin Actions to reviewed commit SHAs; grant checks only read permissions and no publishing credentials.

Pin act and document a compatible runner-image digest and architecture. Docker is needed only for this optional workflow rehearsal. Local act cannot prove GitHub approvals, permissions, OIDC, or npm provenance.

## Explicit secure release path

1. Review and merge version/changelog preparation separately from publication approval.
2. Require manual release dispatch from an approved default-branch revision. Serialize releases without cancelling an active publication.
3. In an unprivileged job, check, build, pack, and validate once. Retain the tarball with source revision and SHA-512 integrity.
4. Require approval through a protected release environment. Give only the publisher job OIDC permission; use npm trusted publishing and provenance, without a long-lived token.
5. Publish that exact verified tarball with lifecycle scripts disabled. Do not rebuild during publication.
6. On uncertain results, inspect registry version and integrity first. Retry only an affirmatively absent version using the retained bytes. Never overwrite published content; corrections require a new version.

## Uncertainty and authorization

Package name ownership, license choice, compatibility requirements, GitHub protection availability, and current npm trusted-publisher prerequisites remain unverified. Initial package creation may require separately authorized interactive authentication before trusted publishing can be configured. Repository changes, account configuration, and every actual publication require explicit authorization. Dry runs do not establish registry acceptance or identity.
```

### treatment-v2-state-recovery-1

Source: variant 2; treatment; scenario `state-recovery`; sample 1. UTC: `2026-11-06T18:54:07.614Z` to `2026-11-06T18:55:00.854Z`. Response: 661 words.

User-prompt SHA-256: `77be963841d69cd62e021740964f8a56ab2ee596a3dc44a6b7756b8d50d88ea4`.

Output SHA-256: `472e703e9867c2d698e11d35db757944611428b96b2225e7f200b217fc66cade`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/verifying-end-to-end/SKILL.md` (offset=null, limit=null).

```text
I cannot write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v2-state-recovery-1.md` because the available tools are read-only. Findings follow.

## Immediate recovery

**Freeze production applies. Do not rerun against Git’s old state or apply locally.** The failed apply may have created or changed resources absent from that state. Repeating it risks duplicates, destructive changes, and lost resource ownership.

1. Disable apply dispatch and queued runs without interrupting any active recovery/state-persistence operation. Establish one recovery owner and retain the failed runner if still available.
2. Preserve the failed run’s configuration SHA, input versions, provider lockfile, logs, exit status, and latest working state, backups, and any emergency state file. Treat every state file as sensitive until encryption is verified. Quarantine plaintext securely; never upload it as an ordinary artifact.
3. Recover the **latest post-attempt state**, including changes preceding the failure. Verify decryption, expected lineage, serial progression, resource identities, and correspondence to the failed run. Do not assume Git, a backup, or an artifact is authoritative merely because it exists.
4. Publish recovered encrypted state through an authorized, state-only recovery commit atop current main. If main advanced only in unrelated files and its state is unchanged from the failed run’s starting state, retry the commit without rerunning apply. If state also changed, stop and reconcile competing writers. Never text-merge state or force-push main.
5. If post-attempt state is unavailable, keep applies frozen. Inventory actual resources through authorized read operations and reconstruct ownership using reviewed imports/state repairs in recovery CI. Refresh alone cannot discover everything missing from state. Avoid deletion or recreation as a shortcut.
6. Once authoritative state is durable, use current main configuration to produce a fresh CI plan. Review partial completion and configuration changes before authorizing another apply.

## CI workflow changes

- Use manually dispatched, protected production CI with one concurrency group per state across **all** apply/recovery workflows. Disable cancellation of active runs. Reject stale dispatches; check out current main only after acquiring the lock.
- Bind approval and saved plans to configuration SHA, state version, inputs, and tool/provider versions. Invalidate them when those inputs change.
- Preserve state after both successful and failed applies. Keep the original apply failure visible even when persistence succeeds.
- Retry rejected state commits independently of apply: fetch main, confirm the predecessor state is unchanged, and create a state-only fast-forward commit. Conflicting state updates trigger a durable apply freeze.
- Retain recoverable, immutable encrypted state checkpoints independently of Git, with restricted access, retention, integrity metadata, and tested retrieval. An `always()` upload cannot guarantee recovery after runner loss; document the remaining loss window.
- Treat persistence failure as an incident, not a retryable deployment failure. Automatic apply retries remain disabled until reconciliation.

## Bootstrap and key recovery

Before production use, establish repository/environment protections, serialized CI access, scoped cloud credentials, permitted state-commit credentials, and a verified initial state.

Recover **repository-secret decryption and OpenTofu state decryption independently**. Document exact encryption configuration, key derivation metadata, key versions, identities, and dependencies. Neither recovery path may depend solely on secrets encrypted by the lost key or infrastructure requiring the inaccessible state.

Keep separately controlled recovery copies of required keys/configuration, test restoration in an isolated environment, and retain historical decryption capability when rotating keys. Prefer short-lived CI cloud credentials; exclude secrets and plaintext state from logs, caches, and ordinary artifacts.

## Tests without cloud charges

Use disposable local Git repositories, ephemeral test keys, OpenTofu’s built-in `terraform_data` resources, and no cloud credentials; block cloud access.

Test partial apply failure, encrypted-state recovery, unrelated-main push rejection and retry, conflicting-state rejection, persistence failure blocking subsequent applies, stale dispatch rejection, concurrent writers, and interrupted-run recovery. Verify recovered state supports a fresh plan without unintended recreation.

Test encryption enforcement, wrong/missing keys, historical-key recovery, and absence of plaintext in retained outputs. Local CI emulation cannot prove hosted permissions or concurrency protections.

**Uncertainty and authorization:** Runner survival, artifact availability, encryption configuration, and branch protections are unverified. Recovery publication, imports/state mutation, key-policy changes, and resumed production applies require designated operational authorization. No infrastructure operations or tests were executed.
```

### treatment-v3-stateless-1

Source: variant 3; treatment; scenario `stateless`; sample 1. UTC: `2026-11-06T19:01:40.431Z` to `2026-11-06T19:02:41.636Z`. Response: 607 words.

User-prompt SHA-256: `a685abfaa0203d70a477d8b92a0c7aaa72df22870e11579aa4f694b539c9fc44`.

Output SHA-256: `471e669e4c972e6ba6c57e39e52a9053fef71cea9afe05d5197acbb31a419154`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/tracking-tasks/SKILL.md` (offset=null, limit=null).

```text
I couldn’t write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v3-stateless-1.md`: this session exposes only read-only tools. The findings follow.

## Recommendation

Use **React, Vite, and strict TypeScript**, producing a static site. Keep checklist state in React memory: refreshing or closing the page clears it. No API, database, authentication, localStorage, service worker, or application server is needed.

React provides straightforward state handling and accessible component composition; Vite supplies established development and build commands. Avoid Next.js and server-rendering infrastructure for this workload.

## Repository, tools, and tasks

Use one repository containing the app, tests, and deployment configuration. No monorepo tooling or separate packages.

- **mise:** pin exact versions of Node’s current supported LTS, pnpm, just, and operational tools.
- **pnpm:** commit `pnpm-lock.yaml`; use frozen-lockfile installation in CI.
- **ESLint and Prettier:** ordinary checked-in configurations.
- **Playwright:** browser-level tests. Add Vitest only if substantial pure logic emerges.
- **just:** expose short recipes invoking existing tools directly. Avoid custom shell programs or a second orchestration layer.

Suggested task interface:

| Task | Purpose |
|---|---|
| `just setup` | Install locked dependencies and required Playwright browser |
| `just dev` | Start Vite |
| `just format` | Apply formatting |
| `just check` | Check formatting, lint, type-check, build, and run browser tests |
| `just ci-test` | Run the checks job locally through pinned `act` |
| `just build` | Produce production assets |

`check` must not rewrite source files. Document a compatible, digest-pinned runner image for `act`; local emulation does not verify GitHub permissions or production access.

Use GitHub Issues only when tracking becomes useful. Do not introduce Beads or another tracker for this tiny initial scope.

## Checks and CI

Test the actual built interface: add an item, toggle completion, remove it, reject empty input, operate controls by keyboard, and confirm refresh clears state. Include a narrow-screen check. These tests cover the product boundary more effectively than numerous component snapshots.

Use GitHub Actions on pull requests and main. Install the pinned toolchain, install dependencies with the lockfile, and run the same `just check` task. Pin third-party actions to commit hashes; configure automated dependency-update proposals.

Build a production container containing only static assets and an established unprivileged HTTP server. Test that container over HTTP. Publish and deploy the **same verified image**, identified by immutable digest; retries and rollback reuse existing images. Never embed secrets in Vite variables: browser-delivered configuration is public.

## Small-VPS production setup

Use one small **Debian 13 VPS**, initially evaluating OVHcloud’s US/Vint Hill monthly, no-commitment offering, with Cloudflare DNS. A small single-vCPU machine is a reasonable starting point; confirm current availability, price, architecture, and memory requirements before purchase.

Use established tools with distinct ownership:

- **OpenTofu:** VPS and DNS resources.
- **Ansible:** host configuration, Docker, security updates, SSH access, and firewall.
- **Kamal:** immutable application containers, health checks, HTTPS ingress, and deployment rollback.

This introduces operational tooling, but avoids maintaining bespoke provisioning and deployment scripts. Do not add Kubernetes, a database, application volumes, or an observability platform. Provider metrics, container logs with rotation, and an external HTTPS availability check are sufficient initially.

Keep credentials in SOPS/age-encrypted configuration and infrastructure state encrypted. Back up recovery keys independently. Application data needs no backup; deployment configuration, infrastructure state, and recovery access do.

Infrastructure applies should be manually dispatched, serialized protected CI jobs using current main. Preserve encrypted state even after partial failure; stop further applies if state persistence fails. Application deployment can follow successful main checks separately, without infrastructure credentials.

## Uncertainty and authorization

Traffic, domain ownership, provider availability, exact supported versions, and budget remain unverified. This is a recommendation only. Purchasing resources, changing DNS, configuring credentials, publishing images, and deploying require explicit authorization.
```

### treatment-v3-stateless-2

Source: variant 3; treatment; scenario `stateless`; sample 2. UTC: `2026-11-06T19:01:40.423Z` to `2026-11-06T19:02:29.678Z`. Response: 627 words.

User-prompt SHA-256: `118ec7410a6c968c43e2060375f1da0055cc25f0af190d90046ce2f03571baae`.

Output SHA-256: `8b9f801d185ed9f51d9f7249179692193da7c9bd500f9a314f209a7157aaef65`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/docs/operations.md` (offset=null, limit=null).
- `skills/verifying-end-to-end/SKILL.md` (offset=null, limit=null).

```text
I can provide the findings, but the available tools are read-only, so I cannot save them to `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v3-stateless-2.md`.

## Recommended stack

Use **React, Vite, and strict TypeScript**, producing static HTML, CSS, and JavaScript. Keep checklist state in React memory only: refreshing or closing the page discards it. Do not add localStorage, cookies, service workers, authentication, APIs, or a database.

React is more than this checklist strictly needs, but provides familiar, maintainable interaction handling. Vite supplies development and production builds without custom bundling. Avoid Next.js and server rendering because there is no server-side application behavior.

## Developer tooling and repository

Use one repository and one application package, without workspaces.

- **mise** pins Node’s supported LTS release, pnpm, just, and operational tools.
- **pnpm** manages dependencies with a committed `pnpm-lock.yaml` and frozen installs.
- **just** exposes short recipes calling native tools directly.
- **ESLint, Prettier, Vitest, and Playwright** cover code quality and behavior.

Commit exact tool versions, dependency lockfiles, configuration, and setup instructions. Pin container base images by digest and GitHub Actions by commit SHA. Update these deliberately. Docker, Git, and browser-system-library prerequisites must be documented separately; a version manager does not reproduce the operating system.

Avoid generated helper scripts and custom orchestration.

## Tasks and local checks

Provide these predictable entry points:

| Task | Purpose |
|---|---|
| `just install` | Frozen dependency installation |
| `just dev` | Vite development server |
| `just check` | Type checking, lint, formatting check, focused unit tests |
| `just format` | Apply formatting separately |
| `just build` | Production static build |
| `just test-browser` | Playwright against the production build |
| `just ci-test` | Run unprivileged CI checks locally using pinned act |

Browser tests should exercise adding, completing, and removing items; empty-input handling; keyboard interaction; narrow-screen usability; and refresh clearing state. Avoid duplicating those cases in component tests. Use Vitest where isolated logic genuinely warrants it.

Smoke-test the production container through HTTP too, including its health endpoint and missing-asset responses.

## CI

Use GitHub Actions on pull requests and `main`. Run frozen installation, the same local checks, production build, and browser tests. Give PR jobs read-only permissions and no production secrets.

Pin a compatible act runner image and keep its job free of publishing and deployment. Document that act cannot verify GitHub permissions, protected environments, registry access, or production connectivity.

After successful checks on trusted `main`, build the production image once, publish it to GHCR, and deploy that existing artifact. Record its digest. Retries and rollbacks reuse retained images rather than rebuilding or overwriting released tags.

## Production VPS

Use one **Debian 13 VPS**, initially targeting **1–2 vCPU and 1–2 GB RAM**, with monthly no-commitment billing. OVHcloud US/Vint Hill is a concrete provider starting point; current plans, pricing, availability, and regional suitability remain unverified.

Serve the static build with **Caddy inside a container**, behind **Kamal’s HTTPS proxy**. Build in CI, never on the VPS.

For reproducibility, keep ownership distinct:

- **OpenTofu:** VPS and Cloudflare DNS.
- **Ansible:** Docker, restricted SSH, firewall, bounded logs, and security updates.
- **Kamal:** application deployment, health checks, and rollback.

Use SOPS/age for committed encrypted secrets and OpenTofu-native encryption for Git-stored infrastructure state. Infrastructure changes should be manually dispatched, serialized, and CI-only. Persist state after partial failure; stop and reconcile before retrying if persistence fails.

This operational tooling is the main maintenance cost of requiring a VPS. No application-data backups are needed, but retain recovery keys, configuration, and release images independently. A single VPS permits downtime.

## Authorization and uncertainty

No implementation or operational checks were performed. Ordering, provisioning, DNS changes, host configuration, publishing, and deployment require explicit authorization. Domain ownership, budget, provider availability, GitHub protection features, trusted deployment access, and independent recovery access must be established before production work.
```

### treatment-v3-stateless-3

Source: variant 3; treatment; scenario `stateless`; sample 3. UTC: `2026-11-06T19:01:40.346Z` to `2026-11-06T19:02:33.274Z`. Response: 603 words.

User-prompt SHA-256: `db423ca67e956c6902fe02bb4130c6fbdc69ac23b4f06dd0908649faf69f2950`.

Output SHA-256: `46186a601b6fb48931ee7cc46677bd15ce67552ae8f50ca7e3f4451867747be6`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/tracking-tasks/SKILL.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/docs/operations.md` (offset=null, limit=null).

```text
I cannot write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v3-stateless-3.md` with the read-only tools available. The recommendation follows.

## Recommended stack

Use **strict TypeScript, React, and Vite**, producing static HTML, CSS, and JavaScript. Keep checklist state in React memory: refreshing or closing the page clears it. Do not add localStorage, cookies, analytics, a database, or server-side rendering.

React is slightly more machinery than this screen requires, but provides familiar state handling and accessible component composition without imposing a backend. Vite supplies the development server and production build.

Use one repository and one package. No monorepo, dedicated issue-tracking system, or local Docker environment is necessary.

## Developer tooling and tasks

Use **mise** to pin Node.js LTS, pnpm, just, and operational tools. Commit exact versions rather than floating aliases. Commit `pnpm-lock.yaml` and use frozen installs in CI.

Use **just** for short, transparent recipes calling established tools directly:

| Task | Purpose |
|---|---|
| `just install` | Frozen pnpm installation |
| `just dev` | Vite development server |
| `just check` | TypeScript, ESLint, Prettier check |
| `just format` | Apply formatting |
| `just build` | Production build |
| `just test-browser` | Playwright against the production build |
| `just ci-test` | Run the unprivileged CI check job with act |

Keep checks non-mutating and formatting separate. Avoid custom shell/JavaScript wrappers, generated task frameworks, and duplicated task definitions. Document mise installation and Playwright’s platform prerequisites.

## Local verification and CI

Use **Playwright** for a small browser suite covering adding an item, rejecting blank input, toggling completion, keyboard operation, and clearing state on reload. Exercise desktop and mobile-sized Chromium. Add unit tests only if meaningful standalone logic emerges.

Use **GitHub Actions** on pull requests and `main`, invoking the same just tasks. Run frozen dependency installation, checks, production build, and browser tests. Pin actions to commit SHAs and keep the Playwright package and browser image versions aligned.

Pin **act** and a compatible runner image for local workflow checks. Its local job must exclude publishing, deployment, production secrets, and privileged infrastructure access. Passing act does not establish GitHub environment protections or production connectivity.

## Small-VPS production setup

Use **one Debian 13 VPS**, initially around **1–2 vCPU and 1–2 GB RAM**, subject to the provider’s actual offerings. This static application needs little capacity. OVHcloud US is a reasonable concrete candidate; confirm current monthly pricing, availability, region, and Debian support before ordering.

Serve the built files with **Caddy**, managed by systemd, using automatic HTTPS. Node.js is unnecessary on the server.

Use:

- **OpenTofu** for the VPS and DNS, with a supported encrypted, locking remote state backend.
- **Ansible** for Caddy, deployment directories, key-only SSH, firewall rules, bounded logs, and security updates.
- **SOPS/age** for any repository-stored secrets, with recovery keys retained independently.

These tools have distinct ownership and avoid bespoke provisioning scripts. Ansible’s Python dependency is operational tooling; no custom Python is needed.

Build once in CI. Publish a commit-addressed static artifact, then deploy that exact artifact into a versioned directory using native transfer commands. Switch Caddy’s served release only after upload completes; retain the previous release for rollback. Never rebuild on the VPS or overwrite a published release.

## Operations, uncertainty, and authorization

Restrict public ports to HTTP/HTTPS and SSH from trusted administration sources. Verify SSH fingerprints independently, preserve provider-console access, and configure external HTTPS monitoring. No application-data backup is needed; source, infrastructure state, credentials, and recovery keys still require protection.

Validate HTTPS, checklist interactions, refresh behavior, and rollback after deployment. One VPS permits downtime during host failure or maintenance.

No live catalog, pricing, or configuration was verified. Purchasing, provisioning, DNS changes, credential installation, artifact publishing, and deployment require explicit authorization.
```

### treatment-v3-stateless-4

Source: variant 3; treatment; scenario `stateless`; sample 4. UTC: `2026-11-06T19:02:29.689Z` to `2026-11-06T19:03:14.065Z`. Response: 633 words.

User-prompt SHA-256: `6dd320e5a32d649cb144d436bdd43cda556f3137beb53ff14f6ee032e2af9470`.

Output SHA-256: `8e4442021d21471ccee9c4c84e87c8811b3c3a83065b35d6071fcb73fc29c5c9`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/docs/operations.md` (offset=null, limit=null).

```text
I can provide the recommendation, but cannot save it to `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v3-stateless-4.md`: this session exposes only read-only tools. No files were changed.

## Recommended application stack

Use **React, Vite, and strict TypeScript**, producing a static site.

Keep checklist state in React memory. Refreshing or closing the tab clears it. Do not add localStorage, cookies, a database, authentication, API routes, or a server-side framework. State this behavior briefly in the interface so users do not mistake the checklist for saved data.

React is more machinery than this page strictly needs, but provides familiar component and interaction conventions without requiring bespoke DOM-management code. Vite supplies standard development and production-build commands.

## Developer tooling and reproducibility

Use:

- **mise** to pin Node.js and command-line tools.
- **pnpm** with an exact package-manager version and committed `pnpm-lock.yaml`.
- **just** as a discoverable command interface.
- **ESLint**, TypeScript’s compiler, and **Prettier** for checks and formatting.
- **Playwright** for browser tests.

Start with Node.js 24 LTS and compatible stable React/Vite releases. Resolve and commit exact versions during setup rather than depending on floating `latest` versions. Commit tool configuration, application configuration, lockfiles, and a short README.

Keep this a single-package repository. Avoid workspaces, task orchestration frameworks, Git hooks, and custom shell or JavaScript wrappers. Short just recipes should invoke native tools directly.

## Tasks and local checks

Expose these commands:

| Task | Purpose |
|---|---|
| `just install` | Frozen dependency installation |
| `just dev` | Vite development server |
| `just check` | Non-mutating type, lint, and formatting checks |
| `just format` | Apply formatting |
| `just build` | Production build |
| `just install-browser` | Install pinned Playwright browser |
| `just test-browser` | Build and exercise the production preview |
| `just ci-test` | Run the unprivileged CI checks locally through act |

Test adding items, whitespace-only rejection, toggling completion, removing items, keyboard operation, and clearing state after reload. Run at desktop and mobile viewport sizes. Use accessible labels and native buttons/checkboxes.

For this tiny app, browser tests can cover the meaningful behavior; add unit tests only if nontrivial logic emerges.

## CI

Use **GitHub Actions**, calling the same just tasks as developers. Check pull requests and `main` with frozen installation, static checks, production build, and Playwright tests.

Pin Actions to commit SHAs. Pin **act** and document a compatible runner image. Local workflow execution must receive no production credentials; it cannot prove GitHub permissions, environment protections, or actual deployment access.

## Production on a small VPS

Use one **Debian 13 VPS**, initially targeting roughly **2 vCPU and 4 GB RAM**, with **OVHcloud US/Vint Hill** and **Cloudflare DNS** as concrete defaults. This is ample capacity, not a measured requirement. Confirm current availability, monthly no-commitment pricing, and regional suitability before purchasing.

Keep ownership explicit:

- **OpenTofu:** VPS and DNS.
- **Ansible:** host packages, restricted SSH, firewall, security updates, bounded logs.
- **Kamal:** application container, HTTPS proxy, health checks, and rollback.

Serve Vite’s static output from **Caddy inside the application container**. No Node application process or database runs in production. Docker Compose is unnecessary locally because there are no supporting services.

This operational stack adds dependencies, but replaces custom provisioning and deployment scripts with established tools.

Build the image once in CI, retain its immutable digest, and reuse it for deployment, retries, and rollback. Never rebuild or overwrite a published release. Verify public HTTPS and checklist interactions after deployment.

Use SOPS/age for secrets and encrypted OpenTofu state with independently recoverable keys. Infrastructure changes should be manually dispatched, serialized, and preserve state after partial failure; stop if state persistence fails.

**Authorization and uncertainty:** purchasing, provisioning, DNS changes, credential configuration, publishing, and deployment require explicit authorization. No live pricing, provider availability, GitHub plan capabilities, or production behavior has been verified. A single VPS permits downtime; no application-data backups are needed.
```

### treatment-v3-stateless-5

Source: variant 3; treatment; scenario `stateless`; sample 5. UTC: `2026-11-06T19:02:33.284Z` to `2026-11-06T19:03:41.105Z`. Response: 593 words.

User-prompt SHA-256: `94783868bf2f678fbddf3b9c0be643e18b0af076ba33139fef18f03fbe46d190`.

Output SHA-256: `d8ab55a1baff54b070a4114e7ccb868a0f763a5fa9642f41ee01b0f88837a47a`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/README.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/stateless/docs/operations.md` (offset=null, limit=null).

```text
**File status:** I could not write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v3-stateless-5.md`: the available tools are read-only. No files or infrastructure were changed.

## Recommended stack

Use **React, Vite, and strict TypeScript**, producing a static site. Keep checklist state in React memory only: refreshing or closing the page clears it. Do not introduce localStorage, a service worker, accounts, APIs, or a database.

React adds some weight compared with plain TypeScript, but its standard Vite template and straightforward state handling make the project easy to maintain. Use ordinary CSS and semantic HTML; a component library or global state manager would add little value here.

## Developer tooling and tasks

Use **mise** to pin Node LTS, pnpm, and just to exact versions. Commit `pnpm-lock.yaml`, and install dependencies with `pnpm install --frozen-lockfile`. Pin operational tools if introduced.

Use **just** as a small command index, with direct native commands underneath:

| Task | Purpose |
|---|---|
| `just install` | Frozen dependency installation |
| `just dev` | Vite development server |
| `just check` | TypeScript, ESLint, and Prettier verification |
| `just format` | Apply formatting |
| `just build` | Production build |
| `just test-browser` | Playwright against the production build |
| `just ci-test` | Run unprivileged CI checks locally through act |

Keep check tasks non-mutating. Avoid shell/JavaScript wrappers, a monorepo, and a custom task framework. Document bootstrap prerequisites and the exact commands in the README.

## Local checks and CI

Use **Playwright** for the meaningful application tests: adding a task, completing it, removing it, keyboard operation, empty-input handling, and verifying that reload clears the list. Run desktop and mobile-sized Chromium. Add unit tests only when nontrivial standalone logic warrants them.

Use **GitHub Actions** for pull requests and `main`, calling the same just tasks. Require checks, production build, and browser tests before merge. Pin third-party Actions to commit SHAs and declare minimal permissions. Keep production credentials out of PR jobs.

Pin **act** and document a compatible runner image for local workflow rehearsal. It cannot verify GitHub environment protections, publication permissions, or real deployment access.

## Production on a small VPS

For this static-only app, use **one Debian 13 VPS running Caddy under systemd**. Caddy serves the built files and manages HTTPS. Start around **1 vCPU and 1 GB RAM**, subject to the provider’s available plans; build in CI, never on the VPS.

Prefer OVHcloud with monthly no-commitment billing and Cloudflare DNS if there are no existing provider preferences. Confirm current pricing, capacity, location, and Debian availability before purchasing.

Use **Ansible** to declaratively configure Caddy, SSH, firewall rules, security updates, and deployment directories. Its runtime is operational tooling, not application code. Expose only HTTP/HTTPS publicly and restrict SSH. Avoid Docker, Kamal, and a container registry here: static files do not justify that additional operational stack.

Build once in CI, retain a checksum-identified artifact, and deploy that exact artifact into a versioned directory using Ansible’s native modules. Switch Caddy’s current-directory symlink and retain previous releases for rollback. Do not rebuild during retries or overwrite release contents.

Initially, record the VPS purchase and DNS settings rather than adding an infrastructure-state workflow for two rarely changed resources. Add OpenTofu when automated resource recreation becomes a concrete requirement.

## Verification, uncertainty, and authorization

After an authorized deployment, verify public HTTPS, asset loading, checklist interactions, reload behavior, and rollback. Add external uptime monitoring. No application-data backup is needed; retain source, configuration, release artifacts, and independent administrative recovery access.

Provider availability, domain ownership, budget, and GitHub protection features remain unverified. Purchasing, DNS changes, remote configuration, credential installation, and deployment each require explicit authorization.
```

### treatment-v3-existing-1

Source: variant 3; treatment; scenario `existing`; sample 1. UTC: `2026-11-06T19:02:41.643Z` to `2026-11-06T19:03:19.213Z`. Response: 493 words.

User-prompt SHA-256: `2ade4ed6a071f1567f62d10110f24f0a4d2e29931dc8d31c1c0ccd7c587c2c14`.

Output SHA-256: `e7c0e8e7ab330b0ae45273fbc10a3b1e135531de47436b622ad0254036aa6cb9`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `skills/verifying-end-to-end/SKILL.md` (offset=null, limit=null).

````text
## Recommendation

Repair the formatter invocation only. Keep **npm, Make, GitHub Actions, and the managed hosting provider** unchanged. A package-manager, task-runner, or hosting migration is unrelated to this defect, exceeds the two-hour scope, and lacks approval.

The intended contract is simple: **CI reports formatting violations, exits unsuccessfully, and leaves source files unchanged.**

### Smallest repair

Inspect the existing GitHub Actions → Make → npm command chain and identify where write mode is introduced.

- If a non-mutating formatting check already exists, point CI to it.
- Otherwise, add or adjust the smallest existing script or Make target to invoke the installed formatter’s check mode. Keep the developer-facing formatting command available for intentional edits.
- Preserve the existing formatter version, file selection, ignore rules, and configuration.

For example, **if the project uses Prettier**, the relevant distinction is:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

Use the project’s existing paths rather than adopting `.` blindly. Make should invoke the checking script for CI. Do not introduce another task runner, wrapper, dependency, or lockfile.

Also check that Make and the workflow propagate failure: no ignored Make errors, `|| true`, or `continue-on-error` on the required formatting check.

### Verification

Use a disposable local checkout or worktree and the project’s existing setup. Run `npm ci` with the committed lockfile, then exercise the **same entry point GitHub Actions invokes**, including Make if applicable.

1. **Formatted input succeeds.** Run the formatting check against known-formatted files. Expect exit status zero and no source changes.
2. **Unformatted input fails without rewriting.** Deliberately misformat a supported, non-ignored file in the disposable checkout. Record its contents or hash, run the check, and confirm:
   - nonzero exit status;
   - a useful diagnostic identifying the file;
   - identical file contents afterward.
3. **Recovery succeeds.** Run the existing developer formatting command on the fixture, then rerun the check. Expect success without further changes.
4. **Review the full diff.** Only the necessary script, Make target, or workflow lines should change. No dependency, lockfile, application, or hosting changes should appear.

For the failure case, compare against the deliberately modified baseline. A dirty Git status is expected and does not itself prove that the checker edited files.

When authorized, verify the relevant GitHub Actions check on a PR with deployment jobs excluded. Local checks establish command behavior; they do not prove hosted workflow wiring or required-check enforcement.

### Two-hour scope and authorization

Spend the time tracing the invocation, making the narrow repair, and proving success, failure, and non-mutation. Do not use this incident to standardize tooling.

Any migration requires separate authorization, an identified benefit, compatibility assessment, and an appropriately scoped plan. Deployment, publishing, and infrastructure changes are unnecessary for this repair.

**Uncertainty:** The formatter, scripts, Make targets, and workflow have not been inspected, so the Prettier commands are illustrative. No implementation or verification has been performed.

**Output limitation:** The available tools are read-only, so I could not write these findings to `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v3-existing-1.md`.
````

### treatment-v3-monorepo-1

Source: variant 3; treatment; scenario `monorepo`; sample 1. UTC: `2026-11-06T19:03:14.074Z` to `2026-11-06T19:04:09.346Z`. Response: 639 words.

User-prompt SHA-256: `c56819c55a48d053e2080d4621ca79d91da17344c79afec303627c450a1a0472`.

Output SHA-256: `cb530b3d52dc1254496347017659ef06ceed7c4eec70b12751bf6503b2311d0a`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/monorepo/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/monorepo/docs/operations.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/monorepo/docs/recovery.md` (offset=null, limit=null).

```text
## Recommended setup

Use **React/Vite, one Go module, PostgreSQL, and River for PostgreSQL-backed jobs**. Run everything on one Debian VPS with **Kamal**, avoiding Redis, Kubernetes, and custom deployment orchestration. This provides durable queuing with few moving parts; one VPS still means maintenance downtime and no high availability.

### Repository and tooling

- `apps/web`: React, strict TypeScript, Vite, ESLint, Prettier, Vitest, Playwright.
- `cmd/api`, `cmd/worker`, `internal/`: one Go module, standard `net/http`, `pgx`, `sqlc`, and River.
- `db/migrations`, `db/queries`: Goose application migrations and SQL source; River manages its own migrations separately.
- Pin tool versions with **mise**, JavaScript dependencies with **pnpm workspaces and a frozen lockfile**, and Go dependencies with `go.mod`/`go.sum`. Avoid Nx or Turborepo until build scale justifies them.
- Use **just** for short recipes invoking native tools, without a custom task framework.

### Request and durability contract

`POST /api/reports` validates input and atomically inserts the report and River job in one PostgreSQL transaction, then returns `202` with a stable report URL. An idempotency key prevents duplicate submissions after ambiguous network failures.

The worker uses bounded concurrency, timeouts, and River’s retry/backoff and exhausted-job handling. Store results in PostgreSQL under a unique report ID; commit the result and completed status together. Make repeated execution harmless. River provides at-least-once execution, not exactly-once external effects.

`GET /api/reports/{id}` exposes pending, completed, and terminal-failure states. Preserve the ID across refreshes and bound browser polling. Apply authorization to submission and retrieval; an unguessable ID alone is insufficient access control.

### Tasks and CI

Expose `just dev`, `generate`, `format`, `check`, `build`, `test-integration`, `test-browser`, and `test-recovery`. Keep `check` non-mutating, including generated-code drift detection.

GitHub Actions runs those same tasks with frozen dependencies, Go vet/tests, race tests, frontend checks, and real PostgreSQL integration tests. PR jobs receive no production secrets.

After trusted-main checks pass, build API, worker, and web images once, recording their source SHA and digests. Deployment retries and promotion reuse those artifacts; never overwrite a published revision. Serialize production deployments without canceling an active release. Pin `act` and document a compatible runner for local CI rehearsal, while recognizing it cannot verify GitHub permissions or protections.

### Local integration tests

Use Docker Compose for PostgreSQL; run native services during development. Test built images behind the real web gateway with Playwright.

Exercise submission through completion, refresh/retrieval, invalid input, unauthorized access, duplicate requests, retry exhaustion, worker interruption/restart, and API outages. Verify failed transactions leave neither orphan reports nor orphan jobs. Use isolated, disposable databases with guards against production targets.

### Deployment and schema changes

Start sizing around **2 vCPU/4 GB RAM**, subject to report workload measurements. Serve static assets and proxy `/api` through Caddy; expose only HTTPS and restricted SSH. Keep PostgreSQL, API, and worker private, with a persistent database volume.

Use Kamal for containers, Ansible for host configuration, and OpenTofu only for provider resources/DNS. Keep ownership separate. Store secrets with SOPS/age and retain independent recovery keys.

Run migrations once before service replacement, never on every process startup. Use expand/backfill/contract changes, bounded lock waits, and compatibility with old/new services and queued job payloads. Defer destructive changes until rollback compatibility expires. PostgreSQL major upgrades require a separate procedure.

### Recovery and remaining decisions

Back up the entire database, including results, queue, and migration journals, using consistent `pg_dump` snapshots encrypted off-host with restic. Alert on backup age, disk pressure, queue age, failures, and external HTTPS availability. Rehearse restoration into a fresh database and verify completed reports plus pending-job recovery.

Recover failed releases using retained compatible images without automatically reversing schema changes. Persist infrastructure state after partial failures; if persistence fails, stop and reconcile before another apply.

Workload size, authentication, retention, budget, and recovery objectives remain uncertain. Daily backups can lose roughly a day; tighter objectives require WAL archiving/PITR. Provisioning, publishing, deployment, DNS changes, and production recovery require explicit authorization.

**Output limitation:** Only read tools are available, so I could not write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v3-monorepo-1.md`.
```

### treatment-v3-minecraft-1

Source: variant 3; treatment; scenario `minecraft`; sample 1. UTC: `2026-11-06T19:03:19.220Z` to `2026-11-06T19:04:01.629Z`. Response: 667 words.

User-prompt SHA-256: `cbfcf1a14cc45c44659d3a266893bb2deaa9374ccfcea160a1410a1cf03334ba`.

Output SHA-256: `ec5390bbb603df3a6da78c8a0deb54f1e67cb19aa6446202db946becdf6a4d83`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=1, limit=null).
- `skills/choosing-project-tooling/examples/minecraft/README.md` (offset=1, limit=null).
- `prompts/system.md` (offset=1, limit=null).
- `skills/choosing-project-tooling/examples/minecraft/docs/operations.md` (offset=1, limit=null).
- `skills/choosing-project-tooling/examples/minecraft/docs/secrets.md` (offset=1, limit=null).
- `skills/choosing-project-tooling/examples/minecraft/docs/recovery.md` (offset=1, limit=null).

```text
I cannot write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v3-minecraft-1.md` with the available read-only tools. Findings follow.

## Recommended repository and stack

Use a standalone private repository containing OpenTofu infrastructure, Ansible host configuration, Kamal accessory-only deployment, local Docker Compose, backup/recovery runbooks, and GitHub Actions. Deploy the established `itzg/minecraft-server` image directly; no application framework, custom image, registry publishing, Kubernetes, or HTTP proxy is needed.

Keep ownership explicit: OpenTofu manages VPS/DNS/storage, Ansible manages Debian and host services, and Kamal manages the game container. Pin tools with mise and expose short, shared tasks through just.

## Durability requirement

**A single VPS plus periodic backups cannot guarantee zero lost world changes.** Backups protect captured states; crashes can lose subsequent changes. “Cannot lose the world” must distinguish catastrophic world loss from loss of recent progress.

Before production, document acceptable recovery point and recovery time objectives. If literally no committed progress may be lost, this architecture is insufficient without further storage/application-consistency engineering. Do not promise that replication or VPS snapshots alone solve this.

## Provisioning and host setup

Start with one Debian 13 VPS, approximately 4 vCPU and 8 GB RAM, subject to player count, mods, latency, and measured performance. OVHcloud US/Vint Hill is a reasonable default; verify current availability and pricing.

Use manually dispatched, protected, serialized infrastructure workflows against current main. Encrypt OpenTofu state, preserve resulting state after partial failures, and halt further applies if persistence fails. Reconcile provider inventory before retrying uncertain operations.

Ansible should configure Docker, restricted SSH keys, firewall rules, log rotation, security updates, monitoring, and persistent storage outside container lifetimes. Reserve memory and disk headroom for backups and restoration. Test console recovery before disabling bootstrap access. Account for Docker’s firewall bypass behavior, including IPv6.

## Versions, deployment, and upgrades

Pin the exact Minecraft version, compatible Java image release, upstream image digest, and backup image digest. Never deploy `latest` or automatically upgrade on merges.

Keep online authentication and an allowlist enabled. Require personal operator EULA acceptance before any server start; configuration must default to refusal.

For upgrades:

1. Record old image/game/configuration and announce downtime.
2. Exclude concurrent deployment and backup operations.
3. Take and verify a coordinated off-host backup; retain its snapshot independently of normal pruning.
4. Stop gracefully and confirm no remaining world writer.
5. Start the selected image against persistent data; perform bounded protocol checks and authenticated client verification.
6. Resume backup scheduling only after success.

On failure, preserve evidence and data. Never run an older server against an upgraded world. Recovery pairs the old image/configuration with its matching pre-upgrade snapshot.

## DNS and secrets

Use Cloudflare **DNS-only** A records, plus AAAA only when IPv6 is configured and tested. Publish TCP 25565; add SRV only if needed. Keep RCON unpublished and administration source-restricted.

Use SOPS/age with separate infrastructure, host, deployment, and backup identities. Keep plaintext credentials, world data, decrypted state, and logs containing secrets out of Git/artifacts. Independently escrow age identities, state encryption keys, restic keys, and account recovery access.

## Backups and restore verification

Use pinned `itzg/mc-backup` with encrypted restic storage in a private, separately scoped off-host bucket. Coordinate save-off, flush, capture, and save-on; verify failure propagation and saving recovery. A raw copy of a running world is insufficient.

Choose frequency from the recovery objective, monitor snapshot freshness externally, and retain daily/weekly/monthly history plus protected upgrade snapshots. Maintain another independently controlled copy where feasible.

Regularly restore to fresh isolated storage using independently recovered keys and matching versions. Verify repository integrity, then join with a licensed client and inspect recognizable blocks, dimensions, and player state. Confirm the original remains unchanged. Record measured recovery time.

## Local CI and authorization

Run identical non-mutating checks locally and in Actions: formatting, workflow linting, Compose validation, OpenTofu validation, and Ansible/Kamal configuration checks. Pin act and its compatible runner image; run only unprivileged check jobs without production secrets.

Local checks cannot prove cloud permissions, firewall behavior, backup transport, or playable recovery. Those remain unverified. Purchasing, provisioning, credential installation, DNS changes, deployment, live failure drills, and recovery cutover require explicit operational authorization. No commands were executed or licenses accepted.
```

### treatment-v3-library-1

Source: variant 3; treatment; scenario `library`; sample 1. UTC: `2026-11-06T19:03:41.115Z` to `2026-11-06T19:04:23.750Z`. Response: 637 words.

User-prompt SHA-256: `4b217995bb01dc3184190aefcb7ac9e781d249217aa1e3e2859a1a21ad3e7abf`.

Output SHA-256: `6768c91233c72f92d1d3c0913e952758f1bf5781d8982129cb14fa6d84a7d95b`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).
- `skills/verifying-end-to-end/SKILL.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/library/README.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/library/docs/releasing.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/library/CONTRIBUTING.md` (offset=null, limit=null).
- `skills/choosing-project-tooling/examples/library/SECURITY.md` (offset=null, limit=null).

```text
I couldn’t write `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v3-library-1.md`: only read-only tools are available. No files were changed or operations executed.

## Recommended tooling

Use one standalone repository and one package, with no workspaces, hosted services, infrastructure, or application framework.

- **TypeScript strict mode**, **tsdown** for JavaScript and declarations, and **Vitest** for parser tests.
- **pnpm** with a committed lockfile; **mise** pins Node, pnpm, just, actionlint, and act.
- **just** exposes short recipes over native tools. Use ESLint and Prettier for straightforward static checks and formatting.
- Keep runtime dependencies at zero unless parsing requirements justify one.
- Include an explicit open-source license, README, contributor instructions, and private vulnerability-reporting guidance.

Default to ESM-only with an ES2022 target and explicit supported Node versions. CommonJS support adds packaging and testing obligations; add it only for an identified consumer requirement.

## Task commands

These are proposed commands, not existing implementation claims:

| Command | Purpose |
|---|---|
| `just check` | Non-mutating formatting, lint, typecheck, unit tests, actionlint |
| `just format` | Apply formatting separately |
| `just build` | Clean JavaScript/declaration build |
| `just pack` | Build and create an npm-installable tarball |
| `just test-consumer` | Pack, validate, and exercise an isolated consumer |
| `just test-packed` | Validate an existing tarball without rebuilding |
| `just ci-test` | Run credential-free checks locally through act |
| `pnpm changeset` | Describe a user-visible change and select its bump |
| `pnpm version:prepare` | Update version, changelog, and lockfile for review |

## Packaging and tests

Use `type: "module"`, explicit `exports` with declaration and import entries, a deliberate `engines` range, and a `files` allowlist. Include license and usage documentation; exclude tests, credentials, and development artifacts. Keep the package private until publication metadata is reviewed.

Define the parser contract before implementation: units, whitespace, fractions, negative values, overflow, malformed input, and error behavior. Test complete input consumption, boundaries, JavaScript non-string arguments, and unsafe arithmetic.

Run **publint** and **Are the Types Wrong** against the actual tarball. Install that tarball into a temporary project outside the repository, compile TypeScript using the public package import, then execute emitted JavaScript and assert representative parsing results. Source-import tests cannot establish package correctness.

Test every advertised Node line. If advertising browser compatibility, add a small real-browser import smoke test; Node execution alone does not establish it.

## Versioning and CI

Use SemVer and Changesets for reviewed release notes and version preparation. Breaking parsing semantics require a breaking release even when the function signature stays unchanged.

GitHub Actions should run the same local tasks on pull requests and main, using frozen installs, SHA-pinned actions, minimal read permissions, and no publishing credentials or OIDC access.

Pin act and a compatible runner image independently. `just ci-test` should select only the check workflow, without loading production credentials. Docker is needed only for this optional workflow test. act cannot verify GitHub approvals, permissions, npm identity, or provenance.

## Explicit secure release path

1. Separately authorize the package name, license, ownership, and first publication. If npm requires an existing package to configure trusted publishing, bootstrap interactively with 2FA using the verified tarball.
2. Configure npm trusted publishing for the exact repository, release workflow, and protected GitHub environment. Require reviewer approval; avoid long-lived registry tokens.
3. Release only by explicit dispatch from reviewed current main. Serialize releases without cancelling an active publication.
4. Build once in an unprivileged job, test the tarball, and retain it with source SHA and SHA-512 integrity.
5. After approval, publish those exact bytes with lifecycle scripts disabled and provenance enabled. Grant OIDC only to the publishing job.
6. On uncertain failure, inspect registry integrity before retrying. Reuse the retained artifact only when the version is absent; never replace published contents.

Package availability, current npm prerequisites, GitHub protection availability, and live identity integration remain unverified. Their setup and any publication require separate authorization.
```

### treatment-v3-state-recovery-1

Source: variant 3; treatment; scenario `state-recovery`; sample 1. UTC: `2026-11-06T19:04:01.640Z` to `2026-11-06T19:04:58.906Z`. Response: 653 words.

User-prompt SHA-256: `cefd40361e44a92fd612acff990394dc384e4e3dd8172c18cafb9606a656da40`.

Output SHA-256: `24cbd32571b07b140a14ba12e4f73837ea1f4be4aa833ed03a222c0c85c3fc32`.

Read trace:

- `skills/choosing-project-tooling/SKILL.md` (offset=null, limit=null).
- `prompts/system.md` (offset=null, limit=null).
- `skills/writing-documentation/SKILL.md` (offset=null, limit=null).
- `skills/verifying-end-to-end/SKILL.md` (offset=null, limit=null).

```text
I can’t save `/Users/braden/projects/pi-aidan/.superpowers/sdd/2026-11-06-project-tooling-integration/native-trials/baseline-treatment-v3-state-recovery-1.md`: the available tools are read-only. Findings follow.

## Immediate recovery

**Freeze production applies. Neither rerunning from Git’s old state nor applying locally is safe.** Resources changed, so Git is no longer an authoritative record of their ownership. A rerun could duplicate resources, conflict with existing objects, or propose destructive changes.

1. Block queued and new applies. Preserve the failed runner, workspace, logs, and recovery artifacts before cleanup. Record the run ID, configuration commit, original state commit, and apply exit status.
2. Recover the newest state from the failed workspace, OpenTofu’s reported recovery location, or protected artifacts. Preserve every candidate unchanged. Treat state and saved plans as sensitive; only native-encrypted state belongs in Git or ordinary recovery artifacts.
3. Using the pinned OpenTofu version and authorized keys, verify candidate decryptability, lineage, serial, resource identities, and provenance without printing secrets. Serial alone does not establish authority. Compare against Git and the failed run’s evidence.
4. If main changed only unrelated files, create a new commit atop current main containing the **exact recovered encrypted state bytes**. Use a normal fast-forward push. Do not force-push, merge ciphertext, or rerun apply to regenerate state. If the state path changed too, stop and reconcile both histories.
5. Verify the remote commit contains the recovered bytes and that protected CI can decrypt them. Then create a fresh plan from current main and recovered state; review its reconciliation against actual resources before authorizing another CI apply.
6. If state is missing or ambiguous, remain frozen. An authorized CI recovery workflow must inventory resources and reconstruct ownership through reviewed imports/state recovery. Refresh alone cannot rediscover resources absent from state.

## CI changes

- Use one concurrency group per state across **all** apply and recovery workflows, with cancellation disabled. Git-backed local-state locking does not coordinate separate runners.
- Before mutation, durably record an unresolved apply attempt. Block subsequent applies until state persistence is acknowledged. Runner death, cancellation, or missing recovery evidence must fail closed.
- Require protected, manually dispatched production execution from current main. Reject stale requests and invalidate saved plans when configuration or state changes.
- Always attempt state preservation after apply, including nonzero exit. Preserve the apply failure even if state publication succeeds.
- Persist and verify state before marking the operation complete. For unrelated Git advancement, retry publication of the same state blob atop refreshed main. A changed state path requires reconciliation.
- Retain encrypted recovery artifacts with restricted access and sufficient retention; alert on persistence failures. Upload early when possible. Cleanup hooks cannot guarantee recovery after abrupt runner loss: Git and infrastructure mutation are not atomic.
- Enforce native encryption and reject unintended plaintext state. Keep secrets, decrypted state, and sensitive plan output out of logs and ordinary artifacts.

## Bootstrap and key recovery

Seed protected CI identity, repository-write access, state-encryption keys, and repository-secret decryption keys through an independently accessible bootstrap path. They cannot depend solely on decrypting this repository or applying this state.

Maintain separately recoverable, access-controlled offline key backups, ownership records, recovery instructions, and tested restoration. Preserve historical keys needed by Git history and recovery artifacts. Key rotation must cover both current state and retained backups. Repository encryption and state encryption are separate recovery dependencies.

## Tests without cloud charges

Use a disposable local Git remote, synthetic secrets, and OpenTofu’s built-in `terraform_data` resources:

- Successful apply and encrypted-state round trip.
- Resource creation followed by deliberate apply failure; recover and persist resulting state.
- Rejected push after unrelated advancement; verify identical recovered bytes reach main.
- Concurrent state modification; verify publication and further applies stop.
- Lost runner, missing artifact, missing/wrong key, stale dispatch, and competing workflows.
- Clean-room recovery using only backups and documented bootstrap inputs.

No infrastructure operations or tests were run. Exact recovery locations, encryption configuration, and CI protections remain unverified. Production inspection, recovery commits, imports, credential changes, and subsequent applies require explicit operational authorization; local production apply remains prohibited.
```
