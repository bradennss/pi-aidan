import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(cleanup);

// Motion restores scroll after measuring animated field copy. jsdom has no
// layout or scroll implementation; browser tests cover the real rendering.
Object.defineProperty(window, "scrollTo", { value: () => undefined });
