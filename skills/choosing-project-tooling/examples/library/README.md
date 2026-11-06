# Duration parser example

A dependency-free TypeScript library that converts duration strings to integer milliseconds. This standalone example is **unpublished**. Its placeholder name is reserved only within this example, not on npm. Before any publication, choose a real package name or scope you own and review the release process. The package is private to prevent accidental publication.

## Try it locally

Install [mise](https://mise.jdx.dev/getting-started.html), then run these commands from this directory. The tasks need a POSIX shell; the isolated consumer task also needs Bash and registry access for TypeScript.

```sh
mise trust
mise install
mise exec -- pnpm install --frozen-lockfile
mise exec -- just check
mise exec -- just test-consumer
```

The final command builds, packs, checks the actual tarball with publint and Are the Types Wrong, then compiles and runs an external temporary consumer. Expect `Packed ESM consumer: parseDuration only, 5400000ms`. The temporary directory is removed on exit. The tarball remains at `.artifacts/package.tgz` for inspection; `tar -tzf .artifacts/package.tgz` lists its contents. Remove `.artifacts/` when finished.

To use the local artifact in another ESM project, install its absolute path with `pnpm add /absolute/path/to/.artifacts/package.tgz`:

```ts
import { parseDuration } from "unpublished-aidan-duration-example";

parseDuration("1h 30m"); // 5400000
parseDuration("0ms"); // 0
```

## API contract

The only public export is `parseDuration(input: string): number`. It returns a nonnegative safe integer in milliseconds, at most `Number.MAX_SAFE_INTEGER`.

```text
duration = whitespace? term (whitespace term)* whitespace?
term     = digit+ unit
digit    = "0" … "9"
unit     = "ms" | "s" | "m" | "h" | "d"
```

Here, `whitespace` means one or more ECMAScript whitespace or line-terminator characters (JavaScript `\s`), including spaces, tabs, and newlines. Units are case-sensitive: a day is exactly 24 hours, an hour 60 minutes, a minute 60 seconds, and a second 1000 milliseconds. Leading zeros, repeated units, and any unit order are accepted.

Terms must be separated: `"1h 30m"` is valid; `"1h30m"` and `"1 h"` are invalid. The parser consumes every term and never returns a partial result. Empty or whitespace-only input, signs, decimals, exponents, unknown units, and trailing garbage throw `TypeError`. Non-string arguments from JavaScript also throw `TypeError`. An unsafe integer amount, multiplication, or accumulated total throws `RangeError`; no rounding or clamping occurs. If an input has multiple errors, the first detected error is thrown. Error message text is not part of the contract.

## Compatibility

The supported Node.js lines are maintained Node 22 (22.18+), 24 (24.11+), and 26. Development and the packed-package consumer are exercised on the pinned Node 26 version. Other supported lines are compatibility targets, not a tested matrix here; consult the [Node.js release schedule](https://github.com/nodejs/Release#release-schedule) before extending support.

The package is ESM only, with explicit import and declaration exports. There is no CommonJS entry point. The output targets ES2022, uses no Node-specific APIs, and has no runtime dependencies, so it is suitable for browsers with ES2022 and ESM support (or a compatible bundler). No browser execution is verified by this example's Node consumer test.

## Development layout and tasks

`src/index.ts` contains the parser; `src/index.test.ts` covers its contract. `test/consumer/` is copied outside the repository and imports only the tarball's public package name. It has its own compiler installation, with no source aliases or parent `node_modules` resolution. `tsdown.config.ts` builds ESM and declarations into `dist/`.

- `just check`: non-mutating formatting, ESLint, TypeScript, and Vitest checks.
- `just format`: apply formatting independently of checks.
- `just build`: clean tsdown build.
- `just pack`: build, pack to a fixed artifact path, then run publint and ATTW against that artifact. ATTW uses its ESM-only profile because CommonJS is outside the contract.
- `just test-consumer`: pack and verify the isolated TypeScript-to-Node consumer.

Use `mise exec --` before these tasks if mise is not activated in your shell. If a build or consumer check fails, fix it and rerun the task; do not reuse a failing artifact. Generated output is ignored by Git. CI, Changesets, and publication are outside this example's current scope.

## Tooling references

The configuration uses native [mise tool pins](https://mise.jdx.dev/configuration.html), [just recipes](https://just.systems/man/en/), [pnpm packing](https://pnpm.io/cli/pack), [tsdown declarations](https://tsdown.dev/options/dts), and [explicit package exports](https://nodejs.org/api/packages.html#package-entry-points). Package checks follow the [publint CLI](https://publint.dev/docs/cli) and [Are the Types Wrong CLI](https://github.com/arethetypeswrong/arethetypeswrong.github.io/tree/main/packages/cli). Dependency installation retains pnpm's default [release-age protections](https://pnpm.io/supply-chain-security).

MIT licensed. See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md) for maintenance and reporting guidance.
