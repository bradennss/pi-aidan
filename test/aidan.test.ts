import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import type {
  ContextEvent,
  ExtensionAPI,
  ExtensionContext,
  ExtensionHandler,
} from "@earendil-works/pi-coding-agent";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import aidan, { PROMPTS_DIR } from "../index.ts";
import {
  AFTER_WRITE_PROMPT_FILE,
  createContextHandler,
  RULES_PROMPT_FILE,
} from "../src/inject.ts";
import type { AgentMessage } from "../src/messages.ts";

interface ContextEventResult {
  messages?: ContextEvent["messages"];
}

function user(content: string): AgentMessage {
  return { role: "user", content, timestamp: 1 };
}

function writeResult(): AgentMessage {
  return {
    role: "toolResult",
    toolCallId: "call-write",
    toolName: "write",
    content: [{ type: "text", text: "written" }],
    isError: false,
    timestamp: 1,
  };
}

function contents(result: ContextEventResult | undefined): string[] {
  return (result?.messages ?? [])
    .filter((message) => message.role === "custom")
    .map((message) =>
      typeof message.content === "string"
        ? message.content
        : JSON.stringify(message.content),
    );
}

describe("aidan", () => {
  it("registers a context handler for the bundled prompts", () => {
    const events: string[] = [];
    const pi = {
      on: (event: string) => {
        events.push(event);
      },
    } as unknown as ExtensionAPI;

    aidan(pi);

    expect(events).toEqual(["context"]);
    expect(PROMPTS_DIR.endsWith(path.join("pi-aidan", "prompts"))).toBe(true);
  });
});

describe("createContextHandler", () => {
  let promptsDir: string;
  let warnings: string[];
  let ctx: ExtensionContext;
  let handler: ExtensionHandler<ContextEvent, ContextEventResult>;

  beforeEach(() => {
    promptsDir = mkdtempSync(path.join(tmpdir(), "pi-aidan-"));
    writeFileSync(path.join(promptsDir, RULES_PROMPT_FILE), "");
    writeFileSync(path.join(promptsDir, AFTER_WRITE_PROMPT_FILE), "");
    warnings = [];
    ctx = {
      ui: {
        notify: (message: string) => {
          warnings.push(message);
        },
      },
    } as unknown as ExtensionContext;
    handler = createContextHandler(promptsDir);
  });

  afterEach(() => {
    rmSync(promptsDir, { recursive: true, force: true });
  });

  function writePrompt(file: string, content: string): void {
    writeFileSync(path.join(promptsDir, file), content);
  }

  async function run(
    messages: AgentMessage[],
  ): Promise<ContextEventResult | undefined> {
    return (await handler({ type: "context", messages }, ctx)) ?? undefined;
  }

  it("puts the rules in front of the newest user message", async () => {
    writePrompt(RULES_PROMPT_FILE, "Reply in lowercase.");

    const result = await run([user("first"), user("second")]);

    expect(result?.messages?.map((message) => message.role)).toEqual([
      "user",
      "custom",
      "user",
    ]);
    expect(contents(result)).toEqual([
      "<EXTREMELY_IMPORTANT>\n\nReply in lowercase.\n\n</EXTREMELY_IMPORTANT>",
    ]);
  });

  it("reads the rules again for every request", async () => {
    writePrompt(RULES_PROMPT_FILE, "First rules.");
    await run([user("hello")]);

    writePrompt(RULES_PROMPT_FILE, "Second rules.");
    const result = await run([user("hello")]);

    expect(contents(result)[0]).toContain("Second rules.");
    expect(contents(result)[0]).not.toContain("First rules.");
  });

  it("adds the reminder after a write tool result", async () => {
    writePrompt(RULES_PROMPT_FILE, "Reply in lowercase.");
    writePrompt(AFTER_WRITE_PROMPT_FILE, "Check the file you wrote.");

    const result = await run([user("hello"), writeResult()]);

    expect(result?.messages?.map((message) => message.role)).toEqual([
      "custom",
      "user",
      "toolResult",
      "custom",
    ]);
    expect(contents(result)[1]).toBe(
      "<IMPORTANT_REMINDER>\n\nCheck the file you wrote.\n\n</IMPORTANT_REMINDER>",
    );
  });

  it("leaves the reminder out when nothing was written", async () => {
    writePrompt(AFTER_WRITE_PROMPT_FILE, "Check the file you wrote.");

    expect(await run([user("hello")])).toBeUndefined();
  });

  it("injects nothing while the prompt files are empty", async () => {
    expect(await run([user("hello"), writeResult()])).toBeUndefined();
    expect(warnings).toEqual([]);
  });

  it("warns once about a prompt file it cannot read", async () => {
    rmSync(path.join(promptsDir, RULES_PROMPT_FILE));

    await run([user("hello")]);
    await run([user("hello")]);

    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain(RULES_PROMPT_FILE);
  });
});
