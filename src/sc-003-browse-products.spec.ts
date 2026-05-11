// spec: test-plan.md
// SC-003: Browse and Verify All Products Display Correctly

import { test, expect } from '@playwright/test';

test.describe('Shopping and Catalog Tests', () => {
  test('SC-003: Browse and Verify All Products Display Correctly', async ({ page }) => {
    // 1. Perform valid login with standard_user credentials
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify user is on inventory page
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[class*="inventory_list"]')).toBeVisible();

    // 2. Observe the products displayed on the page
    const products = await page.locator('[class*="inventory_item"]').count();
    expect(products).toBe(6);

    // 3. Verify each product has required elements
    const productItems = page.locator('[class*="inventory_item"]');
    
    for (let i = 0; i < 6; i++) {
      const item = productItems.nth(i);
      
      // Verify image is visible
      await expect(item.locator('img')).toBeVisible();
      
      // Verify product name link is visible
      await expect(item.locator('[class*="inventory_item_name"]')).toBeVisible();
      
      // Verify description is visible
      await expect(item.locator('[class*="inventory_item_desc"]')).toBeVisible();
      
      // Verify price is visible
      await expect(item.locator('[class*="inventory_item_price"]')).toBeVisible();
      
      // Verify Add to cart button is visible
      await expect(item.locator('button')).toBeVisible();
    }

    // Verify specific products and prices
    const backpackPrice = page.locator('[data-test="inventory-item-sauce-labs-backpack-price"]');
    await expect(backpackPrice).toContainText('$29.99');

    const bikeLightPrice = page.locator('[data-test="inventory-item-sauce-labs-bike-light-price"]');
    await expect(bikeLightPrice).toContainText('$9.99');
  });
});
