require("dotenv").config();

const { Before, After, Status, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");

const browserTypes = { chromium, firefox, webkit };

setDefaultTimeout(Number(process.env.DEFAULT_TIMEOUT || 10000) * 6);

Before(async function () {
  const browserName = process.env.BROWSER || "chromium";
  const browserType = browserTypes[browserName];

  if (!browserType) {
    throw new Error(`Unsupported browser "${browserName}". Use chromium, firefox, or webkit.`);
  }

  this.browser = await browserType.launch({
    headless: process.env.HEADLESS !== "false",
    slowMo: Number(process.env.SLOW_MO || 0)
  });

  this.context = await this.browser.newContext({
    baseURL: process.env.BASE_URL || "https://www.saucedemo.com/",
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: "test-results/videos/" }
  });

  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(Number(process.env.DEFAULT_TIMEOUT || 10000));

  this.pages.loginPage = new LoginPage(this.page);
  this.pages.inventoryPage = new InventoryPage(this.page);
  this.pages.cartPage = new CartPage(this.page);
  this.pages.checkoutPage = new CheckoutPage(this.page);
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, "image/png");
  }

  if (this.context) {
    await this.context.close();
  }

  if (this.browser) {
    await this.browser.close();
  }
});
