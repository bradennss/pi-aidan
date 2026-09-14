import { describe, expect, it } from "vitest";
import {
  type AgentMessage,
  buildMessage,
  endsWithFileMutation,
  insertBeforeLastUserMessage,
  wrapInBlock,
} from "../src/messages.ts";

function user(content: string): AgentMessage {
  return { role: "user", content, timestamp: 1 };
}

function toolResult(toolName: string, isError = false): AgentMessage {
  return {
    role: "toolResult",
    toolCallId: `call-${toolName}`,
    toolName,
    content: [{ type: "text", text: "done" }],
    isError,
    timestamp: 1,
  };
}

function assistant(): AgentMessage {
  return {
    role: "assistant",
    content: [{ type: "text", text: "working" }],
    api: "messages",
    provider: "anthropic",
    model: "claude",
    usage: {
      input: 0,
      output: 0,
      cacheRead: 0,
      cacheWrite: 0,
      totalTokens: 0,
      cost: {
        input: 0,
        output: 0,
        cacheRead: 0,
        cacheWrite: 0,
        total: 0,
      },
    },
    stopReason: "toolUse",
    timestamp: 1,
  };
}

describe("wrapInBlock", () => {
  it("puts the content between the tags", () => {
    expect(wrapInBlock("EXTREMELY_IMPORTANT", "Rules.")).toBe(
      "<EXTREMELY_IMPORTANT>\n\nRules.\n\n</EXTREMELY_IMPORTANT>",
    );
  });
});

describe("buildMessage", () => {
  it("builds a hidden custom message", () => {
    expect(buildMessage("aidan-rules", "Rules.", 7)).toEqual({
      role: "custom",
      customType: "aidan-rules",
      content: "Rules.",
      display: false,
      timestamp: 7,
    });
  });
});

describe("insertBeforeLastUserMessage", () => {
  it("goes in front of the newest user message", () => {
    const messages = [user("first"), assistant(), user("second")];

    const result = insertBeforeLastUserMessage(messages, user("injected"));

    expect(result.map((message) => message.role)).toEqual([
      "user",
      "assistant",
      "user",
      "user",
    ]);
    expect(result[2]).toEqual(user("injected"));
    expect(messages).toHaveLength(3);
  });

  it("goes last when no user message is there", () => {
    const result = insertBeforeLastUserMessage([assistant()], user("injected"));

    expect(result[1]).toEqual(user("injected"));
  });
});

describe("endsWithFileMutation", () => {
  it("sees a write at the end", () => {
    expect(
      endsWithFileMutation([user("hi"), assistant(), toolResult("write")]),
    ).toBe(true);
  });

  it("sees an edit among parallel tool results", () => {
    expect(
      endsWithFileMutation([
        assistant(),
        toolResult("read"),
        toolResult("edit"),
        toolResult("bash"),
      ]),
    ).toBe(true);
  });

  it("ignores a failed edit", () => {
    expect(endsWithFileMutation([assistant(), toolResult("edit", true)])).toBe(
      false,
    );
  });

  it("ignores tool results that are not the newest messages", () => {
    expect(
      endsWithFileMutation([toolResult("write"), assistant(), user("next")]),
    ).toBe(false);
  });

  it("handles an empty history", () => {
    expect(endsWithFileMutation([])).toBe(false);
  });
});
