import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("adds_and_completes_a_task", async ({ page }) => {
  await page.getByRole("textbox", { name: "New task" }).fill("Read the guide");
  await page.getByRole("textbox", { name: "New task" }).press("Enter");
  const task = page.getByRole("switch", { name: "Read the guide" });
  await expect(task).not.toBeChecked();
  await task.focus();
  await page.keyboard.press("Space");
  await expect(task).toBeChecked();
});

test("rejects_blank_tasks", async ({ page }) => {
  await page.getByRole("textbox", { name: "New task" }).fill("   ");
  await page.getByRole("button", { name: "Add task" }).click();
  await expect(page.getByRole("switch")).toHaveCount(0);
  await expect(page.getByRole("alert")).toBeVisible();
});

test("refresh_starts_empty", async ({ page }) => {
  await page.getByRole("textbox", { name: "New task" }).fill("Temporary task");
  await page.getByRole("button", { name: "Add task" }).click();
  await expect(
    page.getByRole("switch", { name: "Temporary task" }),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByRole("switch")).toHaveCount(0);
  await expect(page.getByText("Add a task to get started.")).toBeVisible();
});
