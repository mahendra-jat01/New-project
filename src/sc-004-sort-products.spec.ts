// spec: test-plan.md
// SC-004: Filter/Sort Products by Name (A-Z) and Price (Low to High)

import { test, expect } from '@playwright/test';

test.describe('Shopping and Catalog Tests', () => {
  test('SC-004: Sort Products by Name and Price', async ({ page }) => {
    // 1. Perform valid login with standard_user credentials
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await expect(page).toHaveURL(/inventory\.html/);

    // 2. Locate the sorting dropdown
    const sortDropdown = page.locator('[data-test="product_sort_container"]');
    await expect(sortDropdown).toBeVisible();

    // 3. Verify dropdown options
    await sortDropdown.selectOption('lohi');
    await page.waitForTimeout(500);

    // 4. Select 'Price (low to high)' and verify products are reordered
    const productPrices = await page.locator('[class*="inventory_item_price"]').allTextContents();
    
    // Extract numeric values from prices
    const priceValues = productPrices.map(price => parseFloat(price.replace('$', '')));
    
    // Verify prices are in ascending order
    for (let i = 0; i < priceValues.length - 1; i++) {
      expect(priceValues[i]).toBeLessThanOrEqual(priceValues[i + 1]);
    }

    // 5. Select 'Name (Z to A)' and verify products are reordered
    await sortDropdown.selectOption('za');
    await page.waitForTimeout(500);

    const productNames = await page.locator('[class*="inventory_item_name"]').allTextContents();
    
    // Verify names are in descending order
    for (let i = 0; i < productNames.length - 1; i++) {
      expect(productNames[i].localeCompare(productNames[i + 1])).toBeGreaterThanOrEqual(0);
    }
  });
});
