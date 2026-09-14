import path from "node:path";
import type {
  ContextEvent,
  ExtensionContext,
  ExtensionHandler,
} from "@earendil-works/pi-coding-agent";
import {
  buildMessage,
  endsWithFileMutation,
  insertBeforeLastUserMessage,
  REMINDER_MESSAGE_TYPE,
  REMINDER_TAG,
  RULES_MESSAGE_TYPE,
  RULES_TAG,
  wrapInBlock,
} from "./messages.ts";
import { readPromptFile } from "./prompt-file.ts";

export const RULES_PROMPT_FILE = "rules.md";
export const AFTER_WRITE_PROMPT_FILE = "after-write.md";

interface ContextEventResult {
  messages?: ContextEvent["messages"];
}

export function createContextHandler(
  promptsDir: string,
): ExtensionHandler<ContextEvent, ContextEventResult> {
  const warned = new Set<string>();

  async function loadBlock(
    file: string,
    tag: string,
    ctx: ExtensionContext,
  ): Promise<string | undefined> {
    const promptPath = path.join(promptsDir, file);
    const content = await readPromptFile(promptPath);
    if (content === undefined) {
      if (!warned.has(promptPath)) {
        warned.add(promptPath);
        ctx.ui.notify(`pi-aidan cannot read ${promptPath}`, "warning");
      }
      return undefined;
    }
    return content === "" ? undefined : wrapInBlock(tag, content);
  }

  return async (event, ctx) => {
    const rules = await loadBlock(RULES_PROMPT_FILE, RULES_TAG, ctx);
    const reminder = endsWithFileMutation(event.messages)
      ? await loadBlock(AFTER_WRITE_PROMPT_FILE, REMINDER_TAG, ctx)
      : undefined;
    if (rules === undefined && reminder === undefined) {
      return undefined;
    }

    let messages = event.messages;
    if (rules !== undefined) {
      messages = insertBeforeLastUserMessage(
        messages,
        buildMessage(RULES_MESSAGE_TYPE, rules),
      );
    }
    if (reminder !== undefined) {
      messages = [...messages, buildMessage(REMINDER_MESSAGE_TYPE, reminder)];
    }
    return { messages };
  };
}
