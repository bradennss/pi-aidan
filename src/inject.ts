import path from "node:path";
import type {
  BeforeAgentStartEvent,
  BeforeAgentStartEventResult,
  ContextEvent,
  ExtensionContext,
  ExtensionHandler,
} from "@earendil-works/pi-coding-agent";
import {
  BEFORE_USER_MESSAGE_TYPE,
  buildMessage,
  endsWithFileMutation,
  insertBeforeLastUserMessage,
  INSTRUCTIONS_TAG,
  REMINDER_MESSAGE_TYPE,
  REMINDER_TAG,
  wrapInBlock,
} from "./messages.ts";
import { readPromptFile } from "./prompt-file.ts";

export const SYSTEM_PROMPT_FILE = "system.md";
export const BEFORE_USER_PROMPT_FILE = "before-user.md";
export const AFTER_WRITE_PROMPT_FILE = "after-write.md";

interface ContextEventResult {
  messages?: ContextEvent["messages"];
}

export interface AidanHandlers {
  beforeAgentStart: ExtensionHandler<
    BeforeAgentStartEvent,
    BeforeAgentStartEventResult
  >;
  context: ExtensionHandler<ContextEvent, ContextEventResult>;
}

export function createHandlers(promptsDir: string): AidanHandlers {
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

  return {
    beforeAgentStart: async (event, ctx) => {
      const system = await loadBlock(SYSTEM_PROMPT_FILE, INSTRUCTIONS_TAG, ctx);
      if (system === undefined) {
        return undefined;
      }
      return { systemPrompt: `${event.systemPrompt}\n\n${system}` };
    },

    context: async (event, ctx) => {
      const beforeUser = await loadBlock(
        BEFORE_USER_PROMPT_FILE,
        INSTRUCTIONS_TAG,
        ctx,
      );
      const reminder = endsWithFileMutation(event.messages)
        ? await loadBlock(AFTER_WRITE_PROMPT_FILE, REMINDER_TAG, ctx)
        : undefined;
      if (beforeUser === undefined && reminder === undefined) {
        return undefined;
      }

      let messages = event.messages;
      if (beforeUser !== undefined) {
        messages = insertBeforeLastUserMessage(
          messages,
          buildMessage(BEFORE_USER_MESSAGE_TYPE, beforeUser),
        );
      }
      if (reminder !== undefined) {
        messages = [...messages, buildMessage(REMINDER_MESSAGE_TYPE, reminder)];
      }
      return { messages };
    },
  };
}
