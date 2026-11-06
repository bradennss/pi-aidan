const millisecondsPerUnit = {
  ms: 1,
  s: 1000,
  m: 60000,
  h: 3600000,
  d: 86400000,
};

export function parseDuration(input: string): number {
  if (typeof input !== "string" || input.trim() === "") {
    throw new TypeError("Expected one or more duration terms");
  }

  let total = 0;
  for (const term of input.trim().split(/\s+/u)) {
    const match = /^(\d+)(ms|s|m|h|d)$/u.exec(term);
    if (!match) {
      throw new TypeError(`Invalid duration term: ${term}`);
    }

    const amount = Number(match[1]);
    const unit = match[2] as keyof typeof millisecondsPerUnit;
    const milliseconds = amount * millisecondsPerUnit[unit];
    if (
      !Number.isSafeInteger(amount) ||
      !Number.isSafeInteger(milliseconds) ||
      milliseconds > Number.MAX_SAFE_INTEGER - total
    ) {
      throw new RangeError("Duration exceeds the safe integer range");
    }
    total += milliseconds;
  }
  return total;
}
