---
name: reviewing-your-work
description: Review an agent's own file changes before finalizing, committing, opening a pull request, or reporting completion. Use after every file change, even when the user does not ask for review. The implementing agent must inspect its own work. Implementation, prompt, skill, and behavior-affecting content changes require bounded fresh-context subagent review; content with no rendered, executable, runtime, or deployed effect does not.
compatibility: Requires Git, Bash, mktemp, standard Unix utilities, and a host that can launch a read-only subagent in a fresh context.
---

# Reviewing your work

Treat review as a required delivery gate after changing files. Keep the implementing agent as the sole writer and final judge. A review subagent finds issues and never edits project files.

## Workflow

1. Finish the change and its required focused, repository, and end-to-end checks before starting the final review. If a check is blocked or failing, keep the work unfinished and include that evidence in the review packet.
2. Review the work personally. Read every changed line, `git status`, the relevant surrounding source, tests, configuration, and documentation. Check the user's goal, active instructions, affected callers, failure paths, compatibility, security, scope, test quality, and prose. Fix issues found in this pass and rerun affected checks.
3. Decide whether independent review is required. Use it for every code, test, executable configuration, schema, dependency, infrastructure, prompt, skill, or mixed implementation and content change. Also use it for documentation, examples, plans, or notes that affect rendered, executable, runtime, or deployed behavior. Skip independent review only when changes are limited to content with none of those effects. If independent review is skipped, require the personal pass and applicable validation to succeed, state the decision in the final response, report the review as `clean`, and continue with the calling workflow without running steps 4 through 11.
4. Resolve `scripts/capture-diff.sh` relative to this `SKILL.md`, then execute its absolute path with the target repository root as the working directory. Record the absolute path it prints. The script writes staged, unstaged, and non-ignored untracked changes, including binary changes, to a temporary file outside the repository without changing the index.
5. Build a cold-start review packet with:
   - the repository root, current `HEAD`, and diff artifact path
   - the user's goal and observable acceptance criteria
   - applicable user constraints and every repository instruction file loaded by the host
   - validation commands already run, their status, and any blocked checks
   - instructions to inspect the full diff artifact, changed files, surrounding code, tests, and affected callers

   Include requirements and evidence. Exclude the author's plan, scratch notes, reasoning history, prior review prose, and justifications for implementation choices.

6. Use the host's subagent mechanism to launch exactly one read-only reviewer in a new isolated context for the round. Give the run a stable round-specific identifier when the host supports one. Tell it to apply the review contract below. Do not reuse or resume a prior reviewer, share the parent conversation, or ask the reviewer to fix files.
7. When the result arrives, inspect each finding against the current files, user intent, tests, and active instructions. Classify it as valid, stale, invalid, speculative, or outside scope. If no qualifying issue remains, continue to step 9 when required validation passes; otherwise stop under step 11's validation guard. For a result with qualifying issues, apply the repeated-finding, validation, infrastructure, and authority guards in step 11. The no-accepted-change guard applies only in rounds one and two after the parent rejects every finding; a clean result and the round-three approval pause are exempt. If this is round three and a valid finding remains, do not fix it; continue to step 10. In rounds one and two, fix every valid in-scope finding. Never change code merely to satisfy an unsupported finding. Escalate a product, architecture, compatibility, security, or scope decision that requires user authority.
8. After fixes in rounds one or two, or fixes authorized by the user in step 10, rerun every affected check. Capture a new full diff artifact and launch a new fresh reviewer against the whole current diff. Do not give it prior findings because they can anchor the new review.
9. Stop with `clean` when the reviewer returns no qualifying issues and required validation passes. Remove all temporary diff artifacts before the final response.
10. When three review rounds complete without a clean result, stop before fixing the latest findings and ask the user whether to fix them and begin a new bounded review cycle. Summarize the findings and current validation state in that request. Treat approval as authority to fix the accepted findings and run a new cycle of up to three fresh-review rounds. Never start another cycle without that approval.
11. Stop with `blocked` when the user declines another cycle or when another guard fires: a materially identical finding returns after it was fixed or rejected with evidence; a round with qualifying issues in rounds one or two produces no accepted change; required validation cannot pass; review infrastructure fails; or a finding needs unapproved user authority. Preserve the current work, remove temporary diff artifacts unless needed to diagnose an infrastructure failure, and report the findings, dispositions, exact stop reason, and remaining uncertainty. Never claim a clean review in this state.

## Review contract

Give the reviewer these rules in its task:

- Review the complete diff artifact and verify changed behavior in repository context. Read the host-provided repository instructions and relevant source, tests, documentation, prompts, and skills.
- Apply the user's stated goal and constraints plus all applicable engineering, testing, scope, verification, and writing rules.
- Report only concrete issues caused or made reachable by the diff that should be fixed before finalizing. Exclude optional polish, style preferences without a governing rule, pre-existing defects, and speculation.
- Support each issue with a file and line, source or contract evidence, impact or failure scenario, and the smallest safe fix. Use `P0` for an immediate blocker and `P1` for a required pre-finalization fix.
- Return a concise list of issues. Return exactly `No issues found.` when no issue qualifies. The reviewer may report a blocked decision separately and must not treat missing authority as permission to choose.
- Do not modify project files, run subagents, or trust the author's validation claims without checking the available source evidence.

Prefer a strict structured output schema when the host supports it. Use `verdict: "clean" | "issues_found" | "blocked"` and an `issues` array whose items contain `priority`, `file`, `line`, `title`, `evidence`, `impact`, and `smallestFix`. Require an empty `issues` array for `clean`. If structured output is unavailable, enforce the text contract above and inspect the result directly rather than parsing reviewer prose in a shell loop.

## Loop discipline

Keep the loop under the implementing agent's control. Deterministic checks run before model review and after every accepted fix. The implementing agent owns finding disposition, edits, validation, stop decisions, and the final report.

Use three rounds as the hard cap for each bounded cycle. A reviewer can discover a later defect after an earlier fix, so each round reviews the complete current diff. After round three, user approval is required before fixes or a new cycle. Repeated findings or a no-change round show that more calls are unlikely to make progress; stop and surface the disagreement instead of weakening the rubric or editing until the reviewer is appeased.
