// spec: test-plan.md
// SC-009: Successfully Place Order and Verify Confirmation

import { test, expect } from '@playwright/test';

test.describe('Checkout Tests', () => {
  test('SC-009: Successfully Place Order and Verify Confirmation', async ({ page }) => {
    // 1. Perform complete checkout process
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await expect(page).toHaveURL(/inventory\.html/);

    // Add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Navigate to cart
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    // Click Checkout
    await page.locator('[data-test="checkout"]').click();

    // Fill checkout form
    await page.locator('[data-test="firstName"]').fill('Alice');
    await page.locator('[data-test="lastName"]').fill('Johnson');
    await page.locator('[data-test="postalCode"]').fill('55555');

    // Click Continue
    await page.locator('[data-test="continue"]').click();

    // Verify user reaches checkout overview page
    await expect(page).toHaveURL(/checkout-step-two\.html/);

    // 2. Verify order summary is displayed
    await expect(page.locator('text="Payment Information"')).toBeVisible();
    await expect(page.locator('text="Shipping Information"')).toBeVisible();

    // Verify item details
    await expect(page.locator('text="Sauce Labs Backpack"')).toBeVisible();
    await expect(page.locator('text="$29.99"')).toBeVisible();

    // Verify totals
    const summaryText = await page.locator('[class*="summary"]').textContent();
    expect(summaryText).toContain('$29.99'); // Item total
    expect(summaryText).toContain('$2.40');  // Tax
    expect(summaryText).toContain('$32.39'); // Total

    // 3. Click the 'Finish' button to place the order
    await page.locator('[data-test="finish"]').click();

    // Verify order is successfully placed
    await expect(page).toHaveURL(/checkout-complete\.html/);

    // 4. Verify confirmation message is displayed
    await expect(page.locator('text="Checkout: Complete!"')).toBeVisible();
    await expect(page.locator('text="Thank you for your order!"')).toBeVisible();
    await expect(page.locator('text="Your order has been dispatched"')).toBeVisible();

    // 5. Click 'Back Home' button
    await page.locator('[data-test="back-to-products"]').click();

    // Verify user is redirected to inventory page
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
