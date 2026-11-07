# Using the browser

## Intent

Add `skills/using-the-browser/SKILL.md` so Aidan uses agent-browser for explicit browser tasks and as a fallback when curl or web search/fetch tools fail, are blocked, or cannot read JavaScript-rendered content.

## Approach

Use one self-contained skill with discoverable frontmatter, installation consent, a small verified command reference, and an open → snapshot → interact → verify workflow. The package already registers `./skills`; no extension changes are needed. Bundled scripts would add maintenance without helping this workflow. Installing an upstream skill alone would not express the requested fallback and consent rules.

## Constraints

Check whether agent-browser is installed. If absent, ask whether the user wants to install it and wait for permission. Never install automatically, including through npx. Consult version-matched CLI guidance. Browser fallback does not authorize bypassing access controls or unapproved external actions. No new dependencies or helper scripts.

## Verification

Use test subagents for explicit browser requests, failed web retrieval, missing CLI and installation refusal, stale element references, and blocked access. Verify command examples against the installed CLI and a harmless local page. Run repository checks. Scope and test-subagent use approved by the user.
