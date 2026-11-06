# Preferred project stack

## Intent and scope

Give Aidan a coherent preferred toolchain for production-ready software while selecting only the pieces that suit each project. Apply the preferences to new projects and relevant improvements in existing projects. Preserve established conventions; migrations require user authorization. This change updates guidance, not this repository's infrastructure, tooling, or published version.

## Approaches

The approved approach keeps concise, durable preferences in `prompts/system.md` and operational guidance in `skills/setting-up-new-projects/SKILL.md`. Putting everything in the system prompt would burden unrelated tasks. Putting everything in the setup skill would leave existing-project work without readily available defaults.

## Common foundation

Prefer Mise for pinned tools and tasks, Docker Compose when local services warrant it, and GitHub Actions with dependency and build caching. Keep ecosystem-native tools underneath Mise. Preserve the existing non-mutating aggregate verification contract and Beads setup safeguards.

Replace active CalVer instructions with SemVer defaults and release-please release PRs and changelogs for single-package and monorepo projects. Preserve existing versioning unless migration is authorized. Record compatibility and breaking changes. Release setup does not authorize publishing.

## Publicly deployed applications

Use release-please to determine released versions. Build new GHCR images only when the corresponding application version changes. In a monorepo, select released deployable components rather than rebuilding every component. Separate pull-request validation from image publication. Promote the same immutable image digest through staging and production, with health verification and rollback. Re-running a deployment reuses the published image.

Prefer GitHub environments where repository capabilities support them, with environment-scoped access and protection where available. Maintain staging and production separation even when those capabilities are unavailable. Use Kamal for deployments to production-configured VPS hosts, OpenTofu for resources supported by maintained providers, Cloudflare DNS through IaC, and Ansible for host configuration. Avoid conflicting ownership between provisioning and configuration tools.

Commit encrypted OpenTofu state and age-encrypted secrets. Keep bootstrap secrets such as age keys in a gitignored repository-local `.env`, never committed. Document recovery, CI bootstrap access, serialized state operations, and safe encrypted state persistence without plaintext artifacts or credentials in logs, caches, or Git history. Verify supported mechanisms against current primary documentation during implementation rather than inventing provider coverage or encryption features.

## Libraries and other projects

For libraries, SDKs, CLI tools, and similar open source packages, prefer SemVer, release-please, ecosystem-native publishing, compatibility checks, and release provenance where supported. Use least-privilege publishing credentials or trusted publishing where supported. A publicly accessible source repository alone does not imply an application deployment. A hosted API service is a deployed application; an API client library is a package.

Do not add VPS provisioning, staging and production deployments, container publication, or application promotion workflows to libraries by default. Game servers, assistant installations, and other specialized projects use the relevant subset of the stack.

## Verification and non-goals

Keep loader behavior and existing assembly tests intact. Evaluate guidance through fresh-agent scenarios covering a deployed monorepo, a library, an existing project with established tooling, a specialized installation, and encrypted-state/bootstrap handling. Compare baseline and changed guidance, retain evidence, and distinguish model behavior from assembly tests. No real infrastructure provisioning, publication, or deployment is necessary or authorized.

Remove active CalVer guidance and update maintained explanation and evaluation scenarios in `docs/prompting.md`. Earlier dated design and plan documents remain historical records, clearly superseded where necessary. Do not introduce tests that merely assert policy keywords.
