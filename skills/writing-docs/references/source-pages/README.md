# Full-page writing examples

These are complete page sources, not excerpts or summaries. Choose a page that solves a writing problem like yours; don't load the whole collection for a small edit. Learn from the writing, and verify product facts separately when documenting a real system.

The commentary below is ours. The copied pages retain their original wording and accompanying notices. They aren't offline builds of the source websites: site-specific links, macros, and presentation components remain in the sources.

## Django: guide the reader to a visible result

**[Writing your first Django app, part 1](django/docs/intro/tutorial01.txt)** — Django Software Foundation and individual contributors. [Public page](https://docs.djangoproject.com/en/5.2/intro/tutorial01/) · [Source](https://github.com/django/django/blob/4d94b0d730b805215e49db42859c43cb11f4de7c/docs/intro/tutorial01.txt) · [BSD notice](django/LICENSE).

The tutorial states what readers will build, checks the starting environment, names files and working directories, and provides visible checkpoints. It explains “projects vs. apps” when the distinction first matters. The “Page not found?” note anticipates a specific mistake rather than offering generic troubleshooting.

Borrow this approach for quickstarts and onboarding. For a runbook, use the same clear starting state and checkpoints without adopting the tutorial's teaching pace.

This is reStructuredText source for Django 5.2. `:doc:` and `:ref:` are site cross-references; `|version|` and `|today|` are build substitutions. All code examples are inline.

## MDN: be precise about behavior

**[Using the Fetch API](mdn/files/en-us/web/api/fetch_api/using_fetch/index.md)** — Mozilla Contributors. [Public page](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) · [Source](https://github.com/mdn/content/blob/288e644117c29285df2acf37a2ac97f57546a146/files/en-us/web/api/fetch_api/using_fetch/index.md) · [License notice](mdn/LICENSE.md).

The opening example checks `response.ok` before parsing JSON, then explains why a resolved promise doesn't establish HTTP success. Later sections explain consumed bodies, cloning, and CORS restrictions. The page teaches a useful path without hiding the distinctions that affect callers.

Borrow that precision for API reference, troubleshooting, and descriptions of consistency guarantees. Keep caveats close to the behavior they qualify.

MDN macros such as `{{domxref(...)}}` need the site's renderer to become links. Illustrative resources such as `flowers.jpg` aren't bundled assets. Prose is [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/); the retained notice describes the separate code-example terms.

## Vue: motivate an abstraction before introducing it

**[Computed Properties](vue/src/guide/essentials/computed.md)** — Yuxi (Evan) You and Vue documentation contributors. [Public page](https://vuejs.org/guide/essentials/computed.html) · [Source](https://github.com/vuejs/docs/blob/40aa88af0094f7bab4aaf786e55c748a6a251d88/src/guide/essentials/computed.md) · [CC BY 4.0 notice](vue/LICENSE).

Read “Basic Example” through “Computed Caching vs. Methods.” The page begins with an awkward expression, refactors it, then explains how caching changes behavior. The `Date.now()` counterexample shows the abstraction's boundary. “Best Practices” distinguishes derived values from mutable source state.

Borrow this progression for explanations: recognizable problem, concrete example, useful abstraction, then a limitation that prevents a misconception.

Both Options API and Composition API branches are preserved; the live site selects between them. Custom components and playground links remain in the source. `./watchers` refers to the upstream guide. No images are copied; the docs' license excludes images from its grant.

## Laravel: organize around things readers need to do

**[Configuration](laravel/configuration.md)** — Taylor Otwell and Laravel documentation contributors. [Public page](https://laravel.com/docs/12.x/configuration) · [Source](https://github.com/laravel/docs/blob/5b8c610735c8af96a3bda4e37a820b27dc40aee9/configuration.md) · [MIT notice](laravel/license.md).

Headings answer recognizable tasks: inspect configuration, retrieve a value, cache configuration, or enable maintenance mode. The caching section places the consequences for `env()` calls beside the relevant command. Examples are short enough to consult without reading the whole page.

Borrow the organization and information placement for configuration reference and internal operating guides, not promotional language or unqualified performance claims.

`{{version}}` is the site's version substitution for 12.x. Site-root links lead to Laravel's docs. Maintenance-mode and encryption commands are examples to study, not instructions to run while reading this skill.

## The Rust Book: earn the shortcut

**[Recoverable Errors with Result](rust/src/ch09-02-recoverable-errors-with-result.md)** — The Rust Project Developers; Steve Klabnik, Carol Nichols, and contributors. [Public page](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html) · [Source](https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch09-02-recoverable-errors-with-result.md) · [MIT notice](rust/LICENSE-MIT).

The chapter explains what successful and failed values contain before teaching propagation. It shows explicit `match` expressions, then shorter forms, then a case where `?` cannot work. Readers learn why the shortcut works instead of only memorizing its syntax.

Borrow this sequence for difficult concepts and architecture explanations: establish the mechanism, introduce the convenience, then explain its boundary.

This is mdBook source. All 14 code/output files referenced by `{{#include ...}}` and `{{#rustdoc_include ...}}` are included under `rust/listings/ch09-error-handling/`, using the original relative paths. Read the named file when you encounter an include; `:here` selects the region marked by `ANCHOR` comments. `<Listing>` wrappers contain captions. Links to other chapters remain upstream references.

## Stripe: task-oriented instructions

[Stripe's payment integration guide](https://docs.stripe.com/payments/accept-a-payment) is an additional model for connecting requirements, server/client steps, and a useful final result. Apply that task orientation to the original instructional examples in this skill.

Stripe is linked rather than copied because no redistribution permission was established for its documentation.

## Using these sources

The pages were retrieved on November 7, 2026. Source links above identify the copied revisions; public pages may change. The copies retain their own licenses and don't imply endorsement of this skill by their authors.

For internal docs, combine the techniques rather than copying a public-docs format wholesale: Django's checkpoints help a runbook, Rust's causal explanation helps architecture, MDN's precision helps a service contract, and Laravel's headings help readers find the right operation.
