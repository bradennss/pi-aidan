---
name: brainstorming
description: Turn a vague request into a short written spec before any code gets written. Use when the ask is open-ended ("make this better", "we should probably add", "something like X"), when the user says they are not sure what they want, when scope or success criteria are missing, or when they ask to brainstorm, explore options, or think something through.
---

# Brainstorming

Finish with a spec short enough to paste into a PR description and specific enough that two engineers reading it would build the same thing.

## Read before you ask

Open the relevant files first. Anything the repo answers, answer yourself: how the current version works, what the types are, where the call sites are, whether the thing already half exists. "`inject.ts` already appends after the last tool result, do you want the new block before it or after?" takes one word to answer. "How should injection work?" makes the user explain their own codebase back to you.

A handful of reads is enough. You're hunting for the constraints that turn the vague ask concrete, so stop once you have them.

## Two kinds of vague

**They know, they just haven't said it.** Tell by asking one probe: "what should happen when the file is empty?" A crisp answer means the shape is in their head. Pull it out with targeted questions.

**They don't know yet.** Any answer is "I guess either way". Stop asking and start proposing. Give two or three concrete options with the tradeoff that separates them and say which one you would pick. "What would you like?" hands the problem back.

## Asking well

Ask in small rounds, roughly three questions at a time, and keep going until you could write the spec without guessing. Each round should be narrower than the last; if round four is still as broad as round one, you are missing something in the code, so go read it.

Every question carries concrete options and a default you recommend, so the cheapest reply is "yeah, the default". Phrase it as a veto: "I'll store it in the existing `config.json` unless you want a separate file."

Only ask about decisions that are expensive to reverse:

- Data shape and anything persisted
- Public API, CLI flags, config keys other people will depend on
- Where state lives and who owns it
- What breaks for existing users
- Whether this replaces the current thing or sits beside it

Naming, file layout, and internal structure are an hour to change later. Decide those yourself and mention the choice in the spec.

## The shortlist

When nothing else is obvious, these five pull the most signal:

1. What is the smallest version that is actually useful?
2. Who hits this, and how often?
3. What is explicitly out of scope?
4. How do we know it works? Name the command, the test, or the thing you click.
5. What existing behavior must not change?

## Write the spec

Under 20 lines, in the chat, before any code:

```
Goal: one sentence.
Behavior:
  - observable thing 1
  - observable thing 2
Out of scope: the tempting adjacent work, named.
Done when: `pnpm test` passes and running X prints Y.
Open questions: ones that don't block starting.
```

Get a yes, then build. If they correct one line, fix that line and start.

## Don't

- Dump ten questions at once. The answers to six through ten will be wrong because the user is bored by then. Small rounds, as many as it takes.
- Ask what the first file you open would have told you.
- Let scope grow. "While we're in there" belongs under Out of scope.
- Guess silently and then present 400 lines built on the guess. That is the failure this skill exists to prevent.
- Brainstorm a small change. Twenty reversible lines with an obvious shape: write it, show the diff, skip all of this.
