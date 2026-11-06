import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { testPool, migrateTestDatabase } from "../../test/database";
import {
  createTask,
  listTasks,
  setTaskCompleted,
  TaskInputError,
} from "./service";
import { database } from "../db/client";

const pool = testPool();
const ids: string[] = [];

beforeAll(() => migrateTestDatabase(pool));
afterAll(async () => {
  await pool.query("delete from tasks where id = any($1::uuid[])", [ids]);
  await pool.end();
  await database().pool.end();
});

async function rowCount() {
  const result = await pool.query<{ count: string }>(
    "select count(*) from tasks",
  );
  return Number(result.rows[0].count);
}

describe("task service with PostgreSQL", () => {
  it.each(["", "  \n ", "a".repeat(201), null, 42])(
    "rejects invalid title %j without inserting rows",
    async (title) => {
      const before = await rowCount();
      await expect(createTask(title as string)).rejects.toBeInstanceOf(
        TaskInputError,
      );
      expect(await rowCount()).toBe(before);
    },
  );

  it("trims, creates, lists, completes and reopens a task", async () => {
    const task = await createTask("  Review the migration  ");
    ids.push(task.id);
    expect(task).toEqual({
      id: expect.any(String),
      title: "Review the migration",
      completed: false,
    });
    expect(await listTasks()).toContainEqual(task);
    await setTaskCompleted(task.id, true);
    expect(await listTasks()).toContainEqual({ ...task, completed: true });
    await setTaskCompleted(task.id, false);
    expect(await listTasks()).toContainEqual(task);
  });

  it("accepts the 200-character trimmed boundary", async () => {
    const task = await createTask(` ${"a".repeat(200)} `);
    ids.push(task.id);
    expect(task.title).toHaveLength(200);
  });

  it.each(["not-a-uuid", "' OR 1=1 --", "", null])(
    "rejects malformed ID %j without changes",
    async (id) => {
      const before = await listTasks();
      await expect(setTaskCompleted(id as string, true)).rejects.toBeInstanceOf(
        TaskInputError,
      );
      expect(await listTasks()).toEqual(before);
    },
  );

  it("reports a nonexistent ID without inserting rows", async () => {
    const before = await rowCount();
    await expect(setTaskCompleted(randomUUID(), true)).rejects.toThrow(
      "Task not found",
    );
    expect(await rowCount()).toBe(before);
  });

  it("rejects nonboolean completion without changing the task", async () => {
    const task = await createTask("Keep incomplete");
    ids.push(task.id);
    await expect(
      setTaskCompleted(task.id, "false" as never),
    ).rejects.toBeInstanceOf(TaskInputError);
    expect(await listTasks()).toContainEqual(task);
  });
});
