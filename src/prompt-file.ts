import { readFile } from "node:fs/promises";

/** Undefined means the file is missing or unreadable, which the caller warns about. */
export async function readPromptFile(
  promptPath: string,
): Promise<string | undefined> {
  try {
    const content = await readFile(promptPath, "utf8");
    return content.trim();
  } catch {
    return undefined;
  }
}
