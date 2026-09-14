import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import type {
  BeforeAgentStartEvent,
  ContextEvent,
  ExtensionAPI,
  ExtensionContext,
} from "@earendil-works/pi-coding-agent";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import aidan, { PROMPTS_DIR } from "../index.ts";
import {
  AFTER_WRITE_PROMPT_FILE,
  type AidanHandlers,
  createHandlers,
  RULES_PROMPT_FILE,
  SYSTEM_PROMPT_FILE,
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
  it("registers both handlers for the bundled prompts", () => {
    const events: string[] = [];
    const pi = {
      on: (event: string) => {
        events.push(event);
      },
    } as unknown as ExtensionAPI;

    aidan(pi);

    expect(events).toEqual(["before_agent_start", "context"]);
    expect(PROMPTS_DIR.endsWith(path.join("pi-aidan", "prompts"))).toBe(true);
  });
});

describe("createHandlers", () => {
  let promptsDir: string;
  let warnings: string[];
  let ctx: ExtensionContext;
  let handlers: AidanHandlers;

  beforeEach(() => {
    promptsDir = mkdtempSync(path.join(tmpdir(), "pi-aidan-"));
    writeFileSync(path.join(promptsDir, SYSTEM_PROMPT_FILE), "");
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
    handlers = createHandlers(promptsDir);
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
    return (
      (await handlers.context({ type: "context", messages }, ctx)) ?? undefined
    );
  }

  async function startAgent(systemPrompt: string): Promise<string | undefined> {
    const event = {
      type: "before_agent_start",
      prompt: "hello",
      systemPrompt,
      systemPromptOptions: { cwd: promptsDir, contextFiles: [] },
    } as unknown as BeforeAgentStartEvent;
    const result = await handlers.beforeAgentStart(event, ctx);
    return result?.systemPrompt;
  }

  it("appends the system prompt file to Pi's system prompt", async () => {
    writePrompt(SYSTEM_PROMPT_FILE, "You are Aidan.");

    expect(await startAgent("You are a coding assistant.")).toBe(
      "You are a coding assistant.\n\n<EXTREMELY_IMPORTANT>\n\nYou are Aidan.\n\n</EXTREMELY_IMPORTANT>",
    );
  });

  it("reads the system prompt file again for every turn", async () => {
    writePrompt(SYSTEM_PROMPT_FILE, "First.");
    await startAgent("Base.");

    writePrompt(SYSTEM_PROMPT_FILE, "Second.");

    expect(await startAgent("Base.")).toContain("Second.");
  });

  it("leaves the system prompt alone while its file is empty", async () => {
    expect(await startAgent("Base.")).toBeUndefined();
  });

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
