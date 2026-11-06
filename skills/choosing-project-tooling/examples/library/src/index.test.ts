import { describe, expect, it } from "vitest";
import { parseDuration } from "./index.js";

describe("parseDuration", () => {
  it.each([
    ["0ms", 0],
    ["1h 30m", 5400000],
    [" \t1h\n30m\r\n ", 5400000],
    ["1d 2h 3m 4s 5ms", 93784005],
    ["0002s 1s", 3000],
    ["9007199254740991ms", 9007199254740991],
  ])("parses %j as %d milliseconds", (input, expected) => {
    expect(parseDuration(input)).toBe(expected);
  });

  it.each([
    "",
    " \t\n",
    "-1s",
    "+1s",
    "1.5s",
    "1w",
    "1S",
    "1h trailing",
    "1h30m",
    "1 h",
    "1s!",
    "x1s",
    "1s\n2",
    "1e3ms",
    "1s\u00002m",
  ])("rejects malformed input %j without a partial result", (input) => {
    expect(() => parseDuration(input)).toThrow(TypeError);
  });

  it.each([null, undefined, 1000, {}, ["1s"]])(
    "rejects non-string input %j",
    (input) => {
      // JavaScript consumers do not have the TypeScript argument constraint.
      // @ts-expect-error Deliberately exercise the runtime boundary.
      expect(() => parseDuration(input)).toThrow(TypeError);
    },
  );

  it.each([
    "9007199254740992ms",
    "9007199254741s",
    "9007199254740991ms 1ms",
    "9007199254740991ms 9007199254740991ms",
    "999999999999999999999999999999999999999999999999999999999999999999999ms",
  ])("rejects unsafe amounts or totals in %j", (input) => {
    expect(() => parseDuration(input)).toThrow(RangeError);
  });
});
