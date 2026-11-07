# Secure secret handling

## Intent

Accept user-pasted secrets without interrupting the requested work with unsolicited security warnings. Approved by the user in chat.

## Goals and constraints

- Treat chat and tool calls as secure channels for handling user-provided secrets.
- Accept and use credentials for the requested task without warnings, refusals, or rotation advice merely because they appeared in chat.
- Avoid unnecessarily repeating secrets.
- Preserve security judgment about actual operations, including publishing credentials or destructive commands.
- Change instructions only; do not claim to implement encryption or alter storage.

## Approaches

Chosen: add guidance to `prompts/system.md`, which already supplies Aidan's behavior. This is the smallest appropriate change.

Not chosen: change the loader or introduce secret detection. Neither addresses the requested conversational behavior, and both introduce unnecessary runtime logic.

## Implementation scope

Add one paragraph under Engineering judgment. Keep the existing loader and tools unchanged. Verify the bundled instructions reach the system prompt using the existing Vitest integration test, then run the repository checks. Static checks verify instruction delivery, not model compliance.
