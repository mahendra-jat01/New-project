const { chromium } = require("playwright");
const fs = require("node:fs/promises");
const path = require("node:path");

const outputDir = path.join(process.cwd(), "reports", "salesforce-explore");

async function saveScreenshot(page, name) {
  await fs.mkdir(outputDir, { recursive: true });
  const filePath = path.join(outputDir, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
}

async function snapshotPage(page, name) {
  const data = await page.evaluate(() => {
    const visible = (el) => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
    };

    return {
      title: document.title,
      url: location.href,
      headings: Array.from(document.querySelectorAll("h1,h2,h3"))
        .filter(visible)
        .slice(0, 30)
        .map((el) => el.innerText.trim())
        .filter(Boolean),
      buttons: Array.from(document.querySelectorAll("button,input[type='button'],input[type='submit']"))
        .filter(visible)
        .slice(0, 80)
        .map((el) => (el.innerText || el.value || el.getAttribute("aria-label") || el.title || "").trim())
        .filter(Boolean),
      links: Array.from(document.querySelectorAll("a"))
        .filter(visible)
        .slice(0, 80)
        .map((el) => ({ text: el.innerText.trim(), href: el.href }))
        .filter((item) => item.text || item.href),
      inputs: Array.from(document.querySelectorAll("input,textarea,select"))
        .filter(visible)
        .slice(0, 80)
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          type: el.getAttribute("type") || "",
          name: el.getAttribute("name") || "",
          label: el.getAttribute("aria-label") || el.getAttribute("placeholder") || el.id || ""
        }))
    };
  });

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, `${name}.json`), JSON.stringify(data, null, 2));
  return data;
}

async function clickFirstVisible(page, candidates) {
  for (const candidate of candidates) {
    const locator = page.getByText(candidate, { exact: false });
    if (await locator.count()) {
      const first = locator.first();
      if (await first.isVisible().catch(() => false)) {
        await first.click();
        return candidate;
      }
    }
  }
  return null;
}

async function main() {
  const { SF_URL, SF_USERNAME, SF_PASSWORD, HEADLESS = "true" } = process.env;

  if (!SF_URL || !SF_USERNAME || !SF_PASSWORD) {
    throw new Error("Set SF_URL, SF_USERNAME, and SF_PASSWORD before running this script.");
  }

  const browser = await chromium.launch({ headless: HEADLESS !== "false" });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const consoleErrors = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleErrors.push({ type: message.type(), text: message.text() });
    }
  });

  try {
    await page.goto(SF_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
    await saveScreenshot(page, "01-login-page");

    await page.locator("#username").fill(SF_USERNAME);
    await page.locator("#password").fill(SF_PASSWORD);
    await Promise.all([
      page.waitForLoadState("domcontentloaded").catch(() => {}),
      page.locator("#Login").click()
    ]);

    await page.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
    await saveScreenshot(page, "02-after-login");
    const afterLogin = await snapshotPage(page, "02-after-login");

    const bodyText = await page.locator("body").innerText({ timeout: 10000 }).catch(() => "");
    if (/verify your identity|verification code|check your email|two-factor|authenticator/i.test(bodyText)) {
      console.log(JSON.stringify({ status: "blocked_by_verification", afterLogin }, null, 2));
      process.exitCode = 2;
      return;
    }

    const appLauncher = page.locator("button[title='App Launcher'], button[aria-label*='App Launcher']");
    if (await appLauncher.count()) {
      await appLauncher.first().click();
      await page.waitForTimeout(2000);
      await saveScreenshot(page, "03-app-launcher");
      await snapshotPage(page, "03-app-launcher");
      await clickFirstVisible(page, ["View All", "Quotation", "Quote", "VR"]);
      await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
      await saveScreenshot(page, "04-after-app-selection");
      await snapshotPage(page, "04-after-app-selection");
    }

    await clickFirstVisible(page, ["Quotations", "Quotation", "Quotes", "Quote"]);
    await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
    await saveScreenshot(page, "05-quotation-area");
    const quotationArea = await snapshotPage(page, "05-quotation-area");

    await clickFirstVisible(page, ["New Quotation", "New Quote", "New"]);
    await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
    await saveScreenshot(page, "06-new-quotation-form");
    const newQuotationForm = await snapshotPage(page, "06-new-quotation-form");

    await fs.writeFile(
      path.join(outputDir, "console-errors.json"),
      JSON.stringify(consoleErrors.slice(0, 100), null, 2)
    );

    console.log(JSON.stringify({
      status: "explored",
      currentUrl: page.url(),
      quotationArea,
      newQuotationForm,
      consoleErrorCount: consoleErrors.length,
      outputDir
    }, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
