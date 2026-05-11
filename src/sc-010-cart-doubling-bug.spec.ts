// spec: test-plan.md
// SC-010: Reproduce Cart Doubling Bug (Add 1 Item → Verify if Shows as 2)

import { test, expect } from '@playwright/test';

test.describe('Bug and Known Issues Tests', () => {
  test('SC-010: Reproduce Cart Doubling Bug', async ({ page }) => {
    // 1. Navigate and perform login with standard_user / secret_sauce
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await expect(page).toHaveURL(/inventory\.html/);

    // 2. Inspect the initial cart badge state (should be empty or '0')
    const badge = page.locator('[class*="shopping_cart_badge"]');
    expect(await badge.count()).toBe(0);

    // 3. Click 'Add to cart' button for exactly ONE product (Sauce Labs Onesie)
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    
    // Verify button changes to 'Remove'
    await expect(page.locator('[data-test="remove-sauce-labs-onesie"]')).toBeVisible();

    // 4. Immediately inspect the cart badge to verify it shows '1'
    await expect(badge).toBeVisible();
    const badgeText = await badge.textContent();
    
    // Log the actual badge value for bug documentation
    console.log(`Cart badge after adding 1 item: ${badgeText}`);
    
    // EXPECTED: Badge should show '1'
    // BUG CONDITION: If badge shows '2', this indicates the cart doubling bug
    if (badgeText !== '1') {
      console.warn(`CART DOUBLING BUG DETECTED: Expected badge to show "1", but shows "${badgeText}"`);
    }
    
    expect(badgeText).toBe('1');

    // 5. Navigate to cart page and verify the item count
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    await expect(page).toHaveURL(/cart\.html/);

    // Verify cart displays exactly 1 item
    const cartItems = await page.locator('[class*="cart_item"]').count();
    expect(cartItems).toBe(1);

    // Verify quantity column shows '1' not '2'
    const quantity = page.locator('[class*="cart_quantity"]');
    const quantityText = await quantity.textContent();
    
    console.log(`Cart quantity for single item: ${quantityText}`);
    
    if (quantityText !== '1') {
      console.warn(`CART DOUBLING BUG DETECTED: Expected quantity to show "1", but shows "${quantityText}"`);
    }
    
    expect(quantityText).toBe('1');

    // 6. Check browser console for errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`Browser Console Error: ${msg.text()}`);
      }
    });
  });
});
