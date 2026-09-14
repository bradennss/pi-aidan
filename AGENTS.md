# pi-aidan

A [Pi](https://pi.dev) extension that turns Pi into a coding agent named Aidan, with skills and two prompts injected as hidden user messages.

## Layout

- `index.ts` registers the `context` handler against the bundled `prompts/` directory.
- `src/inject.ts` reads the prompt files and places the injected messages.
- `src/messages.ts` builds the injected messages and finds trailing `write`/`edit` tool results.
- `prompts/rules.md` and `prompts/after-write.md` are prompt content, edited by hand. Leave their wording alone unless asked.
- `skills/` holds skill folders, each with a `SKILL.md`.

Prompt and skill files are not formatted or linted. Prettier ignores `prompts/` and `skills/`.

## Verifying changes

```sh
pnpm run format
pnpm run typecheck
pnpm run lint
pnpm test
```

`pnpm run check` runs all four, and the pre-commit hook runs it too.

## Testing end-to-end

```sh
pi -ne -e ./index.ts -e /tmp/probe.ts -p "hello"
```

`/tmp/probe.ts` is a throwaway extension that dumps `before_provider_request` payloads, which show the injected blocks in place.
