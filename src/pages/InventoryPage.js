const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  productName(name) {
    return this.page.locator('[data-test="inventory-item-name"]', { hasText: name });
  }

  addToCartButton(productSlug) {
    return this.page.locator(`[data-test="add-to-cart-${productSlug}"]`);
  }

  async assertLoaded() {
    await expect(this.title).toHaveText("Products");
  }

  async addProductToCart(productSlug) {
    await this.click(this.addToCartButton(productSlug));
  }

  async assertCartCount(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart() {
    await this.click(this.cartLink);
  }
}

module.exports = { InventoryPage };
