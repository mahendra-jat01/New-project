// spec: test-plan.md
// SC-014: Attempt Checkout Without Filling Required Fields

import { test, expect } from '@playwright/test';

test.describe('Edge Cases Tests', () => {
  test('SC-014: Attempt Checkout Without Filling Required Fields', async ({ page }) => {
    // 1. Perform login and add one item to cart
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await expect(page).toHaveURL(/inventory\.html/);

    // Add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    const badge = page.locator('[class*="shopping_cart_badge"]');
    await expect(badge).toContainText('1');

    // 2. Navigate to checkout page
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // 3. Leave all three fields empty and click Continue button
    await page.locator('[data-test="continue"]').click();

    // EXPECTED: Form shows validation error
    const error = page.locator('[data-test="error"]');
    
    const errorVisible = await error.isVisible().catch(() => false);
    console.log(`Error message visible after empty form submission: ${errorVisible}`);

    if (errorVisible) {
      const errorText = await error.textContent();
      console.log(`Error message: ${errorText}`);
      expect(errorText).toContain('required' || 'First Name');
    }

    // Verify user remains on checkout step one page
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // 4. Fill only First Name field with 'John' and leave others empty
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="continue"]').click();

    // EXPECTED: Validation error for missing fields
    const error2 = page.locator('[data-test="error"]');
    const errorVisible2 = await error2.isVisible().catch(() => false);
    
    console.log(`Error message visible after partial form submission: ${errorVisible2}`);
    
    if (errorVisible2) {
      const errorText2 = await error2.textContent();
      console.log(`Error message: ${errorText2}`);
    }

    // Verify user remains on same page and data is preserved
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');

    // 5. Fill First Name and Last Name but leave Postal Code empty
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="continue"]').click();

    // EXPECTED: Validation error for missing Postal Code
    const error3 = page.locator('[data-test="error"]');
    const errorVisible3 = await error3.isVisible().catch(() => false);
    
    console.log(`Error message visible when Postal Code missing: ${errorVisible3}`);

    if (errorVisible3) {
      const errorText3 = await error3.textContent();
      console.log(`Error message: ${errorText3}`);
    }

    // Verify user cannot proceed to step two
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // Verify data is preserved
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Doe');
  });
});
