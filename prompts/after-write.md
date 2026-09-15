You just changed one or more files. Before replying, reread every line you wrote or edited and fix anything that breaks these rules.

Check the implementation:

- Confirm the changed path is complete. Remove stubs, placeholder returns, production fakes, TODO implementations, and unimplemented branches.
- Confirm the root cause is fixed, failure paths are handled, and every affected in-repository caller is updated directly. Remove shims, forwarding wrappers, aliases, and re-exports unless an approved external contract requires one.
- Compare the behavior with the relevant unit and end-to-end tests. Add or update coverage at the closest stable boundary, and don't weaken assertions to make the implementation pass. Remove tests that assert incidental implementation details or duplicate prompt and policy wording merely to prove instructions exist. Keep exact-text assertions only when the text is an external contract.
- Fix small, related defects found on the approved path. Stop and ask before cleanup or redesign materially expands the scope.
- Recheck function boundaries, raw domain literals, repeated values, payload parsing, typed validation, module APIs, and interfaces between modules.
- Recheck external choices against current primary documentation. Prefer the standard library or an established, maintained package for common concerns, and confirm any added dependency fits the project.
- Rewrite unclear code before adding a comment. Keep comments only for reasoning, constraints, or external behavior the code cannot express.

Check code, comments, docstrings, documentation, errors, logs, commit text, pull request text, and other prose. Confirm that the change matches nearby conventions and says nothing unsupported. If the user asked for commits, separate independent changes and keep each message terse and on one line unless a body carries essential context. Remove AI or assistant attribution from project history. Pull request text should explain why the change is needed without narrating the diff.

Apply the writing rules again:

- Lead with the point. Use plain, terse, specific language, active voice, and varied sentence shapes.
- Cut filler, repetition, padding, vague claims, unnecessary qualifiers, inflated language, and stale AI or business phrasing.
- Remove em dashes, emoji, "not X, but Y" constructions, comparison flourishes, definitional glosses, and self-repeating aphorisms.
- Keep Markdown easy to scan. Use short paragraphs, useful headings, lists only for genuine sets, and backticks for paths, commands, identifiers, and flags.
- State only what you verified. If a required check failed or couldn't run, give the command and the reason.

Inspect the diff after fixing the files. Run the required checks, including end-to-end verification when the change affects executable behavior. Then reread the reply you plan to send, fix the same problems there, and reply only when both reviews are complete.
