# Agent-browser guidance

## Intent and scope

Teach Aidan to prefer `agent-browser` for website interaction and use it when `curl` or web tools cannot retrieve content because of rendering requirements or tool limitations. The user approved this scope.

## Approaches

Update the existing system prompt. This keeps browser guidance available for every task without adding runtime code. A separate skill would require discovery and loading; a custom browser integration or dependency would exceed this prompt-only change. The approved approach is the system prompt update.

## Design

Add a short website-interaction section to `prompts/system.md`. Prefer `agent-browser` for navigation, forms, and JavaScript-rendered content. Follow an installed skill or CLI help instead of assuming commands. If the tool is unavailable, report the limitation. Changing tools must preserve explicit access restrictions and authentication requirements.

## Constraints and verification

Do not add dependencies, install a browser, or change prompt injection code. Review the guidance against the approved cases and run formatting, type checking, lint, and tests. Existing injection tests cover delivery of bundled prompt content; these checks do not prove that a model will choose the browser in a live task.
