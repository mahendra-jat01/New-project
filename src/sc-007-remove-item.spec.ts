// spec: test-plan.md
// SC-007: Remove Item from Cart and Verify Quantity Updates

import { test, expect } from '@playwright/test';

test.describe('Cart Management Tests', () => {
  test('SC-007: Remove Item from Cart and Verify Quantity Updates', async ({ page }) => {
    // 1. Perform valid login and add 2 items to cart
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await expect(page).toHaveURL(/inventory\.html/);

    // Add Sauce Labs Backpack
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Add Sauce Labs Bike Light
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    const badge = page.locator('[class*="shopping_cart_badge"]');
    await expect(badge).toContainText('2');

    // 2. Navigate to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    await expect(page).toHaveURL(/cart\.html/);
    
    // Verify cart displays 2 items
    let cartItems = await page.locator('[class*="cart_item"]').count();
    expect(cartItems).toBe(2);
    await expect(badge).toContainText('2');

    // 3. Click 'Remove' button for Sauce Labs Backpack
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Verify item is removed
    await expect(page.locator('text="Sauce Labs Backpack"')).not.toBeVisible();
    
    // Verify cart badge updates to '1'
    await expect(badge).toContainText('1');
    
    // Verify cart now displays only Sauce Labs Bike Light
    cartItems = await page.locator('[class*="cart_item"]').count();
    expect(cartItems).toBe(1);

    // 4. Click 'Remove' button for Sauce Labs Bike Light
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

    // Verify cart is empty or badge is not visible
    const badgeCount = await badge.count();
    if (badgeCount > 0) {
      const badgeText = await badge.textContent();
      expect(badgeText).toBe('0');
    }

    // Verify cart displays empty state
    cartItems = await page.locator('[class*="cart_item"]').count();
    expect(cartItems).toBe(0);

    // 5. Navigate back to inventory using 'Continue Shopping' button
    await page.locator('[data-test="continue-shopping"]').click();
    
    await expect(page).toHaveURL(/inventory\.html/);
    
    // Verify all products show 'Add to cart' buttons
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();
  });
});
