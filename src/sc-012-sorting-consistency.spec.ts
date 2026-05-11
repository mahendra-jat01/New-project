// spec: test-plan.md
// SC-012: Verify Sorting Consistency When Adding Items Mid-Sort

import { test, expect } from '@playwright/test';

test.describe('Bug and Known Issues Tests', () => {
  test('SC-012: Verify Sorting Consistency When Adding Items Mid-Sort', async ({ page }) => {
    // 1. Perform login and navigate to inventory page
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await expect(page).toHaveURL(/inventory\.html/);

    // Verify default sort is 'Name (A to Z)'
    const sortDropdown = page.locator('[data-test="product_sort_container"]');
    const defaultValue = await sortDropdown.inputValue();
    console.log(`Default sort: ${defaultValue}`);

    // 2. Click on the sort dropdown and select 'Price (low to high)'
    await sortDropdown.selectOption('lohi');
    await page.waitForTimeout(500);

    // Verify products reorder by price ascending
    const initialPrices = await page.locator('[class*="inventory_item_price"]').allTextContents();
    const priceValues = initialPrices.map(price => parseFloat(price.replace('$', '')));
    
    console.log(`Initial prices (low to high): ${priceValues.join(', ')}`);

    // Verify first product is Sauce Labs Onesie ($7.99)
    const firstProductName = await page.locator('[class*="inventory_item_name"]').first().textContent();
    expect(firstProductName).toContain('Onesie');
    
    // Verify last product is Sauce Labs Fleece Jacket ($49.99)
    const lastProductName = await page.locator('[class*="inventory_item_name"]').last().textContent();
    expect(lastProductName).toContain('Fleece Jacket');

    // 3. While in 'Price (low to high)' sort, add Sauce Labs Fleece Jacket to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    
    const badge = page.locator('[class*="shopping_cart_badge"]');
    await expect(badge).toContainText('1');

    // Verify products remain sorted by price (low to high)
    const midSortPrices = await page.locator('[class*="inventory_item_price"]').allTextContents();
    const midPriceValues = midSortPrices.map(price => parseFloat(price.replace('$', '')));
    
    console.log(`Prices after adding highest price item: ${midPriceValues.join(', ')}`);

    // Verify prices are still in ascending order
    for (let i = 0; i < midPriceValues.length - 1; i++) {
      expect(midPriceValues[i]).toBeLessThanOrEqual(midPriceValues[i + 1]);
    }

    // 4. Add Sauce Labs Onesie (lowest price $7.99) to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    
    await expect(badge).toContainText('2');

    // Verify sorting order is maintained
    const finalPrices = await page.locator('[class*="inventory_item_price"]').allTextContents();
    const finalPriceValues = finalPrices.map(price => parseFloat(price.replace('$', '')));
    
    console.log(`Prices after adding lowest price item: ${finalPriceValues.join(', ')}`);

    // Verify prices are still in ascending order
    for (let i = 0; i < finalPriceValues.length - 1; i++) {
      expect(finalPriceValues[i]).toBeLessThanOrEqual(finalPriceValues[i + 1]);
    }

    // 5. Navigate to cart and verify both items are listed correctly
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    await expect(page).toHaveURL(/cart\.html/);

    const cartItems = await page.locator('[class*="cart_item"]').count();
    expect(cartItems).toBe(2);

    console.log('Both items successfully added to cart with sort order maintained');
  });
});
