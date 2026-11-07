# Detection troubleshooting with agent-browser

Use this page for authorized browsing that encounters bot detection, or for requests involving stealth or “undetectable” Chrome. Follow the parent skill's availability check and named-session workflow first. The options below can vary by version, so check the installed CLI's help before using them.

## Identify the blocker before changing settings

A failed HTTP fetch doesn't necessarily mean the site detected automation. If JavaScript renders the missing content, ordinary navigation with `open` followed by `snapshot` may be enough. If manual Chrome works but headless browsing fails, a dedicated headed system-Chrome session gives you a different browser environment to test. It doesn't establish that automation is hidden.

Choose the next step based on what the page shows:

- **Login or human verification:** Ask the user to complete it in the task browser, keeping that session available while they work.
- **A need to use an existing browser:** Attach only to a user-approved CDP endpoint and pin the task tab. A named agent-browser session organizes commands but doesn't isolate cookies within a shared Chrome instance.
- **Detection that persists in a local browser:** Offer a cloud stealth provider, explaining the cost and third-party data handling before asking for approval.
- **A persistent 429 or explicit access denial:** Stop retrying, respect `Retry-After`, and request access or an API. Don't escalate stealth settings to evade the limit.

Detection can combine IP reputation, browser fingerprints, account history, and interaction patterns. That means changing one signal—such as the user agent or `navigator.webdriver`—doesn't establish that the target site will accept automation. Neither does human-like cursor movement or passing a fingerprint test. Adding arbitrary spoofing scripts and Chrome flags can make matters worse by producing an inconsistent fingerprint.

## Try a dedicated local Chrome session

Launch an installed Chrome executable with a visible window and a dedicated profile outside the repository. This lets the task preserve state across runs within the authorized account and task scope without exposing a personal profile. Using `--profile Default` or copying a personal profile still requires permission.

Profile directories retain credentials, so keep them out of version control and don't share one across concurrent browser processes. The example below uses a unique session name and an unused profile path. Verify that the executable exists first; on platforms other than macOS, substitute the discovered Chrome path.

```sh
agent-browser --session chrome-check-42 \
  --executable-path "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headed --profile "$HOME/.agent-browser/profiles/chrome-check-42" \
  open https://example.com
agent-browser --session chrome-check-42 snapshot
agent-browser --session chrome-check-42 get title
agent-browser --session chrome-check-42 get text body
# If human interaction is needed, leave this open until the user finishes.
agent-browser --session chrome-check-42 close
```

Launch options belong on the first command because later commands connect to the browser already running in that session. To change the executable, profile, provider, or headed mode, finish and close the session you own, then start a new named session. Closing the browser doesn't erase the profile's sensitive state; leave reusable profiles intact unless deletion is authorized.

Headed mode also needs a display the user can reach. A remote system's virtual display may not be visible to them, so arrange an approved interactive connection when human verification is needed rather than assuming a visible-window setting is enough.

## Attach to an existing Chrome browser

Attaching exposes the browser's sessions, so get permission for a specific endpoint before connecting. Prefer that explicit endpoint over broad `--auto-connect` discovery. With a supported CLI, `--pin-tab` opens a fresh tab when unbound and keeps commands from silently jumping to someone else's tab.

After the user approves the endpoint:

```sh
agent-browser --session attached-check-42 --cdp 9222 --pin-tab open https://example.com
agent-browser --session attached-check-42 snapshot
agent-browser --session attached-check-42 get text body
agent-browser --session attached-check-42 close
```

The session retains its CDP connection and tab pin, but pinning only controls which tab receives commands. It doesn't isolate credentials or restrict browser access. If the task tab disappears, inspect the available tabs and explicitly select or create its replacement rather than unpinning and adopting someone else's tab.

When finished, use `close` to end the agent-browser attachment. Leave the externally owned Chrome process and unrelated tabs alone.

### Launching a separate debugging browser

Bind debugging to loopback and use a dedicated, non-default `--user-data-dir`. An unauthenticated debugging port grants control of the browser and its sessions, so never expose it publicly.

Since Chrome 136, `--remote-debugging-port` and `--remote-debugging-pipe` aren't honored against the default Chrome data directory. Newer Chrome also has interactive remote-debugging approval flows. Consult the current CDP documentation for the installed version rather than changing the user's browser settings automatically.

## Consider a cloud stealth provider

Cloud browsing can incur charges and send page or session data to a third party. Explain both consequences and get approval before creating a paid session or sending data; an existing API key doesn't establish consent.

Once use is approved, provision credentials through the environment or a secret manager to keep keys out of output, shell command history, and repository files. Check the provider's current documentation against the installed CLI version before launching.

### Kernel

With use approved and `KERNEL_API_KEY` provisioned:

```sh
KERNEL_STEALTH=true agent-browser --session kernel-check-42 --provider kernel open https://example.com
agent-browser --session kernel-check-42 snapshot
agent-browser --session kernel-check-42 get text body
agent-browser --session kernel-check-42 close
```

Kernel documents stealth as opt-in: `KERNEL_STEALTH` defaults to `false`, so the example enables it explicitly. Persistent profiles have separate requirements: named profiles must already exist, and saving changes is controlled by `KERNEL_PROFILE_SAVE_CHANGES`, which also defaults to `false`. Get approval before enabling persistence of authenticated cloud state.

### Browserless

With use approved and `BROWSERLESS_API_KEY` provisioned:

```sh
BROWSERLESS_STEALTH=true BROWSERLESS_BROWSER_TYPE=chrome \
  agent-browser --session browserless-check-42 --provider browserless open https://example.com
agent-browser --session browserless-check-42 snapshot
agent-browser --session browserless-check-42 get text body
agent-browser --session browserless-check-42 close
```

Browserless documents stealth as enabled by default, but its default browser type is `chromium`. Set `BROWSERLESS_BROWSER_TYPE=chrome` explicitly when Chrome is required.

These stealth settings are provider features, not a local `agent-browser --stealth` switch or a guarantee of access. Forks and launch-mutator plugins aren't interchangeable substitutes: plugins execute local code, so check their provenance and compatibility and obtain installation approval before using them.

## Handle challenges and verify access

Inspect `get url`, `get title`, and a full `snapshot` or `get text body` to determine whether you've reached the intended content. A challenge, login screen, or error page can return a 200 response, so the status alone isn't evidence of access.

If a challenge is visibly progressing, wait for a specific expected element, text, or URL with a bounded timeout. Repeated reloads can interrupt that progress, while long sleeps leave you without an observable condition for success.

When CAPTCHA or another human interaction is required, ask the user to act in the same task session instead of automatically calling a solving service. Keep the browser available because starting over may lose clearance. After the user finishes, take a fresh snapshot and check the requested content itself; the challenge disappearing isn't enough.

If access remains blocked, report:

- The URL and observed blocker.
- The browser mode tried.
- What you still couldn't verify.

Keep cookies, tokens, and sensitive screenshots out of that report. Once the work or handoff is finished, close only the task session.

## Preserve existing security controls

A workaround still needs to fit the task's security controls. For example, `--allowed-domains` rejects profiles, pre-existing CDP/auto-connect, and some other stateful modes because it can't establish containment before scripts execute. If a proposed setup conflicts with that control, keep a compatible fresh browser, ask for an approved alternative, or use operator-managed network isolation. Don't remove the allowlist just to make the workaround run.

Keep TLS validation and Chrome's sandbox enabled while troubleshooting detection. Browser access isn't a reason to weaken those protections.

## Sources and verification limits

The original research used installed `agent-browser 0.41.1` help and its bundled core skill. A dedicated headed system-Chrome session with a temporary profile was smoke-tested for navigation and text retrieval. That test didn't establish detection bypass or authenticated-state restoration.

CDP attachment and cloud stealth weren't exercised. Their setup is backed by documentation, not a demonstration that a target site will allow access. Recheck version-sensitive behavior after upgrades.

- [Chrome executable, headed mode, profiles, and launch args](https://agent-browser.dev/engines/chrome)
- [CDP connections, auto-connect, and tab pinning](https://agent-browser.dev/cdp-mode)
- [Chrome 136 remote-debugging security changes](https://developer.chrome.com/blog/remote-debugging-port)
- [Kernel stealth and profile configuration](https://agent-browser.dev/providers/kernel)
- [Browserless stealth and browser type configuration](https://agent-browser.dev/providers/browserless)
- [Security, plugins, and domain-containment limitations](https://agent-browser.dev/security)
