// Page Object: MenuPage
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MenuPage extends BasePage {
  async clickMenuButton() {
    await this.click(this.page.locator('[id="react-burger-menu-btn"]'));
  }

  async clickLogout() {
    await this.click(this.page.locator('[data-test="logout-sidebar-link"]'));
  }

  async logout() {
    await this.clickMenuButton();
    await this.page.waitForTimeout(500);
    await this.clickLogout();
  }

  async isMenuOpen() {
    return this.page.locator('[class*="sidebar"]').isVisible();
  }
}
