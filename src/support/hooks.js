require("dotenv").config();
const fs = require("fs");
const path = require("path");

const { Before, After, Status, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");
const { AutomationExercisePage } = require("../pages/AutomationExercisePage");

const browserTypes = { chromium, firefox, webkit };

setDefaultTimeout(Number(process.env.DEFAULT_TIMEOUT || 120000));

function sanitizeFileName(value) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

Before(async function () {
  const browserName = process.env.BROWSER || "chromium";
  const browserType = browserTypes[browserName];

  if (!browserType) {
    throw new Error(`Unsupported browser "${browserName}". Use chromium, firefox, or webkit.`);
  }

  const launchOptions = {
    headless: process.env.HEADLESS !== "false",
    slowMo: Number(process.env.SLOW_MO || 0)
  };

  if (browserName === "chromium" && launchOptions.headless) {
    launchOptions.channel = "chromium";
  }

  this.browser = await browserType.launch(launchOptions);

  this.context = await this.browser.newContext({
    baseURL: process.env.BASE_URL || "https://automationexercise.com",
    viewport: { width: 1440, height: 900 },
    acceptDownloads: true,
    recordVideo: {
      dir: "test-results/videos",
      size: { width: 1440, height: 900 }
    }
  });

  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(Number(process.env.DEFAULT_TIMEOUT || 30000));
  this.pages.automationExercisePage = new AutomationExercisePage(this.page);
});

After(async function (scenario) {
  const failed = scenario.result?.status === Status.FAILED;
  let videoPath = null;

  try {
    // Save and attach a final screenshot for every scenario before the page is closed.
    if (this.page && !this.page.isClosed()) {
      const screenshot = await this.page.screenshot({ fullPage: true });
      const screenshotsDir = path.join(process.cwd(), "test-results", "screenshots");
      const status = failed ? "failed" : "passed";
      const scenarioName = sanitizeFileName(scenario.pickle.name || "scenario");
      const screenshotPath = path.join(screenshotsDir, `${scenarioName}-${status}-${Date.now()}.png`);

      fs.mkdirSync(screenshotsDir, { recursive: true });
      fs.writeFileSync(screenshotPath, screenshot);
      await this.attach(screenshot, "image/png");
    }

    // Capture the video path for the scenario (finalized after context close)
    if (this.page && this.page.video) {
      videoPath = await this.page.video().path();
    }
  } catch (err) {
    console.error("After hook capture error:", err.message);
  }

  // Close context/browser (this finalizes the recorded video file)
  if (this.context) {
    try {
      await this.context.close();
    } catch (err) {
      console.error("Context close error:", err.message);
    }
  }
  if (this.browser) {
    try {
      await this.browser.close();
    } catch (err) {
      console.error("Browser close error:", err.message);
    }
  }

  // Attach the recorded video to the Allure report
  if (videoPath && fs.existsSync(videoPath)) {
    try {
      await this.attach(fs.readFileSync(videoPath), "video/webm");
    } catch (err) {
      console.error("Video attach error:", err.message);
    }
  }
});
