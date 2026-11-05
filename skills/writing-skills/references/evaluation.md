# Evaluate a skill

Use this guide when defining cases, measuring a revision, or reviewing a skill. Structural validity, discovery, and successful execution are separate claims that need separate evidence.

## Define observable cases

For each case, record the user request, input fixtures, available tools, expected artifacts, checks, and side-effect boundaries. Use requests that resemble actual user messages. Include at least one variation beyond the examples in the skill.

Start with a small set:

1. A representative successful task.
2. Missing or malformed input with a specific expected response.
3. A variation that requires adapting the procedure.
4. A request that should select the skill without naming it.
5. A near miss that uses similar terms but should not select it.

Add pressure cases for consequential workflows: incomplete evidence, an apparent time constraint, or a request to skip a necessary check. Use safe fixtures and sandboxes for state-changing operations.

Write checks against results, such as a file's schema, correct totals, preserved data, reported missing fields, or absence of unauthorized writes. Do not score whether the agent repeats a slogan, heading, or exact instruction wording. For subjective output, define a short rubric and review the artifacts directly.

## Compare execution fairly

1. Freeze the cases and scoring criteria for the comparison. Keep a separate holdout case for the next iteration.
2. For a new skill, run a no-skill baseline. For a revision, use the previous version if reading it is permitted. If it is not, use a no-skill baseline and state that the comparison does not measure improvement over the old version.
3. Run the candidate in a fresh context with the same task, fixtures, tools, model, and comparable settings. Use an authorized runner. If none is available, save the cases and report that execution is blocked.
4. Keep runs isolated from each other's transcripts and outputs. Record the candidate version and the runtime used. Keep logs and generated artifacts outside the distributed skill.
5. Inspect outputs and relevant traces. For each check, save pass, fail, or not run, with supporting evidence. Keep tool failures separate from instruction failures.
6. Repeat variable or high-consequence cases. Report individual failures and variation alongside aggregate results. Do not infer reliability from one successful sample.
7. Revise the smallest relevant instruction and rerun affected cases, a neighboring case, and the holdout. Add newly observed failures to the regression set.

When comparing subjective artifacts, hide which version produced each result when practical. Track time or token use only when the runner provides reliable measurements. Prefer a simpler skill if quality is equivalent and it costs less to use.

## Test selection separately

Automatic selection needs an environment that advertises the candidate's metadata without preloading its body. Use realistic positive requests, realistic negatives, and near misses. Check the trace for whether the skill was loaded.

An explicit `/skill:name` invocation proves that a command can load the skill. It does not prove that an agent selects it automatically. Pasting the whole skill into a prompt tests instruction application and bypasses discovery.

If a relevant request does not select the skill, inspect the description and competing descriptions. If the skill loads but the output fails, inspect the procedure, references, and tools. Avoid broadening activation conditions to compensate for an execution failure.

## Cases for writing-skills itself

Use these requests as a starting regression set for this package. Provide safe fixture repositories and the stated tools. These cases are evaluation definitions, not recorded results.

| Case | Request and setup | Observable checks |
| --- | --- | --- |
| New capability | “Create a skill for reconciling invoice and payment CSVs. Match by invoice ID and currency, preserve duplicates for review, and produce unmatched rows.” Provide CSV fixtures and a runnable CSV tool. | The package is structurally valid; instructions use the supplied schema and tool; cases check duplicate keys, unmatched rows, and missing fields; the report distinguishes structural checks from agent runs. |
| Missed selection | “The reconciliation skill works when invoked explicitly, but it never loads when I ask to match payments.” Provide a description that mentions only bookkeeping and successful explicit-run evidence. | The revision targets discovery; positive and near-miss requests are defined; explicit invocation is not reported as proof of automatic selection. |
| Execution failure | “This skill loads, but it silently drops duplicate invoice IDs.” Provide the package, fixtures with duplicates, and a failing output. | The procedure or bundled operation preserves duplicates; evaluation checks the resulting rows; the change does not rely solely on broader trigger wording. |
| Restricted replacement | “Replace this skill from scratch without reading any existing project skills.” Provide independent domain documentation. | File-access evidence shows no existing skill contents were read; the result uses the supplied evidence; any baseline is no-skill rather than the prohibited old version. |
| No agent runner | “Improve this SKILL.md and verify it.” Provide file and shell tools, with no authorized agent runner or model API. | Available structural checks run; runnable behavior cases are supplied; the report labels agent evaluation as not run and does not invent a pass rate. |
| Near miss | “Fix duplicate handling in the invoice reconciliation application.” Provide application code and no request to change skills. | Automatic routing does not select writing-skills solely because the application resembles an example in the skill. |

## Report evidence

Name the package version, harness, model if used, cases executed, structural checks, observed failures, and unavailable checks. Link artifacts when available. Describe improvements only when the comparison supports them. Passing repository tests alone does not show that a skill changes agent behavior.
