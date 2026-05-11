// Page Object: LoginPage
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async navigateToLogin() {
    await this.goto('https://www.saucedemo.com/');
  }

  async fillUsername(username) {
    await this.fill(this.page.locator('[data-test="username"]'), username);
  }

  async fillPassword(password) {
    await this.fill(this.page.locator('[data-test="password"]'), password);
  }

  async clickLoginButton() {
    await this.click(this.page.locator('[data-test="login-button"]'));
  }

  async login(username, password) {
    await this.navigateToLogin();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage() {
    return this.getText(this.page.locator('[data-test="error"]'));
  }

  async isErrorDisplayed() {
    return this.page.locator('[data-test="error"]').isVisible();
  }
}
