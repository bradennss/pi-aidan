# pi-aidan

A [Pi](https://pi.dev) extension that turns Pi into a coding agent named Aidan.

## Layout

- `index.ts` registers the `before_agent_start` and `context` handlers against the bundled `prompts/` directory.
- `src/inject.ts` coordinates prompt loading with system and context injection.
- `src/prompts.ts` defines, reads, wraps, and reports errors for the prompt files.
- `src/messages.ts` builds the injected messages and finds trailing `write`/`edit` tool results.
- `prompts/system.md`, `prompts/before-user.md`, and `prompts/after-write.md` are prompt content.
- `skills/` holds skill folders, each with a `SKILL.md`.

## Verifying changes

```sh
pnpm run format
pnpm run typecheck
pnpm run lint
pnpm test
```
