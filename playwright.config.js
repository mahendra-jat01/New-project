const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./src",
  timeout: 120000,
  expect: {
    timeout: 15000
  },
  use: {
    baseURL: process.env.BASE_URL || "https://automationexercise.com",
    headless: process.env.HEADLESS !== "false",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
