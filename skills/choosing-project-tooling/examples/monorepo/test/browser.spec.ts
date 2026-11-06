import { execFileSync } from "node:child_process";
import { expect, test } from "@playwright/test";

// This suite owns only the disposable monorepo-browser Compose project.
function compose(...args: string[]) {
  return execFileSync(
    "docker",
    ["compose", "-p", "monorepo-browser", "--profile", "gateway", ...args],
    {
      encoding: "utf8",
      timeout: 60_000,
    },
  ).trim();
}

function counts() {
  return compose(
    "exec",
    "-T",
    "gateway-db",
    "psql",
    "-U",
    "monorepo_local",
    "-d",
    "monorepo_gateway",
    "-Atc",
    "SELECT (SELECT count(*) FROM reports), (SELECT count(*) FROM river_job)",
  );
}

test("submits real work, bounds pending polling, retries and retrieves the durable result after refresh", async ({
  page,
}) => {
  compose("stop", "worker");
  try {
    await page.goto("/");
    await page.getByLabel("Report text").fill("one two\nthree four five");
    await page.getByRole("button", { name: "Generate report" }).click();
    await expect(page.getByRole("status")).toContainText("Pending");
    await expect(page).toHaveURL(/\?report=[0-9a-f-]{36}$/);
    const reportURL = page.url();
    await expect(page.getByRole("alert")).toContainText("still pending", {
      timeout: 40_000,
    });
    let reads = 0;
    page.on("request", (request) => {
      if (request.method() === "GET" && request.url().includes("/api/reports/"))
        reads++;
    });
    await page.waitForTimeout(2500);
    expect(reads).toBe(0);
    compose("start", "worker");
    await page.getByRole("button", { name: "Check report again" }).click();
    await expect(page.getByRole("status")).toContainText("Complete");
    await expect(page.getByRole("status")).toContainText("5 words");
    compose("restart", "api");
    await expect
      .poll(async () => (await page.request.get("/up")).status())
      .toBe(200);
    await page.reload();
    await expect(page.getByRole("status")).toContainText("5 words");
    expect(page.url()).toBe(reportURL);
  } finally {
    compose("start", "worker");
  }
});

test("rejects input without writes and recovers from an actual API outage", async ({
  page,
}) => {
  await page.goto("/");
  const before = counts();
  await page.getByLabel("Report text").fill("   ");
  await page.getByRole("button", { name: "Generate report" }).click();
  await expect(page.getByRole("alert")).toContainText("Enter");
  expect(
    (await page.request.post("/api/reports", { data: { text: "" } })).status(),
  ).toBe(400);
  expect(counts()).toBe(before);
  await page.getByLabel("Report text").fill("\u0085");
  await page.getByRole("button", { name: "Generate report" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "rejected" }),
  ).toBeVisible();
  expect(counts()).toBe(before);
  compose("stop", "api");
  try {
    await page.getByLabel("Report text").fill("outage must not enqueue");
    await page.getByRole("button", { name: "Generate report" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "unavailable" }),
    ).toBeVisible();
    expect(counts()).toBe(before);
  } finally {
    compose("start", "api");
  }
  await expect
    .poll(async () => (await page.request.get("/up")).status())
    .toBe(200);
  await page.getByRole("button", { name: "Generate report" }).click();
  await expect(page.getByRole("status")).toContainText("4 words");
});

test("the real gateway denies unauthenticated UI, report reads and mutations without writes", async ({
  playwright,
  page,
}) => {
  const anonymous = await playwright.request.newContext({
    baseURL: "http://127.0.0.1:4184",
    httpCredentials: undefined,
  });
  try {
    const created = await page.request.post("/api/reports", {
      data: { text: "private result" },
    });
    const report = (await created.json()) as { id: string };
    const before = counts();
    for (const path of [
      "/",
      "/index.html",
      `/api/reports/${report.id}`,
      "/up/",
      "/up/private",
    ]) {
      expect((await anonymous.get(path)).status(), path).toBe(401);
    }
    expect(
      (
        await anonymous.post("/api/reports", {
          data: { text: "must not be stored" },
        })
      ).status(),
    ).toBe(401);
    expect((await anonymous.post("/up", { data: {} })).status()).toBe(401);
    expect((await anonymous.head("/up")).status()).toBe(401);
    const health = await anonymous.get("/up");
    expect(health.status()).toBe(200);
    expect(await health.json()).toEqual({ status: "ok" });
    expect(counts()).toBe(before);
  } finally {
    await anonymous.dispose();
  }
});
