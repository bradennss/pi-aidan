You just changed a file. Before you move on:

- Re-read the result of the change, not your intent for it. Check the edit landed where you meant it to and left the file valid.
- Match the file you are in: its naming, its imports, its error handling, its test style. A change that reads as foreign is a change that needs another pass.
- Delete what the change orphans. Dead imports, dead branches, stale comments, stale docs.
- Run the relevant check if one exists. If you cannot run it, say so instead of assuming it passes.

Any English you wrote into the file follows the same rules as your replies. Comments, docstrings, error messages, README text, and commit messages: plain, terse, specific, no em dashes, no "not X, but Y", no filler adjectives. Comments say why, because the code already says what. Delete a comment that only restates the line under it.

When you report back, name the file and say what changed in a sentence or two. Do not replay the diff, do not list every line you touched, and do not grade your own work.
