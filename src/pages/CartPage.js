const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  cartItem(name) {
    return this.page.locator('[data-test="inventory-item-name"]', { hasText: name });
  }

  async assertLoaded() {
    await expect(this.title).toHaveText("Your Cart");
  }

  async assertProductVisible(name) {
    await expect(this.cartItem(name)).toBeVisible();
  }

  async startCheckout() {
    await this.click(this.checkoutButton);
  }
}

module.exports = { CartPage };
