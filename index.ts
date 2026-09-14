import path from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { createHandlers } from "./src/inject.ts";

export const PROMPTS_DIR = path.join(import.meta.dirname, "prompts");

export default function aidan(pi: ExtensionAPI): void {
  const handlers = createHandlers(PROMPTS_DIR);
  pi.on("before_agent_start", handlers.beforeAgentStart);
  pi.on("context", handlers.context);
}
