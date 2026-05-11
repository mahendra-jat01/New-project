// spec: test-plan.md
// SC-002: Invalid Login with Incorrect Password (Negative Test)

import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test('SC-002: Invalid Login with Incorrect Password', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');
    
    // Verify Login page is displayed
    await expect(page.locator('[data-test="username"]')).toBeVisible();

    // 2. Enter 'standard_user' in the Username textbox
    await page.locator('[data-test="username"]').fill('standard_user');
    await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');

    // 3. Enter 'wrong_password' in the Password textbox
    await page.locator('[data-test="password"]').fill('wrong_password');
    await expect(page.locator('[data-test="password"]')).toHaveValue('wrong_password');

    // 4. Click the Login button
    await page.locator('[data-test="login-button"]').click();
    
    // Verify user remains on login page and error message is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    
    // Verify error message contains appropriate text
    const errorText = await page.locator('[data-test="error"]').textContent();
    expect(errorText).toContain('do not match');
  });
});
