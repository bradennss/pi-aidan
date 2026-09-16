import type {
  BeforeAgentStartEvent,
  BeforeAgentStartEventResult,
  ContextEvent,
  ExtensionHandler,
} from "@earendil-works/pi-coding-agent";
import {
  buildMessage,
  endsWithFileMutation,
  insertBeforeLastUserMessage,
} from "./messages.ts";
import { createPromptLoader, PROMPTS } from "./prompts.ts";

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
  const prompts = createPromptLoader(promptsDir);

  return {
    beforeAgentStart: async (event, ctx) => {
      const system = await prompts.load("system", ctx);
      if (system === undefined) {
        return undefined;
      }
      return { systemPrompt: `${event.systemPrompt}\n\n${system}` };
    },

    context: async (event, ctx) => {
      const beforeUser = await prompts.load("beforeUser", ctx);
      const reminder = endsWithFileMutation(event.messages)
        ? await prompts.load("reminder", ctx)
        : undefined;
      if (beforeUser === undefined && reminder === undefined) {
        return undefined;
      }

      let messages = event.messages;
      if (beforeUser !== undefined) {
        messages = insertBeforeLastUserMessage(
          messages,
          buildMessage(PROMPTS.beforeUser.messageType, beforeUser),
        );
      }
      if (reminder !== undefined) {
        messages = [
          ...messages,
          buildMessage(PROMPTS.reminder.messageType, reminder),
        ];
      }
      return { messages };
    },
  };
}
