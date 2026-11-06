import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { App } from "./App";

test("adds_and_completes_a_task", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.type(
    screen.getByRole("textbox", { name: "New task" }),
    "  Read the guide  ",
  );
  await user.click(screen.getByRole("button", { name: "Add task" }));
  const task = screen.getByRole("switch", { name: "Read the guide" });
  expect(task).not.toBeChecked();
  await user.click(task);
  expect(task).toBeChecked();
  await user.click(task);
  expect(task).not.toBeChecked();
  expect(screen.getByRole("textbox", { name: "New task" })).toHaveValue("");
});

test("rejects_blank_tasks", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.type(screen.getByRole("textbox", { name: "New task" }), "   ");
  await user.click(screen.getByRole("button", { name: "Add task" }));
  expect(screen.queryAllByRole("switch")).toHaveLength(0);
  await waitFor(() => expect(screen.getByRole("alert")).toBeVisible());
});
