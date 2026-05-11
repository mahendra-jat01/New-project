# SauceDemo Comprehensive Test Plan

## Application Overview

SauceDemo is an e-commerce web application designed for practicing web testing automation. It includes login, product browsing, cart management, and checkout functionality. The application provides multiple user accounts with different behaviors for testing various scenarios including normal flows, error handling, and known bugs. This comprehensive test plan covers all major user journeys including authentication, shopping, cart operations, checkout processes, and known issue reproduction.

## Test Scenarios

### 1. Authentication Tests

**Seed:** `src/seed.spec.ts`

#### 1.1. SC-001: Valid Login with Standard User Credentials

**File:** `tests/authentication/valid-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed with 'Swag Labs' header
    - expect: Username textbox is visible
    - expect: Password textbox is visible
    - expect: Login button is visible
  2. Locate the Username textbox (data-test='username') and enter 'standard_user'
    - expect: Text 'standard_user' appears in the Username field
  3. Locate the Password textbox (data-test='password') and enter 'secret_sauce'
    - expect: Password field is filled (characters masked)
  4. Click the Login button (data-test='login-button')
    - expect: User is redirected to inventory page (URL: https://www.saucedemo.com/inventory.html)
    - expect: Products are displayed in a grid layout
    - expect: Page title remains 'Swag Labs'

#### 1.2. SC-002: Invalid Login with Incorrect Password (Negative Test)

**File:** `tests/authentication/invalid-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' in the Username textbox (data-test='username')
    - expect: Username field contains 'standard_user'
  3. Enter 'wrong_password' in the Password textbox (data-test='password')
    - expect: Password field is filled
  4. Click the Login button (data-test='login-button')
    - expect: User remains on login page
    - expect: An error message is displayed (typically appears in red)
    - expect: Error message contains text like 'Username and password do not match' or similar
    - expect: Page URL remains https://www.saucedemo.com/

### 2. Shopping and Catalog Tests

**Seed:** `src/seed.spec.ts`

#### 2.1. SC-003: Browse and Verify All Products Display Correctly

**File:** `tests/shopping/browse-products.spec.ts`

**Steps:**
  1. Perform valid login with standard_user credentials
    - expect: User is on inventory page (https://www.saucedemo.com/inventory.html)
    - expect: Logged in successfully
  2. Observe the products displayed on the page
    - expect: All 6 products are visible:
    - expect: 1. Sauce Labs Backpack - $29.99
    - expect: 2. Sauce Labs Bike Light - $9.99
    - expect: 3. Sauce Labs Bolt T-Shirt - $15.99
    - expect: 4. Sauce Labs Fleece Jacket - $49.99
    - expect: 5. Sauce Labs Onesie - $7.99
    - expect: 6. Test.allTheThings() T-Shirt (Red) - $15.99
  3. Verify each product has the following elements: product image, product name link, product description, price, and 'Add to cart' button
    - expect: Each product card contains all required elements
    - expect: Product images are loaded and visible
    - expect: Product names are clickable links
    - expect: Descriptions are readable
    - expect: Prices are displayed in correct format ($XX.XX)
    - expect: 'Add to cart' buttons are visible and clickable

#### 2.2. SC-004: Filter/Sort Products by Name (A-Z) and Price (Low to High)

**File:** `tests/shopping/sort-products.spec.ts`

**Steps:**
  1. Perform valid login with standard_user credentials
    - expect: User is on inventory page with all products visible
  2. Locate the sorting dropdown (combobox with data-test attribute) which currently shows 'Name (A to Z)'
    - expect: Dropdown is visible and clickable
    - expect: Current selection is 'Name (A to Z)'
  3. Click on the dropdown to see all available sort options
    - expect: Dropdown menu opens showing options:
    - expect: - Name (A to Z)
    - expect: - Name (Z to A)
    - expect: - Price (low to high)
    - expect: - Price (high to low)
  4. Select 'Price (low to high)' from the dropdown
    - expect: Products are reordered by price ascending
    - expect: First product displayed is Sauce Labs Onesie ($7.99)
    - expect: Second product is Sauce Labs Bike Light ($9.99)
    - expect: Last product is Sauce Labs Fleece Jacket ($49.99)
  5. Select 'Name (Z to A)' from the dropdown
    - expect: Products are reordered alphabetically in reverse
    - expect: First product is Test.allTheThings() T-Shirt (Red)
    - expect: Last product is Sauce Labs Backpack

#### 2.3. SC-005: Add Multiple Products to Cart and Verify Display

**File:** `tests/shopping/add-multiple-items.spec.ts`

**Steps:**
  1. Perform valid login with standard_user credentials
    - expect: User is on inventory page
  2. Click 'Add to cart' button for Sauce Labs Backpack (data-test='add-to-cart-sauce-labs-backpack')
    - expect: Button changes to 'Remove'
    - expect: Cart badge appears in top right showing '1'
    - expect: Page remains on inventory
  3. Click 'Add to cart' button for Sauce Labs Bike Light (data-test='add-to-cart-sauce-labs-bike-light')
    - expect: Button changes to 'Remove'
    - expect: Cart badge updates to show '2'
  4. Click 'Add to cart' button for Test.allTheThings() T-Shirt (Red) (data-test='add-to-cart-test.allthethings()-t-shirt-(red)')
    - expect: Button changes to 'Remove'
    - expect: Cart badge updates to show '3'
  5. Locate and click the shopping cart link (data-test='shopping-cart-link') in the header
    - expect: User is navigated to cart page (https://www.saucedemo.com/cart.html)
    - expect: Cart page displays 'Your Cart' header
    - expect: All 3 items are listed with correct quantities and prices:
    - expect: - Sauce Labs Backpack - Qty: 1 - $29.99
    - expect: - Sauce Labs Bike Light - Qty: 1 - $9.99
    - expect: - Test.allTheThings() T-Shirt (Red) - Qty: 1 - $15.99

### 3. Cart Management Tests

**Seed:** `src/seed.spec.ts`

#### 3.1. SC-006: Add Single Item to Cart and Verify Quantity (Test for Cart Doubling Bug)

**File:** `tests/cart/single-item-quantity.spec.ts`

**Steps:**
  1. Perform valid login with standard_user credentials
    - expect: User is on inventory page
  2. Click 'Add to cart' button once for Sauce Labs Backpack
    - expect: Cart badge appears showing '1'
    - expect: Button changes to 'Remove'
  3. Verify cart badge count is exactly 1 (not 2 or any other number)
    - expect: Cart badge clearly shows '1'
    - expect: No double-counting bug observed
    - expect: Cart badge value can be read from the DOM or visual inspection
  4. Navigate to cart page by clicking the shopping cart link
    - expect: Cart page shows 'Your Cart' header
    - expect: Cart displays exactly 1 item (Sauce Labs Backpack)
    - expect: Quantity column (QTY) shows '1' not '2'
    - expect: Price displayed is $29.99 (single item price)
  5. Verify the item appears only once in the cart, not duplicated
    - expect: Cart items list shows Sauce Labs Backpack appearing exactly once
    - expect: No duplicate entries for the same item

#### 3.2. SC-007: Remove Item from Cart and Verify Quantity Updates

**File:** `tests/cart/remove-item.spec.ts`

**Steps:**
  1. Perform valid login with standard_user credentials and add 2 items to cart: Sauce Labs Backpack and Sauce Labs Bike Light
    - expect: Cart badge shows '2'
    - expect: Both items added successfully
  2. Navigate to cart page (https://www.saucedemo.com/cart.html)
    - expect: Cart displays 2 items
    - expect: Cart badge shows '2'
  3. Locate the 'Remove' button for Sauce Labs Backpack and click it
    - expect: Sauce Labs Backpack is removed from the cart
    - expect: Cart badge updates to show '1'
    - expect: Cart now displays only Sauce Labs Bike Light
  4. Click the 'Remove' button for Sauce Labs Bike Light
    - expect: Sauce Labs Bike Light is removed from cart
    - expect: Cart badge shows '0' or is not displayed
    - expect: Cart page displays an empty cart message or empty state
  5. Navigate back to inventory page using 'Continue Shopping' button
    - expect: User is on inventory page
    - expect: All products show 'Add to cart' buttons (not 'Remove')
    - expect: Cart is empty

### 4. Checkout Tests

**Seed:** `src/seed.spec.ts`

#### 4.1. SC-008: Complete Checkout Form with Random Billing Data

**File:** `tests/checkout/checkout-form.spec.ts`

**Steps:**
  1. Perform valid login with standard_user credentials
    - expect: User is on inventory page
  2. Add Sauce Labs Backpack to cart by clicking 'Add to cart' button
    - expect: Item added, cart badge shows '1'
  3. Navigate to cart page by clicking shopping cart link
    - expect: Cart page displays Sauce Labs Backpack with price $29.99
  4. Click 'Checkout' button (data-test='checkout')
    - expect: User is navigated to checkout step one page (https://www.saucedemo.com/checkout-step-one.html)
    - expect: Page header shows 'Checkout: Your Information'
    - expect: Three form fields are visible: First Name, Last Name, Zip/Postal Code
  5. Enter first name 'Robert' in the First Name field (data-test='firstName')
    - expect: Text 'Robert' is entered in the field
  6. Enter last name 'Smith' in the Last Name field (data-test='lastName')
    - expect: Text 'Smith' is entered in the field
  7. Enter postal code '90210' in the Zip/Postal Code field (data-test='postalCode')
    - expect: Text '90210' is entered in the field
  8. Click the 'Continue' button (data-test='continue')
    - expect: Form is submitted without errors
    - expect: User is navigated to checkout step two (https://www.saucedemo.com/checkout-step-two.html)
    - expect: Page header shows 'Checkout: Overview'

#### 4.2. SC-009: Successfully Place Order and Verify Confirmation

**File:** `tests/checkout/place-order.spec.ts`

**Steps:**
  1. Perform complete checkout process: Login, add item to cart, go to checkout, fill in checkout form with First Name 'Alice', Last Name 'Johnson', Postal Code '55555'
    - expect: User reaches checkout overview page (https://www.saucedemo.com/checkout-step-two.html)
    - expect: Form filled and Continue button clicked successfully
  2. On checkout overview page, verify order summary is displayed showing: item (Sauce Labs Backpack), quantity (1), price ($29.99), payment info (SauceCard #31337), shipping info (Free Pony Express Delivery)
    - expect: Order summary shows all details:
    - expect: - Item: Sauce Labs Backpack - Qty: 1 - Price: $29.99
    - expect: - Payment Information: SauceCard #31337
    - expect: - Shipping Information: Free Pony Express Delivery!
    - expect: - Item total: $29.99
    - expect: - Tax: $2.40
    - expect: - Total: $32.39
  3. Click the 'Finish' button (data-test='finish') to place the order
    - expect: Order is successfully placed
    - expect: User is navigated to order confirmation page (https://www.saucedemo.com/checkout-complete.html)
    - expect: Page header shows 'Checkout: Complete!'
  4. Verify confirmation message is displayed on the page
    - expect: Confirmation heading 'Thank you for your order!' is visible
    - expect: Confirmation message displays: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    - expect: Pony Express image is displayed
  5. Click 'Back Home' button to return to inventory
    - expect: User is redirected to inventory page (https://www.saucedemo.com/inventory.html)
    - expect: Session maintains user login state

### 5. Bug and Known Issues Tests

**Seed:** `src/seed.spec.ts`

#### 5.1. SC-010: Reproduce Cart Doubling Bug (Add 1 Item → Verify if Shows as 2)

**File:** `tests/bugs/cart-doubling-bug.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/ and perform login with standard_user / secret_sauce
    - expect: Login successful, user on inventory page
  2. Inspect the current page to note the initial cart badge state (should be empty or '0')
    - expect: No cart badge visible or cart badge shows '0'
  3. Click 'Add to cart' button for exactly ONE product (Sauce Labs Onesie)
    - expect: Button changes to 'Remove'
  4. Immediately inspect the cart badge to verify it shows '1'
    - expect: Cart badge clearly displays '1'
    - expect: BUG CONDITION: If badge shows '2' or any number other than '1', this is the doubling bug
    - expect: EXPECTED: Badge should show '1'
  5. Click shopping cart link to navigate to cart page and verify the item count
    - expect: Cart page shows exactly 1 item
    - expect: EXPECTED: Quantity column shows '1' for the item
    - expect: BUG CONDITION: If quantity shows '2' for a single-added item, cart doubling bug is present
  6. Check browser console for any errors or warnings that might indicate a bug (data-test='shopping-cart-link')
    - expect: EXPECTED: No errors related to cart quantity calculation
    - expect: BUG NOTE: If errors appear related to qty or cart calculation, document them

#### 5.2. SC-011: Test Checkout with Special Characters in Address Fields

**File:** `tests/bugs/special-characters-checkout.spec.ts`

**Steps:**
  1. Perform login with standard_user credentials and add one item to cart
    - expect: Item added, cart badge shows '1'
    - expect: User on inventory page
  2. Navigate to cart and click Checkout button
    - expect: User on checkout step one page (https://www.saucedemo.com/checkout-step-one.html)
    - expect: Form fields are visible and ready for input
  3. Enter special characters in First Name field: 'John@#$%'
    - expect: Text 'John@#$%' is accepted in the field
    - expect: No validation error appears (or system handles gracefully)
  4. Enter special characters in Last Name field: 'O\'Brien-Smith'
    - expect: Text is accepted with apostrophe and hyphen
    - expect: Field handles special characters without breaking
  5. Enter special characters in Postal Code field: '12345-6789'
    - expect: Postal code with hyphen is accepted
    - expect: Field accepts the format
  6. Click Continue button
    - expect: Form submits successfully
    - expect: User proceeds to checkout overview page
    - expect: Special characters are preserved in the order
    - expect: EXPECTED BEHAVIOR: System should either accept the characters or show a validation error message explaining what's not allowed

#### 5.3. SC-012: Verify Sorting Consistency When Adding Items Mid-Sort

**File:** `tests/bugs/sorting-consistency.spec.ts`

**Steps:**
  1. Perform login with standard_user and navigate to inventory page
    - expect: User on inventory page (https://www.saucedemo.com/inventory.html)
    - expect: Default sort is 'Name (A to Z)'
  2. Click on the sort dropdown and select 'Price (low to high)' option
    - expect: Products reorder by price ascending
    - expect: First product: Sauce Labs Onesie ($7.99)
    - expect: Second product: Sauce Labs Bike Light ($9.99)
    - expect: Products stay in price order
  3. While in 'Price (low to high)' sort, add Sauce Labs Fleece Jacket (highest price $49.99) to cart
    - expect: Item is added successfully
    - expect: Cart badge shows '1'
    - expect: Products remain sorted by price (low to high)
    - expect: Fleece Jacket stays at the bottom of the list despite being added
  4. Add Sauce Labs Onesie (lowest price $7.99) to cart
    - expect: Item added successfully
    - expect: Cart badge shows '2'
    - expect: Sorting order is maintained
    - expect: Onesie stays at the top of the list
  5. Navigate to cart and verify both items are listed correctly
    - expect: Cart shows both items
    - expect: EXPECTED: Items are listed in cart regardless of sort order
    - expect: No sorting inconsistencies in cart display

### 6. Edge Cases Tests

**Seed:** `src/seed.spec.ts`

#### 6.1. SC-013: Attempt Checkout with Empty Cart (Edge Case)

**File:** `tests/edge-cases/empty-cart-checkout.spec.ts`

**Steps:**
  1. Perform login with standard_user credentials
    - expect: User on inventory page
    - expect: Cart is empty, no badge visible or badge shows '0'
  2. Attempt to navigate directly to checkout URL by entering https://www.saucedemo.com/checkout-step-one.html in address bar
    - expect: EXPECTED: User is either:
    - expect: - Prevented from accessing checkout with an error message
    - expect: - Redirected to inventory/cart page
    - expect: - Shown empty cart message if form is displayed
  3. Alternatively, try accessing checkout through the application by clicking a Checkout button when cart is empty
    - expect: EXPECTED: No Checkout button should be visible when cart is empty
    - expect: OR: Clicking Checkout with empty cart shows error: 'Cannot checkout with empty cart'

#### 6.2. SC-014: Attempt Checkout Without Filling Required Fields

**File:** `tests/edge-cases/incomplete-checkout-form.spec.ts`

**Steps:**
  1. Perform login and add one item to cart
    - expect: Item in cart, cart badge shows '1'
  2. Navigate to checkout page by clicking Checkout button in cart
    - expect: User on checkout step one form (https://www.saucedemo.com/checkout-step-one.html)
  3. Leave all three fields (First Name, Last Name, Postal Code) empty and click Continue button
    - expect: EXPECTED: Form shows validation error message
    - expect: Error message indicates required fields are missing
    - expect: User remains on checkout step one page
    - expect: URL does not change to step two
  4. Fill only First Name field with 'John' and leave Last Name and Postal Code empty, then click Continue
    - expect: EXPECTED: Validation error appears for missing Last Name and/or Postal Code
    - expect: User remains on same page
    - expect: Data in First Name field is preserved
  5. Fill First Name 'Jane' and Last Name 'Doe' but leave Postal Code empty, then click Continue
    - expect: EXPECTED: Validation error for missing Postal Code
    - expect: User cannot proceed to step two
    - expect: Entered data is preserved for re-entry

#### 6.3. SC-015: Verify Session Persistence (Add Item, Logout, Login Again)

**File:** `tests/edge-cases/session-persistence.spec.ts`

**Steps:**
  1. Perform login with standard_user credentials
    - expect: User logged in on inventory page
  2. Add Sauce Labs Backpack and Sauce Labs Bike Light to cart
    - expect: Cart badge shows '2'
    - expect: Both items successfully added
  3. Navigate to cart page and verify both items are displayed
    - expect: Cart shows 2 items: Sauce Labs Backpack ($29.99) and Sauce Labs Bike Light ($9.99)
  4. Click Open Menu button and locate Logout option, then click it
    - expect: User is logged out
    - expect: Redirected to login page (https://www.saucedemo.com/)
    - expect: Session is terminated
  5. Login again with same credentials (standard_user / secret_sauce)
    - expect: Login successful
    - expect: User on inventory page
  6. Check the cart by clicking shopping cart link
    - expect: EXPECTED: Cart is EMPTY (session data not persisted)
    - expect: OR if persistent: Cart still shows the 2 items added before logout
    - expect: Document the actual behavior (persistence or not)
