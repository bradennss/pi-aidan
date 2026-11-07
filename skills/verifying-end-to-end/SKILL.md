---
name: verifying-end-to-end
description: Use when tests leave a user-visible or connected-system outcome unverified, including UI, API, CLI, jobs, or integrations, or when evaluating prompt or skill behavior.
---

# Verifying end to end

## Choose the missing evidence

Look at what the existing tests cover and how the project is normally tested, then work out what else you need to check to know the change works. If you're fixing a bug, reproduce it and check that the fix gives the expected result.

- Use a browser for UI behavior or rendering.
- Send real HTTP requests for APIs or webhooks.
- Run a CLI as a user would.
- Trigger workers or jobs through their queue or scheduler entry point.
- For prompt or skill behavior, have fresh agents apply it to representative tasks.

Don't add a harness, start unrelated services, or test through boundaries that don't help answer the question. For example, check a CSV quoting fix by parsing exports containing commas and quotes.

Prose-only changes generally need review and repository checks instead of expensive trials. If you need to check how a prompt or skill affects agent behavior, try it with fresh agents on representative tasks. Loading and injection tests only tell you the guidance reached the agent, while agent trials show how it was used in those tasks. Treat those results as evidence for the tasks you tested, rather than assuming they apply to every task.

## Run and observe

1. Choose cases that cover the expected result and the ways the change could fail. For changes involving authorization, persistent data, infrastructure, or releases, consider what happens when access is denied, an operation only partly succeeds, or the system needs to retry or recover.
2. Run the changed code using the project's documented commands and safe local or disposable resources, rebuilding or restarting as needed so you're testing the current version. If a check would affect production or shared data, incur significant costs, send external notifications, or otherwise go beyond existing authorization, get permission before running it.
3. Try the chosen entry point and compare what the user or connected system receives with the expected result. If work continues in the background, wait for it to finish within a set time limit and check any lasting effects, such as saved data. Check that the work actually completed rather than relying on an accepted request or success message.
4. If you find failures caused by the change, fix them and rerun the affected checks. When something blocks testing, continue with the checks you can run independently and explain which part you couldn't test.
5. When you're done, remove the fixtures and stop the processes you created for this task, leaving pre-existing resources intact.

## Report what happened

Explain what you tested, how the results compared with what you expected, and what you couldn’t verify, including any dependencies or agent trials you couldn’t run. Share commands or artifacts that help someone understand or repeat the checks, and make it clear where you used mocks, sandboxes, or other substitutes instead of real dependencies.

Only claim what the checks you ran actually show, and be clear when a user flow still needs testing, even if the unit tests pass or you’ve written a plan for checking it.
