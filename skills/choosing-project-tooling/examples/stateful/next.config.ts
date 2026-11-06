import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // This project maintains its own concise agent context.
  agentRules: false,
};
export default config;
