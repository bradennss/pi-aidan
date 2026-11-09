import { readFile } from "node:fs/promises";
import type {
  BeforeAgentStartEvent,
  BeforeAgentStartEventResult,
  ExtensionAPI,
  ExtensionContext,
  ExtensionHandler,
} from "@earendil-works/pi-coding-agent";
import { beforeEach, describe, expect, it, vi } from "vitest";
import aidan from "../index";

vi.mock("node:fs/promises", () => ({ readFile: vi.fn() }));

describe("aidan", () => {
  let handler: ExtensionHandler<
    BeforeAgentStartEvent,
    BeforeAgentStartEventResult
  >;
  const on = vi.fn((event: string, callback: typeof handler) => {
    handler = callback;
  });

  beforeEach(() => {
    vi.resetAllMocks();
    aidan({ on } as unknown as ExtensionAPI);
  });

  async function startAgent() {
    return handler(
      { systemPrompt: "Base instructions." } as BeforeAgentStartEvent,
      {} as ExtensionContext,
    );
  }

  it("registers only the system prompt handler", () => {
    expect(on).toHaveBeenCalledExactlyOnceWith(
      "before_agent_start",
      expect.any(Function),
    );
  });

  it("appends the wrapped system prompt and preserves the host instructions", async () => {
    vi.mocked(readFile).mockResolvedValue("  You are Aidan.\n");

    expect(await startAgent()).toEqual({
      systemPrompt:
        "Base instructions.\n\n<EXTREMELY_IMPORTANT>\nYou are Aidan.\n\n</EXTREMELY_IMPORTANT>",
    });
    expect(readFile).toHaveBeenCalledExactlyOnceWith(
      new URL("../prompts/system.md", import.meta.url),
      "utf8",
    );
  });

  it("reloads the system prompt for each turn", async () => {
    vi.mocked(readFile)
      .mockResolvedValueOnce("First.")
      .mockResolvedValueOnce("Second.");

    expect((await startAgent())?.systemPrompt).toContain("First.");
    expect((await startAgent())?.systemPrompt).toContain("Second.");
  });

  it("leaves the host prompt unchanged when the file is empty", async () => {
    vi.mocked(readFile).mockResolvedValue(" \n");

    expect(await startAgent()).toBeUndefined();
  });
});
