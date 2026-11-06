import { randomUUID } from "node:crypto";
import { cpSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { expect, it } from "vitest";
import { testPool } from "./database";

it("adds creation times without losing previous rows or breaking previous queries and inserts", async () => {
  const admin = testPool();
  const name = `stateful_migration_${randomUUID().replaceAll("-", "")}`;
  const folder = mkdtempSync(join(tmpdir(), "stateful-migration-"));
  let pool: Pool | undefined;
  try {
    await admin.query(`create database "${name}"`);
    const url = new URL(process.env.DATABASE_URL!);
    url.pathname = `/${name}`;
    pool = new Pool({ connectionString: url.toString() });
    cpSync("drizzle", folder, { recursive: true });
    writeFileSync(
      join(folder, "meta/_journal.json"),
      JSON.stringify({
        version: "7",
        dialect: "postgresql",
        entries: [
          {
            idx: 0,
            version: "7",
            when: 1793966977844,
            tag: "0000_create_tasks",
            breakpoints: true,
          },
        ],
      }),
    );
    await migrate(drizzle(pool), { migrationsFolder: folder });
    await pool.query(
      "insert into tasks (id, title, completed) values ('11111111-1111-4111-8111-111111111111', 'Keep completed work', true)",
    );
    await migrate(drizzle(pool), { migrationsFolder: "./drizzle" });
    expect(
      (await pool.query("select id, title, completed from tasks")).rows,
    ).toEqual([
      {
        id: "11111111-1111-4111-8111-111111111111",
        title: "Keep completed work",
        completed: true,
      },
    ]);
    const created = await pool.query("select created_at from tasks");
    expect(created.rows[0].created_at).toBeInstanceOf(Date);
    await pool.query(
      "insert into tasks (title) values ('Previous writer still works')",
    );
    expect(
      (
        await pool.query(
          "select title, completed, created_at is not null as dated from tasks where title = 'Previous writer still works'",
        )
      ).rows,
    ).toEqual([
      { title: "Previous writer still works", completed: false, dated: true },
    ]);
  } finally {
    await pool?.end();
    await admin.query(`drop database if exists "${name}"`);
    await admin.end();
    rmSync(folder, { recursive: true, force: true });
  }
});
