import type { ReactNode } from "react";
import type { Note } from "@notes/client";
import { notes } from "../lib/notes";
import { createNote } from "./actions";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; error?: string }>;
}): Promise<ReactNode> {
  const { id, error } = await searchParams;
  let note: Note | undefined;
  let message = error === "create" ? "Could not create the note." : undefined;
  if (id) {
    try {
      note = await notes().get(Number(id));
    } catch {
      message = "Could not load the note.";
    }
  }
  return (
    <main>
      <h1>Notes</h1>
      <h2>Create a note</h2>
      <form action={createNote}>
        <label htmlFor="body">Note</label>
        <textarea id="body" name="body" required maxLength={2000} />
        <button type="submit">Create note</button>
      </form>
      <h2>Find a note</h2>
      <form action="/" method="get">
        <label htmlFor="id">Note ID</label>
        <input
          id="id"
          name="id"
          type="number"
          min="1"
          required
          defaultValue={id}
        />
        <button type="submit">Find note</button>
      </form>
      {message && <p role="alert">{message}</p>}
      {note && (
        <section aria-label="Note">
          <h2>Note {note.id}</h2>
          <pre>{note.body}</pre>
        </section>
      )}
    </main>
  );
}
