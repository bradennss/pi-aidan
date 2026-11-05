# CalVer project versioning

## Intent and scope

Make CalVer the default for new projects created with Aidan. Existing projects retain established versioning unless the user requests migration. Update `prompts/system.md` and `skills/setting-up-new-projects/SKILL.md`, including the skill's requirements for generated project guidance. Document the convention in `docs/prompting.md`.

## Version contract

Use `YYYY.MDD.R`: the full UTC release year, `month × 100 + day`, and a daily release counter starting at `1`. Increment the counter for each published release that day and reset to `1` on a new UTC day. Never reuse a published version. Numeric segments have no leading zeros.

Examples: `2026.105.1` is the first release on January 5, 2026; `2026.1105.2` is the second release on November 5, 2026. The next day's first release is `2026.1106.1`.

The three numeric segments fit strict SemVer syntax, but express release timing and sequence rather than API compatibility. Document breaking changes in release notes. Generated project guidance must explain the format and release rules.

## Approaches

The user selected `YYYY.MDD.R` because it encodes year, month, day, and daily release sequence in three useful numeric segments. `YYYY.M.D.R` is easier to read but incompatible with strict SemVer parsers. `YYYYMMDD.R.0` retains three segments but introduces an unused trailing zero.

## Constraints and non-goals

Preserve explicit user directions and existing project conventions. Do not change Aidan's own package version, add release automation, or migrate existing projects implicitly. Keep prompt assembly unchanged. Test observable behavior rather than exact policy wording, and distinguish model-compliance evidence from extension assembly tests.

## Approval

The user approved this design, including UTC and a daily counter starting at `1`.
