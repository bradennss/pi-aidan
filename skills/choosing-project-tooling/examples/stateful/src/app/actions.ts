"use server";

import { revalidatePath } from "next/cache";
import { createTask, setTaskCompleted, TaskInputError } from "../tasks/service";

export type ActionState = { error?: string; title?: string };

export async function addTask(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const title = formData.get("title");
  try {
    if (typeof title !== "string")
      throw new TaskInputError("Enter a task title.");
    await createTask(title);
  } catch (error) {
    if (!(error instanceof TaskInputError))
      console.error("Could not create task");
    return {
      error:
        error instanceof TaskInputError
          ? error.message
          : "Could not save the task. Try again.",
      title: typeof title === "string" ? title : "",
    };
  }
  revalidatePath("/");
  return { title: "" };
}

export async function changeTaskCompletion(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const id = formData.get("id");
    const completed = formData.get("completed");
    if (typeof id !== "string") throw new TaskInputError("Invalid task ID.");
    if (completed !== "true" && completed !== "false")
      throw new TaskInputError("Invalid completion state.");
    await setTaskCompleted(id, completed === "true");
  } catch (error) {
    if (!(error instanceof TaskInputError))
      console.error("Could not update task");
    return {
      error:
        error instanceof TaskInputError
          ? error.message
          : "Could not save the task. Try again.",
    };
  }
  revalidatePath("/");
  return {};
}
