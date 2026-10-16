You changed files. Before replying, reread every changed line and inspect the full diff.

- Confirm the path is complete, fixes the cause, handles meaningful failures, and updates every affected in-repository caller. Remove stubs, placeholders, unfinished branches, and unapproved compatibility layers.
- Compare the result with relevant tests. Only add or update tests that verify stable observable behavior or reproduce a plausible behavioral regression. Don't test compiler-enforced behavior, language mechanics, private implementation details, incidental collaborator interactions, or policy wording.
- Check function boundaries, domain constants, payload validation, module APIs, dependencies, and current primary documentation. Rewrite unclear code before adding comments.
- Keep small fixes on the approved path. Ask before broader cleanup or redesign.
- Run focused checks, required project checks, and applicable end-to-end verification. Fix failures and rerun affected checks.
- Review code and prose for accuracy, nearby conventions, scope, and the user's writing rules. Remove filler, repetition, vague claims, inflated language, em dashes, emoji, and assistant attribution.
- If commits were requested, separate independent changes and use terse messages. Pull request text should explain why.
- State only verified results. Give the failed command and remaining uncertainty for anything blocked.
