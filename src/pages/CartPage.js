// Page Object: CartPage
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  async getCartItemCount() {
    return this.page.locator('[class*="cart_item"]').count();
  }

  async getCartItemNames() {
    return this.page.locator('[class*="cart_item_label"]').allTextContents();
  }

  async removeItemByName(productName) {
    const removeButton = this.page.locator(`[data-test="remove-${productName}"]`);
    await this.click(removeButton);
  }

  async clickCheckout() {
    await this.click(this.page.locator('[data-test="checkout"]'));
  }

  async clickContinueShopping() {
    await this.click(this.page.locator('[data-test="continue-shopping"]'));
  }

  async isCheckoutButtonVisible() {
    return this.page.locator('[data-test="checkout"]').isVisible();
  }

  async getCartSubtotal() {
    const subtotal = this.page.locator('[class*="summary_subtotal"]');
    return this.getText(subtotal);
  }

  async getCartTax() {
    const tax = this.page.locator('[class*="summary_tax"]');
    return this.getText(tax);
  }

  async getCartTotal() {
    const total = this.page.locator('[class*="summary_total"]');
    return this.getText(total);
  }

  async verifyCartEmpty() {
    const itemCount = await this.getCartItemCount();
    return itemCount === 0;
  }
}
