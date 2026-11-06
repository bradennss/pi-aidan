import { randomUUID } from "node:crypto";
import { test, expect } from "@playwright/test";
import { testPool } from "./database";

test("create, complete, reload and reopen persist in PostgreSQL", async ({
  page,
}) => {
  const title = `Browser task ${randomUUID()}`;
  const pool = testPool();
  try {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Tasks", exact: true }),
    ).toBeVisible();
    await page.getByLabel("Task title").fill(`  ${title}  `);
    await page.getByRole("button", { name: "Add task", exact: true }).click();
    const row = page.getByRole("listitem").filter({ hasText: title });
    await expect(row).toBeVisible();
    await row
      .getByRole("button", { name: "Mark complete", exact: true })
      .click();
    await expect(row.getByText("Completed", { exact: true })).toBeVisible();
    await page.reload();
    await expect(row.getByText("Completed", { exact: true })).toBeVisible();
    const saved = await pool.query(
      "select title, completed from tasks where title = $1",
      [title],
    );
    expect(saved.rows).toEqual([{ title, completed: true }]);
    await row.getByRole("button", { name: "Reopen task", exact: true }).click();
    await page.reload();
    await expect(
      row.getByRole("button", { name: "Mark complete", exact: true }),
    ).toBeVisible();
    expect(
      (
        await pool.query("select completed from tasks where title = $1", [
          title,
        ])
      ).rows,
    ).toEqual([{ completed: false }]);
  } finally {
    await pool.query("delete from tasks where title = $1", [title]);
    await pool.end();
  }
});

for (const [name, title] of [
  ["blank", "   "],
  ["overlong", "x".repeat(201)],
]) {
  test(`server rejects ${name} titles without inserting rows`, async ({
    page,
  }) => {
    const pool = testPool();
    try {
      await page.goto("/");
      const before = (await pool.query("select count(*) from tasks")).rows;
      // Bypass browser constraints deliberately: server validation must still apply.
      await page
        .locator("form")
        .first()
        .evaluate((form: HTMLFormElement) => {
          form.noValidate = true;
        });
      await page
        .getByLabel("Task title")
        .evaluate((input: HTMLInputElement) => {
          input.removeAttribute("maxlength");
        });
      await page.getByLabel("Task title").fill(title);
      await page.getByRole("button", { name: "Add task", exact: true }).click();
      await expect(
        page.getByRole("alert").filter({ hasText: "1 to 200" }),
      ).toBeVisible();
      expect((await pool.query("select count(*) from tasks")).rows).toEqual(
        before,
      );
    } finally {
      await pool.end();
    }
  });
}
