import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";

export const PROMPTS = {
  system: {
    fileName: "system.md",
    tag: "EXTREMELY_IMPORTANT",
  },
  beforeUser: {
    fileName: "before-user.md",
    tag: "EXTREMELY_IMPORTANT",
    messageType: "aidan-before-user",
  },
  reminder: {
    fileName: "after-write.md",
    tag: "IMPORTANT_REMINDER",
    messageType: "aidan-reminder",
  },
} as const;

type PromptName = keyof typeof PROMPTS;

export interface PromptLoader {
  load(name: PromptName, ctx: ExtensionContext): Promise<string | undefined>;
}

export function createPromptLoader(promptsDir: string): PromptLoader {
  const warnedPaths = new Set<string>();

  return {
    async load(name, ctx) {
      const prompt = PROMPTS[name];
      const promptPath = path.join(promptsDir, prompt.fileName);
      const content = await readPrompt(promptPath);

      if (content === undefined) {
        if (!warnedPaths.has(promptPath)) {
          warnedPaths.add(promptPath);
          ctx.ui.notify(`pi-aidan cannot read ${promptPath}`, "warning");
        }
        return undefined;
      }

      return content === "" ? undefined : wrapInBlock(prompt.tag, content);
    },
  };
}

async function readPrompt(promptPath: string): Promise<string | undefined> {
  try {
    return (await readFile(promptPath, "utf8")).trim();
  } catch {
    return undefined;
  }
}

function wrapInBlock(tag: string, content: string): string {
  return `<${tag}>\n\n${content}\n\n</${tag}>`;
}
