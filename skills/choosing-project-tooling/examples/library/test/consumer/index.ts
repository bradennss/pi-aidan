import { parseDuration } from "unpublished-aidan-duration-example";
import * as duration from "unpublished-aidan-duration-example";

const milliseconds: number = parseDuration("1h 30m");
if (milliseconds !== 5400000) {
  throw new Error(`Expected 5400000 milliseconds, received ${milliseconds}`);
}
if (Object.keys(duration).join(",") !== "parseDuration") {
  throw new Error("Unexpected public exports");
}
console.log(`Packed ESM consumer: parseDuration only, ${milliseconds}ms`);
