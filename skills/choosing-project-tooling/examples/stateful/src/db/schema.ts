import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const tasks = pgTable(
  "tasks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    completed: boolean("completed").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      "tasks_title_length",
      sql`char_length(${table.title}) between 1 and 200`,
    ),
  ],
);

// Keep the public task query shape compatible with the previous release.
export const taskColumns = {
  id: tasks.id,
  title: tasks.title,
  completed: tasks.completed,
};
export type Task = Pick<
  typeof tasks.$inferSelect,
  "id" | "title" | "completed"
>;
