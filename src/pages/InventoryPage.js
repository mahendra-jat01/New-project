// Page Object: InventoryPage
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  async getProductCount() {
    return this.page.locator('[class*="inventory_item"]').count();
  }

  async addProductToCart(productName) {
    const buttonSelector = `[data-test="add-to-cart-${productName}"]`;
    await this.click(this.page.locator(buttonSelector));
  }

  async removeProductFromCart(productName) {
    const buttonSelector = `[data-test="remove-${productName}"]`;
    await this.click(this.page.locator(buttonSelector));
  }

  async getCartBadgeCount() {
    const badge = this.page.locator('[class*="shopping_cart_badge"]');
    if (await badge.isVisible()) {
      return this.getText(badge);
    }
    return '0';
  }

  async clickCartLink() {
    await this.click(this.page.locator('[data-test="shopping-cart-link"]'));
  }

  async selectSort(option) {
    await this.click(this.page.locator('[data-test="product_sort_container"]'));
    await this.click(this.page.locator(`option[value="${option}"]`));
  }

  async getProductNames() {
    const products = await this.page.locator('[class*="inventory_item_name"]').allTextContents();
    return products;
  }

  async getProductPrices() {
    const prices = await this.page.locator('[class*="inventory_item_price"]').allTextContents();
    return prices;
  }

  async verifyAllProductsVisible() {
    await expect(this.page.locator('[class*="inventory_list"]')).toBeVisible();
    const count = await this.getProductCount();
    return count === 6;
  }
}
