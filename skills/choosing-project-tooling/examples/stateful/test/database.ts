import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

// Never migrate or remove fixtures in an arbitrary DATABASE_URL.
export function testPool() {
  const value = process.env.DATABASE_URL;
  if (!value)
    throw new Error(
      "Use just check or just test-integration to select the disposable database.",
    );
  const url = new URL(value);
  if (
    url.hostname !== "127.0.0.1" ||
    url.port !== "55433" ||
    url.pathname !== "/stateful_test" ||
    url.username !== "stateful_local"
  ) {
    throw new Error(
      "Tests require the task-owned loopback stateful_test database on port 55433.",
    );
  }
  return new Pool({ connectionString: value, connectionTimeoutMillis: 2000 });
}

export async function migrateTestDatabase(pool: Pool) {
  await migrate(drizzle(pool), { migrationsFolder: "./drizzle" });
}
