/**
 * pi-aidan sends two prompts as hidden user messages: the rules from
 * prompts/rules.md before the newest user message, and the reminder from
 * prompts/after-write.md after a write or edit tool result. Both files are read
 * again for every request.
 */
import path from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { createContextHandler } from "./src/inject.ts";

export const PROMPTS_DIR = path.join(import.meta.dirname, "prompts");

export default function aidan(pi: ExtensionAPI): void {
  pi.on("context", createContextHandler(PROMPTS_DIR));
}
