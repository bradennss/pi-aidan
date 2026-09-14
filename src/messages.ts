import type { ContextEvent } from "@earendil-works/pi-coding-agent";

export type AgentMessage = ContextEvent["messages"][number];
type CustomMessage = Extract<AgentMessage, { role: "custom" }>;

export const RULES_MESSAGE_TYPE = "aidan-rules";
export const REMINDER_MESSAGE_TYPE = "aidan-reminder";

export const RULES_TAG = "EXTREMELY_IMPORTANT";
export const REMINDER_TAG = "IMPORTANT_REMINDER";

const FILE_MUTATION_TOOLS = new Set(["write", "edit"]);

export function wrapInBlock(tag: string, content: string): string {
  return `<${tag}>\n\n${content}\n\n</${tag}>`;
}

export function buildMessage(
  customType: string,
  content: string,
  timestamp: number = Date.now(),
): CustomMessage {
  return {
    role: "custom",
    customType,
    content,
    display: false,
    timestamp,
  };
}

export function insertBeforeLastUserMessage<M extends { role: string }>(
  messages: M[],
  message: M,
): M[] {
  const result = [...messages];
  for (let index = result.length - 1; index >= 0; index--) {
    if (result[index].role === "user") {
      result.splice(index, 0, message);
      return result;
    }
  }
  result.push(message);
  return result;
}

export function endsWithFileMutation(messages: AgentMessage[]): boolean {
  for (let index = messages.length - 1; index >= 0; index--) {
    const message = messages[index];
    if (message.role !== "toolResult") {
      return false;
    }
    if (FILE_MUTATION_TOOLS.has(message.toolName) && !message.isError) {
      return true;
    }
  }
  return false;
}
