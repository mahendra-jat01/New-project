// spec: test-plan.md
// SC-008: Complete Checkout Form with Random Billing Data

import { test, expect } from '@playwright/test';

test.describe('Checkout Tests', () => {
  test('SC-008: Complete Checkout Form with Random Billing Data', async ({ page }) => {
    // 1. Perform valid login with standard_user credentials
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    await expect(page).toHaveURL(/inventory\.html/);

    // 2. Add Sauce Labs Backpack to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    const badge = page.locator('[class*="shopping_cart_badge"]');
    await expect(badge).toContainText('1');

    // 3. Navigate to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('text="Your Cart"')).toBeVisible();

    // 4. Click 'Checkout' button
    await page.locator('[data-test="checkout"]').click();

    // Verify user is on checkout step one page
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.locator('text="Checkout: Your Information"')).toBeVisible();

    // Verify form fields are visible
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();

    // 5. Enter first name 'Robert'
    await page.locator('[data-test="firstName"]').fill('Robert');
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('Robert');

    // 6. Enter last name 'Smith'
    await page.locator('[data-test="lastName"]').fill('Smith');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Smith');

    // 7. Enter postal code '90210'
    await page.locator('[data-test="postalCode"]').fill('90210');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('90210');

    // 8. Click the 'Continue' button
    await page.locator('[data-test="continue"]').click();

    // Verify user is navigated to checkout step two
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('text="Checkout: Overview"')).toBeVisible();
  });
});
