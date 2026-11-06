import { execFileSync } from "node:child_process";
import { afterAll, beforeAll, expect, it } from "vitest";
import { createTask, listTasks, setTaskCompleted } from "../src/tasks/service";
import { database } from "../src/db/client";
import { migrateTestDatabase, testPool } from "./database";

const pool = testPool();
const ids: string[] = [];
beforeAll(async () => {
  await migrateTestDatabase(pool);
  await pool.end();
});
afterAll(async () => {
  // Bring back only our test service even when a failure interrupts the test.
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
  await cleanup.query("delete from tasks where id = any($1::uuid[])", [ids]);
  await cleanup.end();
  await database().pool.end();
});

it("retains completed tasks after database restart and pool reconnection", async () => {
  const task = await createTask(`Restart persistence ${crypto.randomUUID()}`);
  ids.push(task.id);
  await setTaskCompleted(task.id, true);
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
  await expect(listTasks()).rejects.toThrow();
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
    .poll(() => listTasks())
    .toContainEqual({ ...task, completed: true });
  const freshPool = testPool();
  try {
    const result = await freshPool.query(
      "select id, title, completed from tasks where id = $1",
      [task.id],
    );
    expect(result.rows).toEqual([{ ...task, completed: true }]);
  } finally {
    await freshPool.end();
  }
}, 60_000);
