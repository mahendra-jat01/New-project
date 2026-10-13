Feature: Automation Exercise end-to-end test cases

  Scenario: Register a new user successfully
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click on the "Signup / Login" button
    Then "New User Signup!" should be visible
    When I enter name and email address
    And I click the "Signup" button
    Then "ENTER ACCOUNT INFORMATION" should be visible
    When I fill account details: Title, Name, Email, Password, Date of birth
    And I select the checkbox "Sign up for our newsletter!"
    And I select the checkbox "Receive special offers from our partners!"
    And I fill address details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    And I click the "Create Account" button
    Then "ACCOUNT CREATED!" should be visible
    When I click the "Continue" button
    Then Logged in as username should be visible
    When I click the "Delete Account" button
    Then "ACCOUNT DELETED!" should be visible
    And I click the "Continue" button

  Scenario: Login with correct email and password
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click on the "Signup / Login" button
    Then "Login to your account" should be visible
    When I enter correct email address and password
    And I click the "login" button
    Then Logged in as username should be visible
    When I click the "Delete Account" button
    Then "ACCOUNT DELETED!" should be visible

  Scenario: Login with incorrect email and password
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click on the "Signup / Login" button
    Then "Login to your account" should be visible
    When I enter incorrect email address and password
    And I click the "login" button
    Then the error message "Your email or password is incorrect!" should be visible

  Scenario: Logout user
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click on the "Signup / Login" button
    Then "Login to your account" should be visible
    When I enter correct email address and password
    And I click the "login" button
    Then Logged in as username should be visible
    When I click the "Logout" button
    Then I should be navigated to the login page

  Scenario: Register user with existing email
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click on the "Signup / Login" button
    Then "New User Signup!" should be visible
    When I enter name and an already registered email address
    And I click the "Signup" button
    Then the error message "Email Address already exist!" should be visible

  Scenario: Submit Contact Us form successfully
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click on the "Contact Us" button
    Then "GET IN TOUCH" should be visible
    When I enter name, email, subject and message
    And I upload a file
    And I click the OK button on the alert
    Then the success message "Success! Your details have been submitted successfully." should be visible
    When I click the "Home" button
    Then I should land on the home page successfully

  Scenario: Verify Test Cases page
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click on the "Test Cases" button
    Then I should be navigated to the test cases page successfully

  Scenario: Verify All Products and product detail page
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click on the "Products" button
    Then I should be navigated to the ALL PRODUCTS page successfully
    And the products list should be visible
    When I click on "View Product" of the first product
    Then I should land on the product detail page
    And product details should be visible: product name, category, price, availability, condition, brand

  Scenario: Search Product
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click on the "Products" button
    Then I should be navigated to the ALL PRODUCTS page successfully
    When I enter a product name in the search input and click the search button
    Then "SEARCHED PRODUCTS" should be visible
    And all products related to the search should be visible

  Scenario: Add review on product
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    When I click on the "Products" button
    Then I should be navigated to the ALL PRODUCTS page successfully
    When I click "View Product"
    Then "Write Your Review" should be visible
    When I enter name, email and review
    And I click the "Submit" button
    Then the success message "Thank you for your review." should be visible

  Scenario: Verify Subscription on home page
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I scroll down to the footer
    Then the text "SUBSCRIPTION" should be visible
    When I enter an email address in the input and click the arrow button
    Then the success message "You have been successfully subscribed!" should be visible

  Scenario: Verify Subscription on Cart page
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click the "Cart" button
    And I scroll down to the footer
    Then the text "SUBSCRIPTION" should be visible
    When I enter an email address in the input and click the arrow button
    Then the success message "You have been successfully subscribed!" should be visible

  Scenario: Add Products in Cart
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click the "Products" button
    And I hover over the first product and click "Add to cart"
    And I click the "Continue Shopping" button
    And I hover over the second product and click "Add to cart"
    And I click the "View Cart" button
    Then both products should be added to the Cart
    And their prices, quantity and total price should be verified

  Scenario: Verify Product quantity in Cart
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click "View Product" for any product on the home page
    Then the product detail page should be opened
    When I increase the quantity to 4
    And I click the "View Cart" button
    Then the product should be displayed in the cart page with exact quantity 4

  Scenario: Remove Products From Cart
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I add products to the cart
    And I click the "Cart" button
    Then the cart page should be displayed
    When I click the "X" button corresponding to a particular product
    Then the product should be removed from the cart

  Scenario: Add to cart from Recommended items
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    When I scroll to the bottom of the page
    Then "RECOMMENDED ITEMS" should be visible
    When I click "Add To Cart" on a Recommended product
    And I click the "View Cart" button
    Then the product should be displayed in the cart page

  Scenario: Place Order - Register while Checkout
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I add products to the cart
    And I click the "Cart" button
    Then the cart page should be displayed
    When I click "Proceed To Checkout"
    And I click the "Register / Login" button
    And I fill all details in Signup and create account
    Then "ACCOUNT CREATED!" should be visible
    When I click the "Continue" button
    Then Logged in as username should be visible at the top
    When I click the "Cart" button
    And I click "Proceed To Checkout"
    Then Address Details and Review Your Order should be verified
    When I enter description in the comment text area and click "Place Order"
    And I enter payment details: Name on Card, Card Number, CVC, Expiration date
    And I click "Pay and Confirm Order"
    Then the success message "Your order has been placed successfully!" should be visible
    When I click the "Delete Account" button
    Then "ACCOUNT DELETED!" should be visible
    And I click the "Continue" button

  Scenario: Place Order - Register before Checkout
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click the "Signup / Login" button
    And I fill all details in Signup and create account
    Then "ACCOUNT CREATED!" should be visible
    When I click the "Continue" button
    Then Logged in as username should be visible at the top
    When I add products to the cart
    And I click the "Cart" button
    Then the cart page should be displayed
    When I click "Proceed To Checkout"
    Then Address Details and Review Your Order should be verified
    When I enter description in the comment text area and click "Place Order"
    And I enter payment details: Name on Card, Card Number, CVC, Expiration date
    And I click "Pay and Confirm Order"
    Then the success message "Your order has been placed successfully!" should be visible
    When I click the "Delete Account" button
    Then "ACCOUNT DELETED!" should be visible
    And I click the "Continue" button

  Scenario: Place Order - Login before Checkout
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click the "Signup / Login" button
    And I fill email, password and click the "Login" button
    Then Logged in as username should be visible at the top
    When I add products to the cart
    And I click the "Cart" button
    Then the cart page should be displayed
    When I click "Proceed To Checkout"
    Then Address Details and Review Your Order should be verified
    When I enter description in the comment text area and click "Place Order"
    And I enter payment details: Name on Card, Card Number, CVC, Expiration date
    And I click "Pay and Confirm Order"
    Then the success message "Your order has been placed successfully!" should be visible
    When I click the "Delete Account" button
    Then "ACCOUNT DELETED!" should be visible
    And I click the "Continue" button

  Scenario: Download Invoice after purchase order
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I add products to the cart
    And I click the "Cart" button
    Then the cart page should be displayed
    When I click "Proceed To Checkout"
    And I click the "Register / Login" button
    And I fill all details in Signup and create account
    Then "ACCOUNT CREATED!" should be visible
    When I click the "Continue" button
    Then Logged in as username should be visible at the top
    When I click the "Cart" button
    And I click "Proceed To Checkout"
    Then Address Details and Review Your Order should be verified
    When I enter description in the comment text area and click "Place Order"
    And I enter payment details: Name on Card, Card Number, CVC, Expiration date
    And I click "Pay and Confirm Order"
    Then the success message "Your order has been placed successfully!" should be visible
    When I click the "Download Invoice" button
    Then the invoice should be downloaded successfully
    When I click the "Continue" button
    And I click the "Delete Account" button
    Then "ACCOUNT DELETED!" should be visible
    And I click the "Continue" button

  Scenario: Verify address details in checkout page
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I click the "Signup / Login" button
    And I fill all details in Signup and create account
    Then "ACCOUNT CREATED!" should be visible
    When I click the "Continue" button
    Then Logged in as username should be visible at the top
    When I add products to the cart
    And I click the "Cart" button
    Then the cart page should be displayed
    When I click "Proceed To Checkout"
    Then the delivery address should match the address filled during account registration
    And the billing address should match the address filled during account registration
    When I click the "Delete Account" button
    Then "ACCOUNT DELETED!" should be visible
    And I click the "Continue" button

  Scenario: View Category Products
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then categories should be visible on the left side bar
    When I click on the "Women" category
    And I click on any category link under "Women", for example "Dress"
    Then the category page should be displayed
    And the text "WOMEN - TOPS PRODUCTS" (or relevant category text) should be confirmed
    When I click on any sub-category link of "Men" category on the left side bar
    Then I should be navigated to that category page

  Scenario: View & Cart Brand Products
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    When I click on the "Products" button
    Then Brands should be visible on the left side bar
    When I click on any brand name
    Then I should be navigated to the brand page and brand products should be displayed
    When I click on any other brand link on the left side bar
    Then I should be navigated to that brand page and products should be visible

  Scenario: Search Products and Verify Cart After Login
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    When I click on the "Products" button
    Then I should be navigated to the ALL PRODUCTS page successfully
    When I enter a product name in the search input and click the search button
    Then "SEARCHED PRODUCTS" should be visible
    And all products related to the search should be visible
    When I add those products to the cart
    Then the products should be visible in the cart
    When I click the "Signup / Login" button and submit login details
    And I go to the Cart page again
    Then those products should still be visible in the cart after login

  Scenario: Verify Scroll Up using Arrow button and Scroll Down
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I scroll down the page to the bottom
    Then "SUBSCRIPTION" should be visible
    When I click on the arrow at the bottom right side to move upward
    Then the page should be scrolled up
    And the text "Full-Fledged practice website for Automation Engineers" should be visible on screen

  Scenario: Verify Scroll Up without Arrow button and Scroll Down
    Given I launch the browser
    And I navigate to "https://automationexercise.com"
    Then the home page should be visible successfully
    When I scroll down the page to the bottom
    Then "SUBSCRIPTION" should be visible
    When I scroll up the page to the top
    Then the page should be scrolled up
    And the text "Full-Fledged practice website for Automation Engineers" should be visible on screen
