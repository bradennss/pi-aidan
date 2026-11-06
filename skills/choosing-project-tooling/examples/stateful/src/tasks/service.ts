import "server-only";
import { asc, eq } from "drizzle-orm";
import { database } from "../db/client";
import { tasks, type Task } from "../db/schema";

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
    .returning();
  return task;
}

export async function listTasks(): Promise<Task[]> {
  return database().db.select().from(tasks).orderBy(asc(tasks.id));
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
    .returning();
  if (!task) throw new TaskInputError("Task not found. Reload and try again.");
  return task;
}
