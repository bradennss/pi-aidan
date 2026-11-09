import { readFile } from "node:fs/promises";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function aidan(pi: ExtensionAPI): void {
  pi.on("before_agent_start", async (event) => {
    const prompt = (
      await readFile(new URL("./prompts/system.md", import.meta.url), "utf8")
    ).trim();

    if (!prompt) return;

    return {
      systemPrompt: `${event.systemPrompt}\n\n<EXTREMELY_IMPORTANT>\n\n${prompt}\n\n</EXTREMELY_IMPORTANT>`,
    };
  });
}
