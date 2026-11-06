import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "./components/arc/button/button";
import { Textarea } from "./components/arc/textarea/textarea";
import "./styles.css";

type Report =
  | { id: string; status: "pending"; wordCount: null }
  | { id: string; status: "complete"; wordCount: number };

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const invalidResponse =
  "The API returned an invalid response. Try again or contact the operator.";

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function request(
  path: string,
  init: RequestInit,
  signal: AbortSignal,
): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(path, {
      ...init,
      signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]),
    });
  } catch {
    throw new Error(
      "The API is unavailable. Check your connection and try again.",
    );
  }
  if (response.status === 400)
    throw new Error(
      "The API rejected this text. Use 1 to 10000 characters without NUL and try again.",
    );
  if (response.status === 404)
    throw new Error(
      "Report not found. Check the link or generate a new report.",
    );
  if (!response.ok)
    throw new Error("The API is unavailable. Try again shortly.");
  if (
    response.status !== (init.method === "POST" ? 202 : 200) ||
    !response.headers.get("Content-Type")?.includes("application/json")
  ) {
    throw new Error(invalidResponse);
  }
  try {
    return (await response.json()) as unknown;
  } catch {
    throw new Error(invalidResponse);
  }
}

function decodeReport(value: unknown, id: string): Report {
  if (object(value) && Object.keys(value).length === 3 && value.id === id) {
    if (value.status === "pending" && value.wordCount === null)
      return { id, status: "pending", wordCount: null };
    if (
      value.status === "complete" &&
      typeof value.wordCount === "number" &&
      Number.isSafeInteger(value.wordCount) &&
      value.wordCount >= 0
    ) {
      return { id, status: "complete", wordCount: value.wordCount };
    }
  }
  throw new Error(invalidResponse);
}

function subscribeURL(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}
function reportFromURL() {
  return new URLSearchParams(window.location.search).get("report");
}
function message(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Could not retrieve the report. Try again.";
}

export default function App() {
  const id = useSyncExternalStore(subscribeURL, reportFromURL, () => null);
  const [text, setText] = useState("");
  const [fieldError, setFieldError] = useState<string>();
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const busy =
    submitting ||
    (id !== null &&
      !error &&
      (report?.id !== id || report.status !== "complete"));

  useEffect(() => {
    const controller = new AbortController();
    async function poll() {
      if (id === null) return;
      try {
        if (!uuid.test(id))
          throw new Error(
            "This is an invalid report link. Generate a new report below.",
          );
        // The whole polling session and each HTTP request have finite budgets.
        const deadline = AbortSignal.timeout(30_000);
        const signal = AbortSignal.any([controller.signal, deadline]);
        while (!signal.aborted) {
          const result = decodeReport(
            await request(`/api/reports/${id}`, {}, signal),
            id,
          );
          if (signal.aborted) break;
          setReport(result);
          setError(null);
          if (result.status === "complete") return;
          await new Promise<void>((resolve) => {
            const done = () => {
              clearTimeout(timer);
              signal.removeEventListener("abort", done);
              resolve();
            };
            const timer = setTimeout(done, 1000);
            signal.addEventListener("abort", done, { once: true });
          });
        }
        if (!controller.signal.aborted)
          setError(
            "This report is still pending. Automatic checks stopped after 30 seconds. Check the report again shortly.",
          );
      } catch (error) {
        if (!controller.signal.aborted) setError(message(error));
      }
    }
    void poll();
    return () => controller.abort();
  }, [id, attempt]);

  async function generate() {
    if (busy) return;
    const length = [...text.trim()].length;
    if (length < 1 || length > 10000 || text.includes("\0")) {
      setFieldError("Enter 1 to 10000 characters of text without NUL.");
      return;
    }
    setFieldError(undefined);
    setError(null);
    setSubmitting(true);
    try {
      const value = await request(
        "/api/reports",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        },
        new AbortController().signal,
      );
      if (
        !object(value) ||
        Object.keys(value).length !== 2 ||
        typeof value.id !== "string" ||
        !uuid.test(value.id) ||
        value.status !== "pending"
      ) {
        throw new Error(invalidResponse);
      }
      setReport({ id: value.id, status: "pending", wordCount: null });
      const url = new URL(window.location.href);
      url.searchParams.set("report", value.id);
      window.history.pushState(null, "", url);
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (error) {
      setError(message(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page">
      <header>
        <h1>Word-count reports</h1>
        <p>Submit text for a durable count of whitespace-separated words.</p>
      </header>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void generate();
        }}
      >
        <Textarea
          label="Report text"
          rows={7}
          value={text}
          onChange={(event) => setText(event.target.value)}
          description="Use 1 to 10000 characters. Your text is stored with the report."
          error={fieldError}
        />
        <Button
          type="submit"
          loading={submitting}
          disabled={busy && !submitting}
        >
          Generate report
        </Button>
      </form>
      <section aria-labelledby="result-heading" className="result">
        <h2 id="result-heading">Report result</h2>
        <div role="status" aria-live="polite" className="status">
          {report?.id === id && report.status === "complete" ? (
            <>
              <span>Complete</span>
              <p className="count">
                {report.wordCount} {report.wordCount === 1 ? "word" : "words"}
              </p>
            </>
          ) : id !== null ? (
            <p>
              {report?.id === id
                ? "Pending. Waiting for the worker."
                : "Retrieving report."}{" "}
              {busy ? "Please wait before generating another report." : ""}
            </p>
          ) : (
            <p>No report yet. Enter text to generate one.</p>
          )}
        </div>
        {id && uuid.test(id) && (
          <p className="report-id">
            Report ID: {id}
            <br />
            Keep this page URL to retrieve your report after a refresh.
          </p>
        )}
        {error && (
          <div className="error">
            <p role="alert">{error}</p>
            {id && uuid.test(id) && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setError(null);
                  setAttempt(attempt + 1);
                }}
              >
                Check report again
              </Button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
