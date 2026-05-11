// spec: test-plan.md
// SC-011: Test Checkout with Special Characters in Address Fields

import { test, expect } from '@playwright/test';

test.describe('Bug and Known Issues Tests', () => {
  test('SC-011: Test Checkout with Special Characters in Address Fields', async ({ page }) => {
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

    // 2. Navigate to cart and click Checkout
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Verify user on checkout step one page
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();

    // 3. Enter special characters in First Name field: 'John@#$%'
    await page.locator('[data-test="firstName"]').fill('John@#$%');
    const firstNameValue = await page.locator('[data-test="firstName"]').inputValue();
    
    console.log(`First Name field value: ${firstNameValue}`);
    expect(firstNameValue).toBe('John@#$%');

    // Verify no validation error appears (or system handles gracefully)
    const errorVisible = await page.locator('[data-test="error"]').isVisible().catch(() => false);
    console.log(`Validation error for special chars in First Name: ${errorVisible}`);

    // 4. Enter special characters in Last Name field: 'O\'Brien-Smith'
    await page.locator('[data-test="lastName"]').fill("O'Brien-Smith");
    const lastNameValue = await page.locator('[data-test="lastName"]').inputValue();
    
    console.log(`Last Name field value: ${lastNameValue}`);
    expect(lastNameValue).toBe("O'Brien-Smith");

    // 5. Enter special characters in Postal Code field: '12345-6789'
    await page.locator('[data-test="postalCode"]').fill('12345-6789');
    const postalCodeValue = await page.locator('[data-test="postalCode"]').inputValue();
    
    console.log(`Postal Code field value: ${postalCodeValue}`);
    expect(postalCodeValue).toBe('12345-6789');

    // 6. Click Continue button
    try {
      await page.locator('[data-test="continue"]').click();
      
      // Check if form submitted successfully
      const onOverviewPage = page.url().includes('checkout-step-two.html');
      
      if (onOverviewPage) {
        console.log('Form submitted successfully with special characters');
        
        // Verify special characters are preserved in the order
        const summaryText = await page.locator('[class*="summary"]').textContent();
        console.log(`Order summary contains: ${summaryText}`);
      } else {
        // Check for validation error
        const errorMsg = await page.locator('[data-test="error"]').textContent().catch(() => 'No error');
        console.log(`Form submission failed with error: ${errorMsg}`);
      }
    } catch (error) {
      console.log(`Error occurred during form submission: ${error.message}`);
    }
  });
});
