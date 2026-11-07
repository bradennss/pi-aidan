# Before-and-after examples

These are original teaching examples, not quotations from the upstream pages. Beacon, its CLI, and its service architecture are fictional. Each example supplies the facts its revision relies on; don't treat them as product documentation for a real tool. Output labeled illustrative wasn't captured from a running service.

Read the example closest to your task. The point is to learn the revision, not copy a universal template.

## 1. Instructions: make the starting point and result visible

**Supplied facts:** Beacon is already installed. `beacon init demo` creates a project in `demo`. Run `beacon preview` from the project directory; it prints a preview URL. The preview contains a page titled “Welcome to Beacon.” No fixed port is specified.

### Before

> Beacon makes starting projects effortless. Simply initialize your project and run the preview command. You can then start building amazing things!

### After

#### Preview your first Beacon project

With Beacon installed, create a project and enter its directory:

```sh
beacon init demo
cd demo
```

Start the preview:

```sh
beacon preview
```

Open the URL printed by the command. You should see a page titled “Welcome to Beacon.”

### Why the revision works

The reader can act without guessing the commands, working directory, or address. A visible checkpoint replaces the author's enthusiasm. Installation isn't silently invented or claimed to be covered.

For a longer tutorial, carry the same project forward and explain each new concept when it first changes what the reader does. Don't add every deployment option to this first-result path.

## 2. Explanation: show the mechanism before naming the property

**Supplied facts:** Beacon workers acknowledge a job after processing it. An unacknowledged job may be delivered again. A receipt service uses a unique operation ID and atomically records that ID with the balance update.

### Before

> Beacon provides at-least-once processing, so consumers should implement idempotency to avoid adverse effects.

### After

#### Why a balance update can be attempted twice

A worker can update an account balance and then crash before acknowledging its job. The queue hasn't received confirmation, so it may deliver the same job again. The missing acknowledgement doesn't tell us whether the balance changed.

The receipt service gives each intended balance update an operation ID. It records that ID and changes the balance in the same transaction. If the same operation arrives again, the recorded ID identifies an update that's already been applied.

That makes the balance update **idempotent**: repeating the operation doesn't apply the credit again. It doesn't stop duplicate delivery. It makes those repeated attempts safe for this particular side effect.

### Why the revision works

The unfamiliar term arrives after the reader has a reason to need it. The transaction is part of the mechanism, not an incidental detail: recording the ID separately would leave another failure gap. The explanation doesn't extend the guarantee to unrelated effects such as sending email.

## 3. Reference: distinguish the contract from the example

**Supplied facts:** This example uses the standard JavaScript Fetch API in an environment where `fetch` is available. The caller supplies a URL whose successful response is JSON.

### Before

> Use fetch to get JSON. It throws if the request fails.

### After

#### Fetching a JSON report

`fetch(url)` returns a promise for a `Response`. HTTP error statuses such as `404` and `500` still produce a response; they don't by themselves reject the promise. Check `response.ok` before reading a successful JSON body.

```js
async function readReport(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Report request failed: HTTP ${response.status}`);
  }
  return response.json();
}
```

`readReport` rejects if the request encounters a network failure, if its HTTP-status check throws, or if the response body can't be parsed as JSON. The explicit HTTP-status error comes from this function, not from `fetch` itself.

### Why the revision works

“Fails” hid several different outcomes. The revision names the distinction that affects callers and makes the code agree with the prose. It doesn't invent retries, authentication, a default URL, or a response schema.

## 4. Troubleshooting: give each action an interpretation

**Supplied facts:** A full Beacon workspace quota causes `beacon upload` to report `workspace quota exceeded`. `beacon usage` reports current usage and the workspace limit. The workspace administrator can approve a higher limit. No deletion or automatic retry policy is specified.

### Before

> If uploads don't work, check your settings and try again. Contact an administrator if the problem persists.

### After

#### Upload reports `workspace quota exceeded`

Run:

```sh
beacon usage
```

Compare current usage with the workspace limit. If the workspace is at its limit, ask the workspace administrator to approve an increase. Retrying the upload won't change the quota.

After the limit is increased, run `beacon upload` again. The quota error should no longer block the upload; another error may still need a separate diagnosis.

If usage is below the limit but the same error persists, send the administrator the workspace ID, the reported usage and limit, and the error timestamp. Don't include access tokens.

### Why the revision works

The heading matches the symptom. The diagnostic result determines the next action, and the success statement is limited to the problem actually addressed. The page doesn't recommend deleting data or invent a support address to look complete.

## 5. Architecture: explain where guarantees end

**Supplied facts:** Beacon's API writes a document and an outbox record in one database transaction. A dispatcher publishes outbox records to a queue. A worker sends notifications through an external provider. Queue redelivery is possible. Provider deduplication behavior and service ownership haven't been confirmed.

### Before

> The notification architecture consists of an API, database, dispatcher, queue, and worker. The outbox makes delivery reliable and prevents duplicate notifications.

### After

#### From saved document to notification

```text
API → database transaction: document + outbox record
                         ↓
                    dispatcher → queue → worker → provider
```

The database transaction keeps the document and its notification intent together: either both records commit or neither does. It doesn't include the queue or the provider.

After commit, the dispatcher publishes the outbox record. The worker then asks the provider to send the notification. Those later actions can fail independently of the original transaction.

Queue redelivery can cause another worker attempt. If the provider accepted an earlier send, a later attempt could send another notification. Provider deduplication hasn't been confirmed, so this design doesn't establish duplicate-free delivery.

Service ownership is also unresolved. Confirm it before using this page to route an incident.

### Why the revision works

The diagram carries the normal flow; the prose explains consistency and uncertainty. Naming the transaction boundary is more useful than describing the system as “reliable.” Unknown ownership stays unknown instead of becoming a fabricated team assignment.

## 6. Runbook: put irreversible consequences before commands

**Supplied facts:** `beacon exports inspect EXPORT_ID` reports an export's owner and state. `beacon exports remove EXPORT_ID` permanently removes its generated files. Removing an export in state `running` isn't allowed by the operational procedure. The incident lead must authorize removal. Inspection reports `not found` after a successful removal; no restore is available.

### Before

> To free space, remove old exports. Run `beacon exports remove EXPORT_ID`. If something goes wrong, restore the export and try again.

### After

#### Remove one confirmed obsolete export

This procedure permanently removes an export's generated files. **There's no restore.** Use it only for an export the incident lead has authorized you to remove.

1. Inspect the specific export, replacing `EXPORT_ID` with its actual ID:

   ```sh
   beacon exports inspect EXPORT_ID
   ```

2. Confirm its owner and state match the approved target. If the state is `running`, the target differs, or the result is unclear, stop and escalate to the incident lead.
3. Remove the confirmed export:

   ```sh
   beacon exports remove EXPORT_ID
   ```

4. Inspect the same ID again:

   ```sh
   beacon exports inspect EXPORT_ID
   ```

   `not found` is the expected result. If inspection still returns the export or the outcome is uncertain, record the ID and observed output and escalate before retrying.

### Why the revision works

The irreversible consequence and authorization appear before the action. The procedure stays scoped to one confirmed resource, includes a stop condition, and uses a success signal established by the supplied facts. There's no fictional rollback.

In a real runbook, also identify the environment and access requirements using the service's actual conventions. Don't invent a targeting flag to make the example look safer.

## 7. Onboarding: preserve what's already right

**Supplied facts:** The project changed its test command from `npm test` to `pnpm test`. The task is only to update that command.

### Before

> Install dependencies with pnpm install. Run npm test before opening a pull request. Ask your team buddy for access to the staging dashboard.

### After

> Install dependencies with pnpm install. Run pnpm test before opening a pull request. Ask your team buddy for access to the staging dashboard.

### Why the revision works

Only the inaccurate fact changes. Adding headings, version checks, or a contribution workflow would make this a larger edit without improving the requested correction. Good writing judgment includes knowing when not to rewrite.

## 8. Decision record: preserve the trade-off

**Supplied facts:** The team accepted a database-backed job queue for an internal prototype. Existing database operations are familiar to the team. The alternative is a managed queue. Expected workload is unknown; the team intends to revisit the choice if queue load affects interactive database traffic. No decision date or owner is supplied.

### Before

> We use the database queue because it's the simplest and best option. A managed queue would add unnecessary complexity.

### After

#### Use a database-backed queue for the prototype

**Status:** Accepted for the internal prototype.

The team chose the database-backed queue because it can operate it with the database tooling and knowledge it already has. A managed queue would separate queue traffic from the application database, but would introduce another service to configure and operate.

This choice shares database capacity between background jobs and interactive requests. The expected workload hasn't been established, so the decision isn't a claim that this approach will handle production traffic.

Revisit the choice if queue load affects interactive database traffic. The implementation should link to this record so that limitation stays visible as the prototype grows.

### Why the revision works

The record states what was accepted and for which scope. It preserves the alternative's real advantage and the chosen approach's cost. Unknown workload isn't turned into an invented throughput target, date, or owner.
