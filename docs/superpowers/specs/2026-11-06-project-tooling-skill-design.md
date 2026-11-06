# Opinionated project tooling skill

## Intent

Give Aidan concrete, opinionated recommendations for selecting languages, frameworks, tooling, repository structure, CI/CD, infrastructure, deployment, and publishing. A short skill supplies judgment and defaults; five self-contained runnable reference projects demonstrate complete setups.

Apply the guidance to new projects and relevant work in existing projects. Inspect existing conventions, use these preferences for open choices, and request authorization for consequential migrations. This work changes Aidan's guidance and adds examples; it does not migrate pi-aidan's own tooling.

This design supersedes the overlapping recommendations in `2026-11-06-preferred-stack-design.md`. In particular, use just for tasks, automatic application deployments from main, and Changesets for the example npm library. Historical documents are not active instructions.

## Approaches

The user chose self-contained runnable projects over thin examples backed by shared infrastructure modules, workflows, or a custom scaffolding framework. Some configuration duplication is acceptable: each reference must be understandable and adaptable independently.

Curated blueprints were considered and rejected in favor of working applications and operational configuration. Examples must distinguish exercised behavior from unverified provider or production assumptions.

## Skill structure and discovery

Create `skills/choosing-project-tooling/SKILL.md`, with five reference projects beneath its `examples/` directory. Keep the main skill concise: principles, decision guidance, preferences, and links that identify when each example fits. Load the closest example rather than requiring every reference to be read.

Proposed description:

> Use when selecting or evaluating languages, frameworks, developer tooling, repository structure, task runners, CI/CD, packaging, releases, infrastructure, deployment, secrets, or operational workflows for new or existing projects, including scaffolding projects, adding services, deploying third-party software, and publishing libraries.

Remove the `Project setup and operations` section from `prompts/system.md`. Move its operational guidance into the skill. Preserve universal boundaries about plaintext secrets, immutable releases, and deployment/publishing authorization elsewhere in the system prompt. An automatic deployment workflow may be configured as the preferred design; configuring it does not itself authorize a production deployment.

## Common foundation

- Use mise to pin developer and operational tooling, just to expose tasks, and pnpm for Node/TypeScript dependencies. Use ecosystem-native tools underneath these entry points.
- Prefer established software and native capabilities. Do not introduce custom wrappers, orchestration frameworks, generators, or scripts when ordinary tool configuration and short just recipes suffice. Any indispensable custom code needs a concrete justification.
- Provide non-mutating checks separately from formatting and other mutating tasks. GitHub workflows call the same just tasks used locally.
- Pin act through mise. Expose local workflow testing as `just ci-test`, with a documented compatible runner image. Exercise checks and local builds without publishing, deployment, or production secrets.
- act does not validate GitHub permissions, environment protections, concurrency, or identity integrations. Verify those on GitHub when authorized; never claim local execution proves them.
- Use Docker Compose for warranted local dependencies, not as an additional production deployment system.
- Each reference includes prerequisites, directory orientation, task usage, limitations, bootstrap instructions, and applicable recovery procedures. Application code stays deliberately small but functional.

## Infrastructure and ownership

Use OVHcloud US VPSs, initially in Vint Hill. The user's `VPS Configurator.pdf` is sizing context, not a live catalog or price guarantee. Use monthly no-commitment billing and Debian 13, verifying its current US catalog identifier before provisioning.

Starting sizes, subject to workload verification:

| Reference     | vCPU | RAM   | NVMe           |
| ------------- | ---- | ----- | -------------- |
| Stateless app | 2    | 4 GB  | 40 GB          |
| Stateful app  | 4    | 8 GB  | 75 GB          |
| Monorepo      | 6    | 12 GB | 100 GB         |
| Minecraft     | 4    | 8 GB  | At least 75 GB |

Each deployed reference uses one VPS. High availability, zero data loss, and guaranteed capacity are not claimed. Build images in CI, not on the production server.

OpenTofu owns provider resources and Cloudflare DNS. Ansible owns host configuration. Kamal owns application containers and database accessories. Avoid overlapping ownership. Verify provider schemas, US catalog identifiers, image availability, and ordering behavior against primary documentation. Guard production resources against accidental replacement; an OVH plan change can place a new order.

Ansible covers key-only SSH, restricted administration access, minimal public ingress, Docker-aware firewall rules, security updates with an explicit reboot policy, log rotation, disk monitoring, and bounded container resource use. Retain a tested administrative recovery path before disabling bootstrap access. Use maintained upstream components when appropriate without building a shared custom foundation.

## Secrets, bootstrap, and state

Use SOPS with age for committed secrets. Separate development and production access. Just recipes connect decrypted values to supported tool inputs without leaving ordinary plaintext artifacts. Private age identities remain outside Git, images, logs, and caches. Document recovery copies and credential rotation.

CI's production decryption identity is stored in GitHub secrets, scoped to protected environments where repository capabilities support them. Explain actual protection limitations rather than assuming every GitHub plan supports approvals. Initial OVH access, payment setup, DNS delegation, GitHub settings, and decryption identity installation are explicit bootstrap prerequisites. Automate supported pieces without creating a circular credential dependency.

Use OpenTofu native encryption for committed local-backend state, with the encryption credential supplied through SOPS. Key recovery must not depend on the VPS. No plaintext state, saved plan, or emergency backup may enter Git or ordinary CI artifacts.

Production applies run only through a manually dispatched GitHub workflow. Local tasks permit validation and planning, not routine production applies. Use one serialized infrastructure writer per environment, always operating from current default-branch configuration and state. Reject stale requests; do not cancel an in-progress apply when another request arrives.

Persist resulting encrypted state after partially failed applies as well as successful ones. A failure to push changed state requires stopping further applies and recovering state through a restricted mechanism. Git and apply are not atomic, and runner loss remains a documented failure mode. Implementation must prove the recovery path rather than masking this limitation with a homemade distributed lock. A break-glass local procedure first suspends CI applies and reconciles state before resuming them.

## CI/CD and releases

Separate workflows by purpose and privilege:

- Pull requests and main: formatting checks, linting, types, tests, package checks, and configuration validation without production credentials.
- Main after successful checks: build and publish immutable commit-addressed application images to GHCR.
- Applications: automatically deploy the already-built images from successful main revisions with Kamal. Prevent stale deployments and serialize per environment. Deployment retries reuse images.
- Infrastructure: manual plan/apply/state persistence workflow.
- Host configuration: manually dispatched Ansible workflow.
- Third-party services: deliberate version upgrades with backup and recovery preparation.
- Library: explicit release through Changesets and npm trusted publishing.

Keep infrastructure credentials out of application deployment jobs. Use least-privilege workflow permissions and pinned dependencies/actions. Do not expose production secrets to pull-request code. Published versions and image identifiers must not be overwritten with different contents.

## Reference 1: stateless standalone application

A React, Vite, and strict TypeScript application managed with pnpm. Serve its built assets from a small production web-server image. No application backend or database.

Use established frontend linting and test tooling and Playwright for browser verification. Demonstrate a multi-stage image, health checks, HTTPS through Kamal, automatic deployment, and rollback to an existing image. OpenTofu and Ansible provide the common VPS setup. Persistent application-data backups are unnecessary because the application has no persistent state.

## Reference 2: stateful standalone application

A small project-and-task tracker using Next.js, strict TypeScript, PostgreSQL, and Drizzle. Use built-in Next.js server capabilities rather than adding a separate API server. Authentication is not required to demonstrate this example; any publicly reachable mutation paths must have an explicit safe-access boundary before deployment.

Run the application directly in development with PostgreSQL in Docker Compose. Use ESLint, TypeScript, Vitest for application logic, and Playwright for browser flows. Build Next.js standalone output in a multi-stage image.

Deploy PostgreSQL as a Kamal accessory with persistent storage and no public database port. Generate and review SQL migrations, running them as an explicit deployment step. Use backward-compatible schema changes; explain that application rollback does not undo migrations.

Demonstrate persistence across restart, migration from a previous schema, a failed-deployment recovery, database backup, and restore into a fresh database.

## Reference 3: mixed-language monorepo

A report-generation app with a React/Vite/TypeScript frontend, Go API, Go worker, and PostgreSQL. A user submits a request, the API enqueues work, the worker generates a small result, and the frontend displays status and results. Store small results in PostgreSQL rather than adding object storage for application data.

Use pnpm workspaces for JavaScript packages and one Go module with separate API and worker entry points. Use Go's standard HTTP router, pgx, sqlc, River for PostgreSQL-backed jobs, and an established SQL migration tool. No Python, Redis, Nx, or custom build orchestrator.

Use separate images and Kamal configurations on one VPS, with explicit internal networking and service contracts. Initially validate and build all services rather than adding change-detection machinery. Document safe release order and backwards-compatible contracts; independent images do not imply atomic multi-service rollback.

Verify the complete browser-to-worker path, persistence across API restarts, failed-job retries, and worker restarts without lost work. Jobs tolerate retries; do not promise exactly-once execution.

## Reference 4: third-party software deployment

A vanilla Minecraft Java server using the established itzg/minecraft-server image, with explicit game and image versions. No custom image unless required by a demonstrated need. Leave host memory outside the Java heap.

Deploy through Kamal with its HTTP proxy disabled, an explicitly published game port, and a verified stop-before-start procedure that prevents concurrent writers to world data. Manage a DNS-only Cloudflare record through OpenTofu. Enable authenticated player identities and an allowlist; keep remote administration private and credentials encrypted.

Use persistent world storage, Minecraft-aware backup coordination, and encrypted off-host backups. Upgrades require safe shutdown, backup, deliberate deployment, and readiness checks. Recovery may require both an older image and a matching world backup.

Verify with a real client, persist a world change across restart, and restore into an isolated instance. Explain how these operational patterns transfer to an AI assistant installation without maintaining a sixth example.

## Reference 5: open-source library

A dependency-free TypeScript duration-parsing library in a standalone pnpm repository. Use explicit ESM exports and declarations, documented Node/browser compatibility, tsdown for builds, Vitest for behavior, publint and Are the Types Wrong for package checks, and a consumer test against the packed tarball.

Use Changesets for semantic versioning and changelogs. An explicit GitHub release workflow builds and verifies the package once and publishes the tested artifact through npm trusted publishing. Verify provider-specific publishing requirements, including any first-publication bootstrap, during implementation. act covers checks and packaging, not GitHub identity or actual publication.

Include a license, README, contribution instructions, security policy, and automated dependency updates. Do not add VPS, container publication, SOPS, Ansible, or OpenTofu without an actual need. CommonJS is not part of the initial contract.

## Remaining implementation calls

These are proposed builder choices rather than additional user requirements:

- Use Cloudflare R2 as the concrete off-host backup destination, provisioned through OpenTofu, and restic for encrypted backup storage. Use established workload-aware tools for consistent PostgreSQL and Minecraft backups. Verify compatibility before settling exact configuration.
- Use short, established-tool just recipes and native CI configuration rather than a custom secret loader or state-management script.
- Keep one production environment per deployed reference. Add temporary isolated recovery targets for tests rather than maintaining permanent staging infrastructure.
- Give the task tracker and report app a simple explicit access boundary suitable for references; do not expand into bespoke account systems.
- Select exact supported versions, migration tooling, web-server image, monitoring/notification integration, and licenses during implementation, explaining consequential constraints in each README.

## Verification and approval boundaries

Run the repository's format, typecheck, lint, and tests after changes. Preserve prompt-loader behavior. Do not add tests asserting policy keywords.

Evaluate skill discovery and behavior with fresh-context scenarios before and after adding guidance: new application, existing project with different conventions, mixed-language monorepo, third-party deployment, library, and encrypted-state/bootstrap recovery. Retain observed evidence and distinguish behavior evaluation from prompt assembly tests.

Run each reference's checks, application/package builds, applicable container builds, local act jobs, and integration tests. Exercise actual user-visible boundaries, including a packed-package consumer and app browser flows. Clearly record any unavailable Docker, GitHub, cloud, or client prerequisites.

The user has authorized design discussion, not paid provisioning, live deployment, domain changes, credential installation, or npm publication. Those operations need authorization before execution. Local validation cannot establish production hardening or disaster recovery: mark those outcomes unverified until exercised on authorized infrastructure.

## Non-goals

No provider-neutral infrastructure framework, reusable internal platform, general-purpose scaffolder, automatic migration of existing projects, additional example languages for variety, multi-region architecture, Kubernetes, or unconditional deployment stack for libraries.
