import { sql } from "drizzle-orm";
import { boolean, check, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const tasks = pgTable(
  "tasks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    completed: boolean("completed").notNull().default(false),
  },
  (table) => [
    check(
      "tasks_title_length",
      sql`char_length(${table.title}) between 1 and 200`,
    ),
  ],
);

export type Task = typeof tasks.$inferSelect;
