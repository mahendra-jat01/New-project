const path = require("path");
const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class AutomationExercisePage extends BasePage {
  constructor(page) {
    super(page);
    this.defaultPassword = "Password123!";
    this.reviewProductName = null;
    this.expectTimeout = Number(process.env.EXPECT_TIMEOUT || 30000);
  }

  createUserData(prefix = "ae") {
    const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return {
      name: `Codex User ${id}`,
      email: `${prefix}.${id}@example.com`,
      password: this.defaultPassword,
      firstName: "Codex",
      lastName: `User${id}`,
      company: "OpenAI",
      address1: "123 Test Street",
      address2: "Suite 45",
      country: "United States",
      state: "California",
      city: "San Francisco",
      zipcode: "94105",
      mobile: `555${id.slice(-7)}`,
      comment: "Please deliver during business hours."
    };
  }

  async open(url = "https://automationexercise.com") {
    await this.page.goto(url.replace("http://", "https://"), { waitUntil: "domcontentloaded" });
    await this.dismissOverlays();
  }

  async dismissOverlays() {
    const consent = this.page.locator("button:has-text('Consent'), button:has-text('Accept'), .fc-cta-consent").first();
    if (await consent.isVisible({ timeout: 2500 }).catch(() => false)) {
      await consent.click().catch(() => {});
    }
  }

  async waitUntilReady() {
    await this.page.waitForLoadState("domcontentloaded").catch(() => {});
    await this.dismissOverlays();
  }

  async clickAndSettle(locator) {
    await locator.click();
    await this.waitUntilReady();
  }

  async assertHomeVisible() {
    await expect(this.page).toHaveURL(/automationexercise\.com/, { timeout: this.expectTimeout });
    await expect(this.page.locator("a[href='/products'], a[href='/login'], a[href='/view_cart']").first()).toBeVisible({
      timeout: this.expectTimeout
    });
  }

  navLink(label) {
    const map = {
      "Signup / Login": "a[href='/login']",
      "Contact Us": "a[href='/contact_us']",
      "Test Cases": "a[href='/test_cases']",
      Products: "a[href='/products']",
      Cart: "a[href='/view_cart']",
      Logout: "a[href='/logout']",
      "Delete Account": "a[href='/delete_account']",
      Home: "a[href='/']",
      "Register / Login": "#checkoutModal u:has-text('Register / Login'), #checkoutModal a:has-text('Register / Login')"
    };
    return map[label] ? this.page.locator(map[label]).first() : null;
  }

  button(label) {
    const lower = label.toLowerCase();
    const selectors = {
      Signup: "button[data-qa='signup-button']",
      login: "button[data-qa='login-button']",
      Login: "button[data-qa='login-button']",
      "Create Account": "button[data-qa='create-account']",
      Continue: "a[data-qa='continue-button'], a:has-text('Continue')",
      Submit: "input[data-qa='submit-button'], button:has-text('Submit')",
      "Add to cart": "button.cart, .cart",
      "View Cart": "#cartModal u:has-text('View Cart'), #cartModal a:has-text('View Cart')",
      "Continue Shopping": "#cartModal button:has-text('Continue Shopping'), button:has-text('Continue Shopping')",
      "Download Invoice": "a:has-text('Download Invoice')"
    };
    if (selectors[label]) {
      return this.page.locator(selectors[label]).first();
    }
    return this.page.locator(`button:has-text("${label}"), a:has-text("${label}"), input[value="${label}"]`).first();
  }

  async clickNamed(label) {
    const nav = this.navLink(label);
    if (nav && await nav.isVisible({ timeout: 1500 }).catch(() => false)) {
      await this.clickAndSettle(nav);
      return;
    }
    await this.clickAndSettle(this.button(label));
  }

  async assertTextVisible(text) {
    const textAliases = {
      "Your order has been placed successfully!": /Your order has been placed successfully!|Congratulations! Your order has been confirmed!/i
    };
    const locator = textAliases[text]
      ? this.page.getByText(textAliases[text]).first()
      : this.page.getByText(text, { exact: false }).first();

    await expect(locator).toBeVisible({
      timeout: this.expectTimeout
    });
  }

  async assertErrorVisible(message) {
    await expect(this.page.locator(`text=${message}`).first()).toBeVisible({
      timeout: this.expectTimeout
    });
  }

  async enterSignup(user) {
    await this.page.locator("input[data-qa='signup-name']").fill(user.name);
    await this.page.locator("input[data-qa='signup-email']").fill(user.email);
  }

  async enterLogin(email, password) {
    await this.page.locator("input[data-qa='login-email']").fill(email);
    await this.page.locator("input[data-qa='login-password']").fill(password);
  }

  async fillAccountDetails(user) {
    // The demo site can be slow to render the account info form after signup.
    // Wait for the gender radio to attach before interacting with the form.
    const gender = this.page.locator("#id_gender1");
    await gender.waitFor({ state: "attached", timeout: 45000 });
    await gender.check({ force: true });
    await this.page.locator("#password").fill(user.password);
    await this.page.locator("#days").selectOption("10");
    await this.page.locator("#months").selectOption("5");
    await this.page.locator("#years").selectOption("1990");
  }

  async selectCheckbox(label) {
    const specific = {
      "Sign up for our newsletter!": "input#newsletter",
      "Receive special offers from our partners!": "input#optin"
    };
    const selector = specific[label] || `label:has-text("${label}") input[type='checkbox']`;
    const checkbox = this.page.locator(selector).first();

    try {
      await checkbox.check({ force: true });
    } catch (err) {
      // Fallback: click the label / checkbox element directly
      await this.page.locator(`label:has-text("${label}")`).first().click({ force: true });
    }
  }

  async fillAddressDetails(user) {
    await this.page.locator("#first_name").fill(user.firstName);
    await this.page.locator("#last_name").fill(user.lastName);
    await this.page.locator("#company").fill(user.company);
    await this.page.locator("#address1").fill(user.address1);
    await this.page.locator("#address2").fill(user.address2);
    await this.page.locator("#country").selectOption(user.country);
    await this.page.locator("#state").fill(user.state);
    await this.page.locator("#city").fill(user.city);
    await this.page.locator("#zipcode").fill(user.zipcode);
    await this.page.locator("#mobile_number").fill(user.mobile);
  }

  async registerNewUser(user) {
    await this.clickNamed("Signup / Login");
    await this.enterSignup(user);
    await this.clickNamed("Signup");
    // Wait for the account info form to load before filling it
    await this.assertTextVisible("ENTER ACCOUNT INFORMATION");
    await this.fillAccountDetails(user);
    await this.selectCheckbox("Sign up for our newsletter!");
    await this.selectCheckbox("Receive special offers from our partners!");
    await this.fillAddressDetails(user);
    await this.clickNamed("Create Account");
  }

  async assertLoggedIn(user) {
    await expect(this.page.locator("a:has-text('Logged in as')")).toContainText(user.name, {
      timeout: this.expectTimeout
    });
  }

  async createAccountThroughUi(user) {
    await this.enterSignup(user);
    await this.clickNamed("Signup");
    await this.fillAccountDetails(user);
    await this.fillAddressDetails(user);
    await this.clickNamed("Create Account");
  }

  async ensureRegisteredUser(world) {
    if (!world.testData.registeredUser) {
      const user = this.createUserData("registered");
      await this.registerNewUser(user);
      await this.assertTextVisible("ACCOUNT CREATED!");
      await this.clickNamed("Continue");
      await this.clickNamed("Logout");
      world.testData.registeredUser = user;
    }
    return world.testData.registeredUser;
  }

  async assertOnLoginPage() {
    await expect(this.page).toHaveURL(/\/login/, { timeout: this.expectTimeout });
    await this.assertTextVisible("Login to your account");
  }

  async assertAllProductsPage() {
    await expect(this.page).toHaveURL(/\/products/, { timeout: this.expectTimeout });
    await this.assertTextVisible("ALL PRODUCTS");
  }

  async assertProductsVisible() {
    await expect(this.page.locator(".features_items .product-image-wrapper").first()).toBeVisible({
      timeout: this.expectTimeout
    });
  }

  async viewFirstProduct() {
    await this.clickAndSettle(this.page.locator("a:has-text('View Product')").first());
  }

  async assertProductDetailVisible() {
    await expect(this.page.locator(".product-information")).toBeVisible({ timeout: this.expectTimeout });
    await expect(this.page.locator(".product-information")).toContainText(/Category|Availability|Condition|Brand/, {
      timeout: this.expectTimeout
    });
  }

  async searchProduct(term = "dress") {
    await this.page.locator("#search_product").fill(term);
    await this.page.locator("#submit_search").click();
  }

  async assertSearchedProducts(term = "dress") {
    await this.assertTextVisible("SEARCHED PRODUCTS");
    await expect(this.page.locator(".features_items .product-image-wrapper").first()).toBeVisible({
      timeout: this.expectTimeout
    });
    await expect(this.page.locator(".productinfo").first()).toContainText(new RegExp(term, "i"), {
      timeout: this.expectTimeout
    });
  }

  async addFirstProductFromList() {
    await this.page.locator(".features_items .product-image-wrapper").first().hover();
    await this.page.locator(".features_items .product-image-wrapper .overlay-content a:has-text('Add to cart')").first().click();
    await expect(this.page.locator("#cartModal")).toBeVisible({ timeout: this.expectTimeout });
  }

  async addSecondProductFromList() {
    await expect(this.page.locator("#cartModal")).toBeHidden({ timeout: this.expectTimeout }).catch(() => {});
    await this.page.locator(".features_items .product-image-wrapper").nth(1).hover();
    await this.page.locator(".features_items .product-image-wrapper .overlay-content a:has-text('Add to cart')").nth(1).click();
    await expect(this.page.locator("#cartModal")).toBeVisible({ timeout: this.expectTimeout });
  }

  async assertCartHasRows(count = 1) {
    await expect(this.page.locator("#cart_info_table tbody tr")).toHaveCount(count, { timeout: this.expectTimeout });
  }

  async assertCartPrices() {
    const rows = this.page.locator("#cart_info_table tbody tr");
    const rowCount = await rows.count();
    for (let i = 0; i < rowCount; i += 1) {
      await expect(rows.nth(i).locator(".cart_price")).toBeVisible({ timeout: this.expectTimeout });
      await expect(rows.nth(i).locator(".cart_quantity")).toBeVisible({ timeout: this.expectTimeout });
      await expect(rows.nth(i).locator(".cart_total")).toBeVisible({ timeout: this.expectTimeout });
    }
  }

  async setQuantityAndAdd(quantity) {
    await this.page.locator("#quantity").fill(String(quantity));
    await this.button("Add to cart").click();
    await expect(this.page.locator("#cartModal")).toBeVisible({ timeout: this.expectTimeout });
  }

  async assertCartQuantity(quantity) {
    await expect(this.page.locator(".cart_quantity button").first()).toHaveText(String(quantity), {
      timeout: this.expectTimeout
    });
  }

  async removeFirstCartProduct() {
    await this.page.locator(".cart_quantity_delete").first().click();
  }

  async assertCartEmptyOrRemoved() {
    await expect(this.page.locator("#cart_info_table tbody tr")).toHaveCount(0, { timeout: this.expectTimeout });
  }

  async addRecommendedProduct() {
    await this.page.locator(".recommended_items").scrollIntoViewIfNeeded();
    await expect(this.page.locator(".recommended_items")).toContainText(/recommended items/i, {
      timeout: this.expectTimeout
    });
    await this.page.locator(".recommended_items a:has-text('Add to cart')").first().click();
    await expect(this.page.locator("#cartModal")).toBeVisible({ timeout: this.expectTimeout });
  }

  async addProductsToCart() {
    await this.clickNamed("Products");
    await this.addFirstProductFromList();
    await this.clickNamed("Continue Shopping");
  }

  async proceedToCheckout() {
    await this.page.locator("a:has-text('Proceed To Checkout')").click();
  }

  async assertCheckoutSections() {
    await this.assertTextVisible("Address Details");
    await this.assertTextVisible("Review Your Order");
  }

  async placeOrder(user) {
    await this.page.locator("textarea[name='message']").fill(user.comment);
    await this.page.locator("a:has-text('Place Order')").click();
  }

  async enterPayment() {
    await this.page.locator("input[data-qa='name-on-card']").fill("Codex User");
    await this.page.locator("input[data-qa='card-number']").fill("4111111111111111");
    await this.page.locator("input[data-qa='cvc']").fill("123");
    await this.page.locator("input[data-qa='expiry-month']").fill("12");
    await this.page.locator("input[data-qa='expiry-year']").fill("2030");
  }

  async payAndConfirm() {
    await this.page.locator("button[data-qa='pay-button']").click();
  }

  async downloadInvoice() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.clickNamed("Download Invoice")
    ]);
    const filePath = await download.path();
    expect(filePath).toBeTruthy();
  }

  async assertAddressesMatch(user) {
    await expect(this.page.locator("#address_delivery")).toContainText(user.firstName, { timeout: this.expectTimeout });
    await expect(this.page.locator("#address_delivery")).toContainText(user.address1, { timeout: this.expectTimeout });
    await expect(this.page.locator("#address_invoice")).toContainText(user.firstName, { timeout: this.expectTimeout });
    await expect(this.page.locator("#address_invoice")).toContainText(user.address1, { timeout: this.expectTimeout });
  }

  async submitContactForm() {
    await this.page.locator("input[data-qa='name']").fill("Codex User");
    await this.page.locator("input[data-qa='email']").fill("codex.contact@example.com");
    await this.page.locator("input[data-qa='subject']").fill("Automation Exercise contact");
    await this.page.locator("textarea[data-qa='message']").fill("Testing contact form submission.");
    await this.page.locator("input[name='upload_file']").setInputFiles(path.resolve("fixtures/contact-upload.txt"));
  }

  async acceptAlertAndSubmit() {
    this.page.once("dialog", async (dialog) => dialog.accept());
    await this.clickNamed("Submit");
  }

  async assertTestCasesPage() {
    await expect(this.page).toHaveURL(/\/test_cases/, { timeout: this.expectTimeout });
    await this.assertTextVisible("Test Cases");
  }

  async subscribe() {
    await this.page.locator("#susbscribe_email").fill(`sub.${Date.now()}@example.com`);
    await this.page.locator("#subscribe").click();
  }

  async scrollFooter() {
    await this.page.locator("footer").scrollIntoViewIfNeeded();
  }

  async assertCartPage() {
    await expect(this.page).toHaveURL(/\/view_cart/, { timeout: this.expectTimeout });
    await expect(this.page.locator("#cart_info, .empty_cart").first()).toBeVisible({ timeout: this.expectTimeout });
  }

  async assertCategoriesVisible() {
    await expect(this.page.locator(".left-sidebar")).toContainText("Category", { timeout: this.expectTimeout });
  }

  async openCategory() {
    await this.page.locator("a[href='#Women']").click();
    await this.page.locator("#Women a").first().click();
  }

  async assertCategoryPage() {
    await expect(this.page).toHaveURL(/category_products/, { timeout: this.expectTimeout });
    await expect(this.page.locator(".features_items")).toBeVisible({ timeout: this.expectTimeout });
  }

  async openMenSubCategory() {
    await this.page.locator("a[href='#Men']").click();
    await this.page.locator("#Men a").first().click();
  }

  async assertBrandsVisible() {
    await expect(this.page.locator(".brands_products")).toContainText("Brands", { timeout: this.expectTimeout });
  }

  async openBrand(index = 0) {
    await this.page.locator(".brands-name a").nth(index).click();
  }

  async assertBrandPage() {
    await expect(this.page).toHaveURL(/brand_products/, { timeout: this.expectTimeout });
    await expect(this.page.locator(".features_items")).toBeVisible({ timeout: this.expectTimeout });
  }

  async addSearchedProductsToCart() {
    await this.addFirstProductFromList();
    await this.clickNamed("View Cart");
  }

  async assertCartStillVisible() {
    await expect(this.page.locator("#cart_info_table tbody tr").first()).toBeVisible({ timeout: this.expectTimeout });
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async clickScrollArrow() {
    await this.page.locator("#scrollUp").click();
  }

  async assertScrolledUp() {
    await expect.poll(() => this.page.evaluate(() => window.scrollY)).toBeLessThan(200);
  }

  async addReview() {
    await this.page.locator("#name").fill("Codex Reviewer");
    await this.page.locator("#email").fill(`review.${Date.now()}@example.com`);
    await this.page.locator("#review").fill("Great test product.");
  }
}

module.exports = { AutomationExercisePage };
