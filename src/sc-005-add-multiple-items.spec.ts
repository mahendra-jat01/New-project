// spec: test-plan.md
// SC-005: Add Multiple Products to Cart and Verify Display

import { test, expect } from '@playwright/test';

test.describe('Shopping and Catalog Tests', () => {
  test('SC-005: Add Multiple Products to Cart and Verify Display', async ({ page }) => {
    // 1. Perform valid login with standard_user credentials
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await expect(page).toHaveURL(/inventory\.html/);

    // 2. Click 'Add to cart' button for Sauce Labs Backpack
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Verify button changes to 'Remove'
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    
    // Verify cart badge shows '1'
    let badge = page.locator('[class*="shopping_cart_badge"]');
    await expect(badge).toContainText('1');

    // 3. Click 'Add to cart' button for Sauce Labs Bike Light
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
    // Verify button changes to 'Remove'
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    
    // Verify cart badge updates to '2'
    await expect(badge).toContainText('2');

    // 4. Click 'Add to cart' button for Test.allTheThings() T-Shirt (Red)
    await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    
    // Verify button changes to 'Remove'
    await expect(page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]')).toBeVisible();
    
    // Verify cart badge updates to '3'
    await expect(badge).toContainText('3');

    // 5. Click shopping cart link
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    // Verify user is on cart page
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('text="Your Cart"')).toBeVisible();

    // Verify all 3 items are listed
    const cartItems = await page.locator('[class*="cart_item"]').count();
    expect(cartItems).toBe(3);
  });
});
