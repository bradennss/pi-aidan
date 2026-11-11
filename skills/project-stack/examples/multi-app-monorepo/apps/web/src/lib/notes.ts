import "server-only";
import { NotesClient } from "@notes/client";

export function notes(): NotesClient {
  return new NotesClient(
    process.env.API_URL ?? "http://127.0.0.1:3000",
    process.env.API_TOKEN ?? "",
  );
}
