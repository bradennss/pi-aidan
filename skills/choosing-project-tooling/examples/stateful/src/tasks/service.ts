import "server-only";
import { asc, eq } from "drizzle-orm";
import { database } from "../db/client";
import { tasks, taskColumns, type Task } from "../db/schema";

export class TaskInputError extends Error {}

export async function createTask(title: string): Promise<Task> {
  if (typeof title !== "string")
    throw new TaskInputError("Enter a task title.");
  const trimmed = title.trim();
  if (trimmed.length < 1 || trimmed.length > 200) {
    throw new TaskInputError("Enter a title with 1 to 200 characters.");
  }
  const [task] = await database()
    .db.insert(tasks)
    .values({ title: trimmed })
    .returning(taskColumns);
  return task;
}

export async function listTasks(): Promise<Task[]> {
  return database().db.select(taskColumns).from(tasks).orderBy(asc(tasks.id));
}

export async function setTaskCompleted(
  id: string,
  completed: boolean,
): Promise<Task> {
  if (
    typeof id !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  ) {
    throw new TaskInputError("Invalid task ID.");
  }
  if (typeof completed !== "boolean")
    throw new TaskInputError("Invalid completion state.");
  const [task] = await database()
    .db.update(tasks)
    .set({ completed })
    .where(eq(tasks.id, id))
    .returning(taskColumns);
  if (!task) throw new TaskInputError("Task not found. Reload and try again.");
  return task;
}
