// spec: test-plan.md
// SC-006: Add Single Item to Cart and Verify Quantity (Test for Cart Doubling Bug)

import { test, expect } from '@playwright/test';

test.describe('Cart Management Tests', () => {
  test('SC-006: Add Single Item to Cart and Verify Quantity', async ({ page }) => {
    // 1. Perform valid login with standard_user credentials
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await expect(page).toHaveURL(/inventory\.html/);

    // 2. Verify cart is initially empty
    const badge = page.locator('[class*="shopping_cart_badge"]');
    expect(await badge.count()).toBe(0);

    // 3. Click 'Add to cart' button for exactly ONE product (Sauce Labs Onesie)
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

    // Verify button changes to 'Remove'
    await expect(page.locator('[data-test="remove-sauce-labs-onesie"]')).toBeVisible();

    // 4. Verify cart badge count is exactly 1 (NOT 2 - testing for cart doubling bug)
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('1');

    const badgeText = await badge.textContent();
    expect(badgeText).toBe('1');

    // 5. Navigate to cart page and verify item count
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    await expect(page).toHaveURL(/cart\.html/);
    
    // Verify cart shows exactly 1 item
    const cartItems = await page.locator('[class*="cart_item"]').count();
    expect(cartItems).toBe(1);

    // Verify quantity column shows '1' not '2'
    const quantity = page.locator('[class*="cart_quantity"]');
    await expect(quantity).toContainText('1');

    // 6. Verify item appears only once (no duplication)
    const itemName = page.locator('text="Sauce Labs Onesie"');
    const itemCount = await itemName.count();
    expect(itemCount).toBe(1);
  });
});
