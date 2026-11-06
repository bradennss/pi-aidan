import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

function connect() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 2000,
    query_timeout: 5000,
    max: 5,
  });
  // An idle connection can disappear during a database restart. pg evicts it.
  pool.on("error", () => console.error("PostgreSQL idle connection lost"));
  return { pool, db: drizzle(pool) };
}

const globalDatabase = globalThis as typeof globalThis & {
  taskDatabase?: ReturnType<typeof connect>;
};
export function database() {
  return (globalDatabase.taskDatabase ??= connect());
}
