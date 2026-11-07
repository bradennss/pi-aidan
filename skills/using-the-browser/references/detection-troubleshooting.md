# Detection troubleshooting with agent-browser

Use for authorized browsing that encounters bot detection, or requests for stealth or “undetectable” Chrome. Start with the parent skill's availability check and named-session workflow. Read installed CLI help before using version-sensitive options.

## Choose the least invasive option

A failed HTTP fetch doesn't necessarily mean the site detected automation. When the missing content is rendered by JavaScript, ordinary browser navigation with `open` followed by `snapshot` may be enough. If manual Chrome works but headless browsing fails, try a dedicated headed system-Chrome session with its own profile. This gives you a different browser environment to test, not an assurance that automation is hidden.

When the page requires login or human verification, ask the user to complete it in the task browser and preserve that session while they do so. If they specifically want to use an existing browser, attach only to an approved CDP endpoint and pin the task tab. A named agent-browser session keeps commands organized, but it doesn't isolate cookies inside a shared Chrome instance.

If local browsing still triggers detection, offer a cloud stealth provider and explain the cost and third-party data handling before proceeding. A persistent 429 or explicit access denial calls for stopping retries, respecting Retry-After, and requesting access or an API rather than escalating stealth settings to evade the limit.

These options have limits because detection can involve IP reputation, browser fingerprints, account history, and interaction patterns together. Changing a user agent, patching `navigator.webdriver`, moving the cursor in a human-like way, or passing a fingerprint test doesn't establish that the target site will accept automation. Piling on arbitrary spoofing scripts and Chrome flags can also create inconsistent fingerprints that make matters worse.

## Dedicated local Chrome

For local troubleshooting, launch an installed Chrome executable with a visible window and a dedicated profile outside the repository. That profile can preserve state across runs within the authorized task/account scope without exposing a personal profile through `--profile Default` or a copied directory. Using a personal profile still requires permission. Because profile directories retain credentials, keep them out of version control and avoid sharing one across concurrent browser processes.

Example for macOS (verify the executable exists first; use the discovered Chrome path on other platforms):

```sh
# Pick a unique session name and an unused dedicated profile path.
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

Set launch options on the first command, since later commands use the browser already running in that session. Changing the executable, profile, provider, or headed mode therefore means finishing and closing the session you own, then starting a new named session. Closing the browser doesn't erase the profile's sensitive state, so leave reusable profiles intact unless deletion is authorized.

A visible window also depends on having an accessible display. A remote system's virtual display may not be visible to the user; if human verification is needed, arrange an approved interactive connection rather than assuming headed mode alone lets them take over.

## Attach to Chrome only with permission

Prefer an explicit, user-approved endpoint over broad `--auto-connect` discovery. With a supported CLI, `--pin-tab` opens a fresh tab when unbound and prevents commands from silently jumping to someone else's tab.

```sh
# Only after the user approves this browser endpoint.
agent-browser --session attached-check-42 --cdp 9222 --pin-tab open https://example.com
agent-browser --session attached-check-42 snapshot
agent-browser --session attached-check-42 get text body
agent-browser --session attached-check-42 close
```

The session retains its CDP connection and tab pin, but the pin controls only which tab receives commands; it doesn't isolate credentials or restrict browser access. If that tab disappears, inspect the available tabs and explicitly select or create the task tab rather than unpinning and adopting someone else's. When finished, use `close` to end the agent-browser attachment while leaving the externally owned Chrome process and unrelated tabs alone.

For a separately launched debugging Chrome, bind debugging to loopback and use a dedicated, non-default `--user-data-dir`. Since Chrome 136, `--remote-debugging-port` and `--remote-debugging-pipe` aren't honored against the default Chrome data directory. Newer Chrome also has interactive remote-debugging approval flows; consult current CDP docs rather than changing the user's browser settings automatically. Never expose an unauthenticated debugging port publicly: it grants control of the browser and its sessions.

## Optional cloud stealth providers

Before creating a paid session or sending browsing/session data to a third party, explain those consequences and ask for approval. An existing API key doesn't establish consent to either. Once use is approved, have credentials provisioned through the environment or a secret manager so keys stay out of output, shell command history, and repository files. Check the current provider documentation against the installed CLI version before launching.

After approval, with `KERNEL_API_KEY` already provisioned:

```sh
KERNEL_STEALTH=true agent-browser --session kernel-check-42 --provider kernel open https://example.com
agent-browser --session kernel-check-42 snapshot
agent-browser --session kernel-check-42 get text body
agent-browser --session kernel-check-42 close
```

Kernel documents stealth as opt-in (`KERNEL_STEALTH=true`, default `false`). Its named persistent profiles must already exist; saving changes is separately controlled by `KERNEL_PROFILE_SAVE_CHANGES` (default `false`). Don't enable persistence of authenticated cloud state without approval.

Browserless is another supported option. With `BROWSERLESS_API_KEY` provisioned and use approved:

```sh
BROWSERLESS_STEALTH=true BROWSERLESS_BROWSER_TYPE=chrome \
  agent-browser --session browserless-check-42 --provider browserless open https://example.com
agent-browser --session browserless-check-42 snapshot
agent-browser --session browserless-check-42 get text body
agent-browser --session browserless-check-42 close
```

Browserless documents stealth as enabled by default and browser type as `chromium` by default; set `chrome` explicitly when Chrome is required. These are provider features, not a local `agent-browser --stealth` switch or a guarantee of bypass. Don't install a fork or launch-mutator plugin without checking its provenance, compatibility, and obtaining installation approval; plugins execute local code.

## Challenge handling and verification

Use `get url`, `get title`, and a full `snapshot` or `get text body` to establish whether the browser reached the intended content or a challenge, login, or error page. A 200 response alone doesn't distinguish them. If a challenge is visibly progressing, wait for a specific expected element, text, or URL with a bounded timeout rather than repeatedly reloading or hiding the failure behind long sleeps.

When CAPTCHA or another human interaction is required, ask the user to act in the same task session instead of automatically calling a solving service. Leave the browser available while they work, since starting over may lose clearance. After they finish, take a fresh snapshot and verify the requested content itself; the challenge disappearing isn't enough to establish success.

If access is still blocked, report the URL, observed blocker, browser mode tried, and remaining limitation without exposing cookies, tokens, or sensitive screenshots. Once the work or handoff is finished, close only the task session.

Existing security controls also constrain which workarounds are appropriate. For example, `--allowed-domains` rejects profiles, pre-existing CDP/auto-connect, and some other stateful modes because it cannot establish containment before scripts execute. Keep a compatible fresh browser, ask for an approved alternative, or use operator-managed network isolation rather than removing an allowlist to make a workaround run. TLS validation and Chrome's sandbox should likewise remain enabled when troubleshooting detection.

## Sources and support limits

Research checked against installed `agent-browser 0.41.1` help and its bundled core skill. Dedicated headed system Chrome with a temporary profile was smoke-tested for navigation and text retrieval, not detection bypass or authenticated-state restoration. CDP attachment and cloud stealth were not exercised; their setup is documentation-backed, not proof of target-site clearance. Recheck after upgrades.

- [Chrome executable, headed mode, profiles, and launch args](https://agent-browser.dev/engines/chrome)
- [CDP connections, auto-connect, and tab pinning](https://agent-browser.dev/cdp-mode)
- [Chrome 136 remote-debugging security changes](https://developer.chrome.com/blog/remote-debugging-port)
- [Kernel stealth and profile configuration](https://agent-browser.dev/providers/kernel)
- [Browserless stealth and browser type configuration](https://agent-browser.dev/providers/browserless)
- [Security, plugins, and domain-containment limitations](https://agent-browser.dev/security)
