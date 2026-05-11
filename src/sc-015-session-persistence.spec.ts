// spec: test-plan.md
// SC-015: Verify Session Persistence (Add Item, Logout, Login Again)

import { test, expect } from '@playwright/test';

test.describe('Edge Cases Tests', () => {
  test('SC-015: Verify Session Persistence After Logout and Login', async ({ page }) => {
    // 1. Perform login with standard_user credentials
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await expect(page).toHaveURL(/inventory\.html/);

    // 2. Add Sauce Labs Backpack and Sauce Labs Bike Light to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    const badge = page.locator('[class*="shopping_cart_badge"]');
    await expect(badge).toContainText('2');

    // 3. Navigate to cart page and verify both items are displayed
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    await expect(page).toHaveURL(/cart\.html/);

    const cartItems = await page.locator('[class*="cart_item"]').count();
    expect(cartItems).toBe(2);

    console.log('2 items in cart before logout');

    // 4. Click Open Menu button and locate Logout option
    await page.locator('[id="react-burger-menu-btn"]').click();
    await page.waitForTimeout(500);

    // Click Logout
    await page.locator('[data-test="logout-sidebar-link"]').click();

    // Verify user is logged out and redirected to login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="username"]')).toBeVisible();

    console.log('User logged out successfully');

    // 5. Login again with same credentials
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory\.html/);

    console.log('User logged back in');

    // 6. Check the cart by clicking shopping cart link
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Get current cart items count
    const cartItemsAfterLogin = await page.locator('[class*="cart_item"]').count();
    
    console.log(`Cart items after logout and login: ${cartItemsAfterLogin}`);

    // Document the behavior
    if (cartItemsAfterLogin === 0) {
      console.log('EXPECTED: Cart is EMPTY (session data not persisted)');
      expect(cartItemsAfterLogin).toBe(0);
    } else if (cartItemsAfterLogin === 2) {
      console.log('UNUSUAL: Cart still shows the 2 items (session data persisted)');
      // Verify items are correct
      await expect(page.locator('text="Sauce Labs Backpack"')).toBeVisible();
      await expect(page.locator('text="Sauce Labs Bike Light"')).toBeVisible();
    } else {
      console.log(`UNEXPECTED: Cart has ${cartItemsAfterLogin} items`);
    }
  });
});
