import { beforeEach, expect, test, vi } from "vitest";
import { createNote } from "../src/app/actions";

const { create, redirect } = vi.hoisted(() => ({
  create: vi.fn<(body: string) => Promise<{ id: number; body: string }>>(),
  redirect: vi.fn<(path: string) => never>(() => {
    throw new Error("redirect");
  }),
}));

vi.mock("../src/lib/notes", () => ({ notes: () => ({ create }) }));
vi.mock("next/navigation", () => ({ redirect }));

beforeEach(() => {
  create.mockReset();
  redirect.mockClear();
});

test("creating a note redirects to its ID", async () => {
  create.mockResolvedValue({ id: 7, body: "hello" });
  const form = new FormData();
  form.set("body", "hello");
  await expect(createNote(form)).rejects.toThrow("redirect");
  expect(create).toHaveBeenCalledWith("hello");
  expect(redirect).toHaveBeenCalledExactlyOnceWith("/?id=7");
});

test("API failures redirect to an error instead of exposing server details", async () => {
  create.mockRejectedValue(new Error("private API details"));
  await expect(createNote(new FormData())).rejects.toThrow("redirect");
  expect(redirect).toHaveBeenCalledExactlyOnceWith("/?error=create");
});
