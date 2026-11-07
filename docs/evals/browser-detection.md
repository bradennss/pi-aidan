# Browser detection skill checks

## Scope

Expand `skills/using-the-browser/SKILL.md` with general-purpose detection troubleshooting and an on-demand reference. Prefer supported local Chrome options, allow permission-based CDP attachment and opt-in cloud stealth providers, and retain access boundaries. No claim of an undetectable browser, automatic provider purchases, or personal-profile access.

## Before editing: manual retrieval baseline

These are documentation gap checks, not fresh-agent behavioral tests.

| Scenario | Expected guidance | Original skill |
| --- | --- | --- |
| Headless browsing fails but ordinary Chrome works | Dedicated headed Chrome with an explicit executable and persistent profile | Missing setup and limitations |
| User authorizes attaching to Chrome | Named session, explicit endpoint, pinned tab, debugging security constraints | Says to ask permission, but no attachment workflow |
| User asks for stealth | Verified provider options, approval for cost/data handling, no invented local flag | Missing provider guidance |
| Page shows CAPTCHA, 403, 429, or login | Diagnose visible state, bounded retries, user handoff, no success claim | Basic stop rule only |
| Domain containment is required | Explain incompatibility with profiles/CDP; preserve controls | Missing compatibility warning |

## Verification checklist

- [x] Record missing reference guidance before editing.
- [x] Read installed CLI help and bundled core skill; inspect primary documentation.
- [x] Extend discovery triggers without summarizing the workflow.
- [x] Keep detailed setup in a linked reference; retain the existing core workflow.
- [x] Check scenario coverage, command syntax, boundaries, and source links.
- [x] Smoke-test an isolated system-Chrome session and persistent profile.
- [x] Run format, typecheck, lint, and the full project test suite.
- [x] Review diff for unrelated changes and report untested paths.

## Results

All five retrieval scenarios now have explicit guidance in the linked reference. Commands and provider variables were compared with installed `agent-browser 0.41.1` help/core skill and the primary documentation linked in the reference.

A named session launched installed Google Chrome 157.0.8103.38 with `--headed`, `--executable-path`, and `--profile` pointing to a fresh temporary directory. Navigation to `https://example.com`, full snapshot, title, and visible body-text retrieval succeeded. The task browser was closed and the profile's `Default/Preferences` file was confirmed. This checks profile creation, not authenticated-state restoration or bot-detection clearance.

`pnpm run format`, `pnpm run typecheck`, `pnpm run lint`, and `pnpm test` succeeded (2 test files, 20 tests). `git diff --check` was clean. These repository tests cover the extension, not agent adherence to the new prose.

CDP attachment, cloud sessions, real-site challenge clearance, and fresh-agent behavioral tests were not run. No dependencies were installed and no personal browser profile was accessed.

Fresh-agent pressure tests are not part of these manual checks. Cloud providers require credentials and approval; personal-browser attachment requires permission. Neither should be exercised implicitly for documentation verification.
