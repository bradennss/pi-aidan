import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { test, expect } from "@playwright/test";
import { testPool } from "./database";

test("gateway denies unauthenticated reads, including RSC, and wrong credentials", async ({
  playwright,
}) => {
  const anonymous = await playwright.request.newContext({
    baseURL: "http://127.0.0.1:8088",
    httpCredentials: undefined,
  });
  try {
    for (const headers of [
      {},
      { RSC: "1" },
      { "X-Forwarded-User": "stateful-test", "X-Forwarded-For": "127.0.0.1" },
      {
        Authorization: `Basic ${Buffer.from("stateful-test:wrong").toString("base64")}`,
      },
    ] as Record<string, string>[]) {
      const response = await anonymous.get("/", { headers });
      expect(response.status()).toBe(401);
      expect(response.headers()["www-authenticate"]).toContain("Basic");
      expect(await response.text()).not.toContain("Task title");
    }
  } finally {
    await anonymous.dispose();
  }
});

test("denied replays of real create and complete actions leave all task data unchanged", async ({
  page,
  playwright,
}) => {
  const pool = testPool();
  const title = `Gateway replay ${randomUUID()}`;
  const anonymous = await playwright.request.newContext({
    baseURL: "http://127.0.0.1:8088",
    httpCredentials: undefined,
  });
  try {
    await page.goto("/");
    await page.getByLabel("Task title").fill(title);
    const creating = page.waitForRequest(
      (request) => request.method() === "POST",
    );
    await page.getByRole("button", { name: "Add task", exact: true }).click();
    const create = await creating;
    const row = page.getByRole("listitem").filter({ hasText: title });
    await expect(row).toBeVisible();
    const completing = page.waitForRequest(
      (request) => request.method() === "POST",
    );
    await row
      .getByRole("button", { name: "Mark complete", exact: true })
      .click();
    const complete = await completing;
    await expect(row.getByText("Completed", { exact: true })).toBeVisible();
    const before = (
      await pool.query("select id, title, completed from tasks order by id")
    ).rows;
    for (const request of [create, complete]) {
      const headers = await request.allHeaders();
      delete headers.authorization;
      delete headers.cookie;
      delete headers["content-length"];
      for (const extra of [
        {},
        {
          Authorization: `Basic ${Buffer.from("stateful-test:wrong").toString("base64")}`,
        },
      ] as Record<string, string>[]) {
        const response = await anonymous.post("/", {
          headers: { ...headers, ...extra },
          data: request.postDataBuffer()!,
        });
        expect(response.status()).toBe(401);
        expect(await response.text()).not.toContain(title);
      }
    }
    expect(
      (await pool.query("select id, title, completed from tasks order by id"))
        .rows,
    ).toEqual(before);
  } finally {
    await anonymous.dispose();
    await pool.query("delete from tasks where title = $1", [title]);
    await pool.end();
  }
});

test("only GET /up is public; readiness fails safely during a database outage and recovers", async ({
  playwright,
}) => {
  test.setTimeout(60_000);
  const anonymous = await playwright.request.newContext({
    baseURL: "http://127.0.0.1:8088",
    httpCredentials: undefined,
  });
  try {
    const healthy = await anonymous.get("/up");
    expect(healthy.status()).toBe(200);
    expect(await healthy.json()).toEqual({ status: "ok" });
    expect((await anonymous.post("/up")).status()).toBe(401);
    expect((await anonymous.get("/up/anything")).status()).toBe(401);
    execFileSync(
      "docker",
      [
        "compose",
        "--project-name",
        "stateful-task-tracker",
        "--file",
        "compose.yml",
        "stop",
        "test-db",
      ],
      { timeout: 30_000 },
    );
    const unavailable = await anonymous.get("/up");
    expect(unavailable.status()).toBe(503);
    expect(await unavailable.json()).toEqual({ status: "unavailable" });
  } finally {
    execFileSync(
      "docker",
      [
        "compose",
        "--project-name",
        "stateful-task-tracker",
        "--file",
        "compose.yml",
        "up",
        "-d",
        "--wait",
        "test-db",
      ],
      { timeout: 30_000 },
    );
    await expect
      .poll(async () => (await anonymous.get("/up")).status())
      .toBe(200);
    await anonymous.dispose();
  }
});

test("task survives an application restart through the authorized gateway", async ({
  page,
}) => {
  test.setTimeout(60_000);
  const pool = testPool();
  const title = `App restart ${randomUUID()}`;
  try {
    await page.goto("/");
    await page.getByLabel("Task title").fill(title);
    await page.getByRole("button", { name: "Add task", exact: true }).click();
    const row = page.getByRole("listitem").filter({ hasText: title });
    await expect(row).toBeVisible();
    execFileSync(
      "docker",
      [
        "compose",
        "--project-name",
        "stateful-task-tracker",
        "--file",
        "compose.yml",
        "restart",
        "app",
      ],
      { timeout: 30_000 },
    );
    await expect(async () => {
      await page.reload();
      await expect(row).toBeVisible();
    }).toPass({ timeout: 30_000 });
  } finally {
    await pool.query("delete from tasks where title = $1", [title]);
    await pool.end();
  }
});

test("tampered completion fields are rejected at the server without changing rows", async ({
  page,
}) => {
  const pool = testPool();
  const title = `Mutation validation ${randomUUID()}`;
  try {
    await page.goto("/");
    await page.getByLabel("Task title").fill(title);
    await page.getByRole("button", { name: "Add task", exact: true }).click();
    const row = page.getByRole("listitem").filter({ hasText: title });
    await expect(row).toBeVisible();
    const before = (
      await pool.query("select id, title, completed from tasks order by id")
    ).rows;
    for (const id of ["not-a-uuid", randomUUID()]) {
      await row
        .locator('input[name="id"]')
        .evaluate((input: HTMLInputElement, value) => {
          input.value = value;
        }, id);
      await row
        .getByRole("button", { name: "Mark complete", exact: true })
        .click();
      await expect(row.getByRole("alert")).toBeVisible();
      expect(
        (await pool.query("select id, title, completed from tasks order by id"))
          .rows,
      ).toEqual(before);
      await page.reload();
    }
    await row
      .locator('input[name="completed"]')
      .evaluate((input: HTMLInputElement) => {
        input.value = "yes";
      });
    await row
      .getByRole("button", { name: "Mark complete", exact: true })
      .click();
    await expect(row.getByRole("alert")).toBeVisible();
    expect(
      (await pool.query("select id, title, completed from tasks order by id"))
        .rows,
    ).toEqual(before);
  } finally {
    await pool.query("delete from tasks where title = $1", [title]);
    await pool.end();
  }
});

test("failed write shows a safe error, retains input and succeeds on retry after reconnection", async ({
  page,
}) => {
  test.setTimeout(60_000);
  const title = `Outage retry ${randomUUID()}`;
  const before = testPool();
  const count = (await before.query("select count(*) from tasks")).rows;
  await before.end();
  try {
    await page.goto("/");
    await page.getByLabel("Task title").fill(title);
    execFileSync(
      "docker",
      [
        "compose",
        "--project-name",
        "stateful-task-tracker",
        "--file",
        "compose.yml",
        "stop",
        "test-db",
      ],
      { timeout: 30_000 },
    );
    await page.getByRole("button", { name: "Add task", exact: true }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "Could not save" }),
    ).toBeVisible();
    await expect(page.getByLabel("Task title")).toHaveValue(title);
    execFileSync(
      "docker",
      [
        "compose",
        "--project-name",
        "stateful-task-tracker",
        "--file",
        "compose.yml",
        "up",
        "-d",
        "--wait",
        "test-db",
      ],
      { timeout: 30_000 },
    );
    const recovered = testPool();
    try {
      expect(
        (await recovered.query("select count(*) from tasks")).rows,
      ).toEqual(count);
      await page.getByRole("button", { name: "Add task", exact: true }).click();
      await expect(
        page.getByRole("listitem").filter({ hasText: title }),
      ).toBeVisible();
      expect(
        (
          await recovered.query(
            "select title, completed from tasks where title = $1",
            [title],
          )
        ).rows,
      ).toEqual([{ title, completed: false }]);
    } finally {
      await recovered.end();
    }
  } finally {
    execFileSync(
      "docker",
      [
        "compose",
        "--project-name",
        "stateful-task-tracker",
        "--file",
        "compose.yml",
        "up",
        "-d",
        "--wait",
        "test-db",
      ],
      { timeout: 30_000 },
    );
    const cleanup = testPool();
    await cleanup.query("delete from tasks where title = $1", [title]);
    await cleanup.end();
  }
});
