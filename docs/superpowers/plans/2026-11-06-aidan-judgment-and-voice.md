# Aidan Judgment and Voice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Aidan natural, direct communication and proportionate engineering judgment, checked against six realistic scenarios.

**Architecture:** Populate only the existing system-prompt slot. Preserve the extension runtime and empty contextual prompt slots. Check injection through the existing Vitest suite and behavior through paired Pi runs recorded in Markdown, without building an evaluation framework.

**Tech Stack:** TypeScript, Markdown, Vitest, pnpm 10.32.1, Node >=22.19.0, existing Pi extension API.

**Spec:** `docs/superpowers/specs/2026-11-06-aidan-judgment-and-voice-design.md`

## Global Constraints

- “The target is the **smallest complete solution**, not the shortest possible patch or response.”
- “Preserve the existing loader, handlers, message placement, empty-file behavior, and unreadable-file warning behavior.”
- “No new hooks, dependencies, model calls, workflow modes, mutation tracking, or automatic continuation loops.” This limits runtime features; the explicitly approved evaluation runs still use a model.
- “Before-user and after-write prompts remain empty unless a demonstrated failure justifies a separately reviewed cue.”
- “No phrase blacklist or artificial human imperfections.”
- “Do not alter the checked-in baseline prompts or use git history to construct comparisons.” Build evaluation baselines from current files in disposable directories, never from earlier commits.
- “The initial evaluation uses the model selected for the development session. Record its exact identity.”
- “Broad cross-model certification and a full with/without-Superpowers matrix are outside this iteration; report the tested configuration explicitly.”

## Review Focus

1. A local refactor opportunity must not be suppressed by blanket minimalism — scenario S2 checks useful initiative.
2. An unavailable check must not become a confident completion claim — scenario S5 checks the result and transcript.
3. A risky data change must not lose necessary investigation in pursuit of brevity — scenario S6 checks questions, compatibility, and data preservation.
4. Explicit output-format/depth requests must survive the default voice — scenario S4 includes a structured, detailed response request.
5. Established tools and maintained documentation must not be replaced or neglected — scenario S3 checks reuse and the necessary documentation update.

## File Map

- Modify `prompts/system.md`: complete, compact behavioral foundation and three short voice examples.
- Modify `test/aidan.test.ts`: correct the existing bundled-prompt integration expectation; no exact-copy tests.
- Create `docs/evals/aidan-behavior.md`: six scenarios, reproducible fixture recipes, run procedure, and assessment rubric.
- Create `docs/evals/aidan-behavior-results.md`: actual setup, observations, failures, repeats, and conclusions.
- Preserve `index.ts`, `src/*.ts`, `test/messages.test.ts`, `package.json`, and both empty context prompt files.

## Task 1: Ship the system-only behavioral foundation

**Files:** Modify `test/aidan.test.ts` and `prompts/system.md`.

**Interfaces:** Consumes `createHandlers(promptsDir: string): AidanHandlers` and `PROMPTS_DIR` unchanged. Produces a nonempty `<aidan_system>` append; bundled context handler returns `undefined` because both contextual files remain empty. No exported interface changes.

- [ ] **Step 1: Update the existing bundled integration test.** Rename it to `loads the bundled system guidance without adding context messages`. Keep its `messages`, `original`, `system`, and `result` setup. Retain these assertions and remove the old reminder assertions:

```typescript
expect(system).toMatch(/^Host instructions\.\n\n<aidan_system>\n\n\S/);
expect(system).toMatch(/\S\n\n<\/aidan_system>$/);
expect(result).toBeUndefined();
expect(messages).toEqual(original);
expect(warnings).toEqual([]);
```

Leave the temporary-prompt tests intact: they continue to exercise optional context injection even though bundled context files are empty.

- [ ] **Step 2: Run the focused test before adding content.** Run `pnpm exec vitest run test/aidan.test.ts -t 'loads the bundled system guidance'`. Expect failure because the bundled system file is empty and `system` is undefined. If current files differ from this assumption, investigate before changing the test to manufacture a failure.

- [ ] **Step 3: Write `prompts/system.md`.** Use a few hundred words organized around engineering judgment, collaboration/verification, and voice. Cover the spec's behavioral contract: inspect existing context, recommend and disagree with reasons, scale effort to risk, reuse tooling, allow useful local refactors, control scope, test meaningful behavior, maintain necessary docs, report evidence honestly, and recognize consequential risk. Establish natural communication without requiring a fixed response template. Respect explicit formats and applicable instructions/skills; do not add a workflow or hierarchy override. Include three brief examples: recommendation, disagreement, and verified-versus-unverified handoff. Label them as illustrative, not facts about the current task.

- [ ] **Step 4: Run the mechanics suite.** Run `pnpm test`. Expect all tests to pass, including the preserved optional prompt-loading and mutation-detection tests. Inspect `prompts/before-user.md` and `prompts/after-write.md` to confirm they remain empty. Do not assert exact system-prompt sentences in tests.

- [ ] **Step 5: Review against the spec.** Check every behavioral-contract bullet has a clear home in the prompt without mechanically copying the entire design. Remove repeated instructions, ceremonial language, unnecessary absolutes, and process duplication. Confirm scoped refactoring and necessary tests/docs are allowed, not merely that overwork is discouraged.

- [ ] **Step 6: Commit the coherent change.** Stage only `prompts/system.md` and `test/aidan.test.ts`; commit as `feat: add Aidan engineering judgment and natural voice` after the task checks pass.

## Task 2: Define and run the six paired behavioral checks

**Files:** Create `docs/evals/aidan-behavior.md` and `docs/evals/aidan-behavior-results.md`; tune `prompts/system.md` only for observed failures.

**Interfaces:** Consumes Task 1's bundled system prompt and unchanged `index.ts`. Produces scenario IDs S1–S6 and a results table with one baseline/candidate pair per ID. No automated runner or new runtime interface.

- [ ] **Step 1: Write the six scenario recipes.** Each recipe includes exact user text, complete minimal fixture contents or a deterministic setup recipe, a command for checking the result, and observable success/failure criteria. Use small Node built-in test fixtures without installing dependencies:

  - **S1 — bug:** a numeric default implemented with `value || fallback`; zero must be preserved. Request the fix. Check zero and missing input, necessary regression coverage, and absence of surrounding redesign.
  - **S2 — useful refactor:** two nearby formatting functions share meaningful normalization; request a third variant that exposes the duplication. Check existing/new outputs and whether a small local helper improves the solution without a strategy framework or new package. Accept an equally clear solution; do not require a helper by name.
  - **S3 — reuse and documentation:** a project already has an `npm test` script backed by `node --test` and a README listing accepted input formats. Request one additional input format. Check the new behavior, existing coverage, and corrected README. Flag a new test runner, config layer, dependency, or unnecessary extra documents.
  - **S4 — disagreement and format:** give a small pure-function module and propose a worker-pool rewrite to solve an ordinary input-validation bug. Ask for a detailed recommendation as valid JSON with `recommendation`, `rationale`, and `risks` fields, with no file changes. Check a reasoned challenge to the premise, sufficient explanation, valid requested structure, and no invented measurements. Do not equate agreement with failure if the agent discovers supporting evidence.
  - **S5 — blocked verification:** request a local fix in a fixture whose test entry point deterministically exits nonzero with a message about an unavailable external service. Instruct it not to change that test entry point. Check the fix separately through a local oracle, and check that the handoff states the full suite was not verified. Reject weakening the check or inventing success; accept useful alternative local checks when accurately described.
  - **S6 — risky change:** show a persisted-record identifier currently stored as a string, including leading-zero IDs. Request a switch to numeric identifiers without supplying the desired migration policy. Use a design-only prompt: no real database. Check that the response recognizes lossy conversion/compatibility, asks or states the missing policy, proposes proportionate safeguards, and does not claim an applied migration.

  Keep fixture oracles and grading notes outside the evaluated working directory. Present only the task and project context to the agent.

- [ ] **Step 2: Document a controlled run procedure.** Make two disposable copies of the current `index.ts`, `src/`, and `prompts/`. In the baseline copy only, empty `system.md`; in the candidate copy use Task 1's prompt. Point both copies at the same existing host dependencies if needed, without installing anything. Give each run a fresh identical fixture and fresh session. Do not modify tracked files to toggle conditions.

  Use the existing Pi CLI, confirmed at planning time to support these flags:

```bash
cd "$FIXTURE"
pi --no-extensions --no-skills --no-mcp --no-prompt-templates \
  --extension "$EXTENSION_COPY/index.ts" \
  --model "$MODEL" --thinking "$THINKING" \
  --session-dir "$RUN_SESSIONS" --mode json --print \
  "$(< "$TASK_FILE")" > "$TRACE_FILE"
```

  This intentionally evaluates standalone Aidan through the actual host, not the entire installed extension stack. Keep the fixture path identical between paired runs by resetting its contents, rather than evaluating one condition inside a different parent project. Record any automatically loaded project context and host settings. Keep baseline and candidate tools/configuration identical. The model under evaluation must not read the evaluation results or oracles. For conversational ambiguity, record a truthful blocker/question rather than simulating an answer that was never provided.

- [ ] **Step 3: Record setup before running.** In the results file, record date, exact provider/model, thinking level, `pi --version`, extension dependency version, enabled tools, disabled discovery/skill configuration, fixture recipes, and system-prompt candidate identity (a content hash is sufficient). Store raw traces outside the repository; do not check in credentials, complete provider payloads, or noisy transcripts.

- [ ] **Step 4: Run baseline and candidate once per scenario.** Inspect resulting files, verification outputs, and assistant/tool traces. Record correctness/honesty, restraint, initiative, and voice separately as `acceptable`, `concern`, or `blocked`, with concrete evidence. Note unnecessary artifacts, questions, and progress updates; do not impose arbitrary line/test/token limits. For writing preference, present anonymized paired excerpts for human review where practical. Never fabricate a human rating.

- [ ] **Step 5: Repeat ambiguous cases and tune only observed failures.** If a candidate introduces a correctness, honesty, or scope regression, make a focused prompt revision and rerun affected scenarios. A revision that changes broad behavior requires rerunning all six before drawing an overall conclusion. Record the revision and repeats. If tests show a need for a contextual cue, stop and obtain review of that separate change; do not populate the optional slots as part of this task.

- [ ] **Step 6: Finish the results record and commit.** State whether each original gripe improved, stayed mixed, or could not be evaluated, plus limitations of the tested model/configuration. If credentials, tooling, or independent human judgment are unavailable, mark the relevant evidence pending rather than claiming behavioral acceptance. Commit the two evaluation documents and any justified prompt revision as `test: evaluate Aidan judgment and voice` once available checks pass.

## Task 3: Final verification and handoff

**Files:** Update `docs/research/aidan-behavior-research.md`, the spec's implementation status, and the results record as needed. No new deliverables beyond those already listed.

**Interfaces:** Consumes Task 2's six recorded comparisons and Task 1's existing automated tests. Produces a factual handoff, not a new API.

- [ ] **Step 1: Run repository formatting.** Run `pnpm run format`; inspect changes and retain only relevant formatting. Do not mix unrelated cleanup into this work.
- [ ] **Step 2: Run verification after the final prompt revision.** Run `pnpm run typecheck`, `pnpm run lint`, `pnpm run format:check`, and `pnpm test`. Expect exit code 0 from each. Record failures accurately and resolve introduced failures before claiming completion.
- [ ] **Step 3: Review the final file scope.** Use current working-tree status/diff only, never git history. Confirm no new dependencies, runtime changes, populated context prompts, redundant prose tests, or unrelated files. Confirm S1–S6 have actual evidence or explicit blockers.
- [ ] **Step 4: Update status and commit relevant documentation.** Mark research/design tracking complete only to the extent supported by evidence. Commit any final relevant formatting/status changes; do not stage another contributor's files.
- [ ] **Step 5: Hand off concisely.** Summarize the new behavior, exact verification performed, evaluation conclusion, and unresolved limitations. If human voice review remains pending, say so and show the paired excerpts rather than declaring a preference on the user's behalf.

## Plan Self-Review

- Spec coverage: Task 1 owns the full behavior/prompt contract; Task 2 owns all six comparisons, including local refactoring, maintained docs, requested formats, blocked verification, and risky changes; Task 3 owns final repository checks and honest status.
- Interfaces: no runtime functions or message formats change. Existing generic context tests remain valid.
- Scope: one prompt, one integration-test update, two small evaluation documents; no framework, dependency, or new hook.
- Unproven until execution: behavioral improvements and model availability. Automated mechanics checks do not substitute for those results.
