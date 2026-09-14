# pi-aidan

A [Pi](https://pi.dev) extension that turns Pi into a coding agent named Aidan. It ships skills and sends two prompts as hidden user messages on every request.

## What it does

- `prompts/rules.md` goes in front of the newest user message, wrapped in `<EXTREMELY_IMPORTANT>`. Reply styling, writing, and other rules live here.
- `prompts/after-write.md` goes after the tool results of a `write` or `edit` call, wrapped in `<IMPORTANT_REMINDER>`. Rule checking for files just written lives here.
- `skills/` holds skill folders, each with a `SKILL.md`.

Both prompt files are read from disk for every request, so edits apply to the next message without restarting Pi. A blank file injects nothing. The reminder is scoped to the request right after the write, so it never piles up in the session.

## Install

```sh
pi install /Users/personal/projects/pi-aidan
```

Or run it for one session without installing:

```sh
pi -e /Users/personal/projects/pi-aidan
```

## Writing the prompts

Edit `prompts/rules.md` and `prompts/after-write.md`. Plain Markdown, no frontmatter. The extension adds the wrapping tags.

## Adding a skill

```
skills/my-skill/SKILL.md
```

With frontmatter:

```markdown
---
name: my-skill
description: What this skill does and when to use it.
---
```

## Verify

```sh
pnpm run format
pnpm run typecheck
pnpm run lint
pnpm test
```

## Testing end-to-end

Run Pi with a second extension that dumps `before_provider_request` payloads, and `-ne` so nothing else loads:

```sh
pi -ne -e ./index.ts -e /tmp/probe.ts -p "hello"
```

The dumped payload should carry the `<EXTREMELY_IMPORTANT>` block in a user message right before the newest one.
