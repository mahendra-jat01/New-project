// Page Object: CheckoutPage
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  async fillFirstName(firstName) {
    await this.fill(this.page.locator('[data-test="firstName"]'), firstName);
  }

  async fillLastName(lastName) {
    await this.fill(this.page.locator('[data-test="lastName"]'), lastName);
  }

  async fillPostalCode(postalCode) {
    await this.fill(this.page.locator('[data-test="postalCode"]'), postalCode);
  }

  async clickContinue() {
    await this.click(this.page.locator('[data-test="continue"]'));
  }

  async clickFinish() {
    await this.click(this.page.locator('[data-test="finish"]'));
  }

  async fillCheckoutForm(firstName, lastName, postalCode) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
  }

  async getErrorMessage() {
    const error = this.page.locator('[data-test="error"]');
    if (await error.isVisible()) {
      return this.getText(error);
    }
    return null;
  }

  async isErrorDisplayed() {
    return this.page.locator('[data-test="error"]').isVisible();
  }

  async getOrderConfirmationMessage() {
    return this.getText(this.page.locator('[class*="complete-text"]'));
  }

  async isOrderConfirmationVisible() {
    return this.page.locator('[class*="complete-header"]').isVisible();
  }

  async clickBackHome() {
    await this.click(this.page.locator('[data-test="back-to-products"]'));
  }

  async getOrderSummaryItems() {
    return this.page.locator('[class*="cart_item"]').allTextContents();
  }
}
