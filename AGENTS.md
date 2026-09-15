# pi-aidan

A [Pi](https://pi.dev) extension that turns Pi into a coding agent named Aidan.

## Layout

- `index.ts` registers the `before_agent_start` and `context` handlers against the bundled `prompts/` directory.
- `src/inject.ts` reads the prompt files, appends to the system prompt, and places the injected messages.
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
