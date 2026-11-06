import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test",
  fullyParallel: false,
  workers: 1,
  forbidOnly: true,
  retries: 0,
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:8088",
    httpCredentials: {
      username: "stateful-test",
      password: "disposable-gateway-only",
    },
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "integration",
      testMatch: "gateway.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "desktop",
      testMatch: "browser.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      testMatch: "browser.spec.ts",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
});
