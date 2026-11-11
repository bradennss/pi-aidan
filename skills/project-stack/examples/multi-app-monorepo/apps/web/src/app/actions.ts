"use server";

import { redirect } from "next/navigation";
import { notes } from "../lib/notes";

export async function createNote(formData: FormData): Promise<never> {
  let id: number;
  try {
    const body = formData.get("body");
    const note = await notes().create(typeof body === "string" ? body : "");
    id = note.id;
  } catch {
    redirect("/?error=create");
  }
  redirect(`/?id=${String(id)}`);
}
