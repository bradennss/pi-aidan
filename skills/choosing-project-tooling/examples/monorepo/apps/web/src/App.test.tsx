import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import App from "./App";

const id = "21b13bb2-5f77-4e59-9183-b948ac9a3cc5";
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});

test("rejects whitespace-only input with an accessible field error", async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText("Report text"), "   ");
  await userEvent.click(
    screen.getByRole("button", { name: "Generate report" }),
  );
  expect(screen.getByRole("alert")).toHaveTextContent("Enter");
  expect(screen.getByLabelText("Report text")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
});

// Only malformed external transport data is substituted here. Auth, persistence,
// job execution and recovery are exercised with real services in browser.spec.ts.
test.each([
  null,
  { id, status: "complete", wordCount: -1 },
  { id, status: "complete", wordCount: 1.5 },
  { id, status: "complete", wordCount: "5" },
  { id, status: "complete", wordCount: Number.MAX_SAFE_INTEGER + 1 },
  { id, status: "pending", wordCount: 5 },
  { id, status: "complete" },
  { id, status: "unknown", wordCount: null },
  {
    id: "cd0667bc-1c67-4232-b86a-76b87e7af734",
    status: "complete",
    wordCount: 5,
  },
])(
  "refuses malformed report data rather than displaying a result: %j",
  async (body) => {
    window.history.replaceState(null, "", `/?report=${id}`);
    vi.stubGlobal("fetch", () =>
      Promise.resolve(
        new Response(JSON.stringify(body), {
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    render(<App />);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "invalid response",
    );
    expect(screen.queryByText(/\d+ words/)).not.toBeInTheDocument();
  },
);

test("refuses a non-JSON API response", async () => {
  window.history.replaceState(null, "", `/?report=${id}`);
  vi.stubGlobal("fetch", () =>
    Promise.resolve(
      new Response("<html>gateway</html>", {
        headers: { "Content-Type": "text/html" },
      }),
    ),
  );
  render(<App />);
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "invalid response",
  );
});

test("rejects a malformed saved report ID without starting retrieval", async () => {
  window.history.replaceState(null, "", "/?report=invalid");
  render(<App />);
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "invalid report link",
  );
});
