// spec: test-plan.md
// SC-001: Valid Login with Standard User Credentials

import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test('SC-001: Valid Login with Standard User Credentials', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');
    
    // Verify Login page is displayed with 'Swag Labs' header
    await expect(page.locator('[class*="login_logo"]')).toBeVisible();
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Locate the Username textbox and enter 'standard_user'
    await page.locator('[data-test="username"]').fill('standard_user');
    await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');

    // 3. Locate the Password textbox and enter 'secret_sauce'
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');

    // 4. Click the Login button
    await page.locator('[data-test="login-button"]').click();
    
    // Verify user is redirected to inventory page
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[class*="inventory_list"]')).toBeVisible();
    await expect(page.locator('[class*="app_logo"]')).toBeVisible();
  });
});
