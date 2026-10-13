const { Given, When, Then } = require("@cucumber/cucumber");

const app = (world) => world.pages.automationExercisePage;

Given("I launch the browser", async function () {});

Given("I navigate to {string}", async function (url) {
  await app(this).open(url);
});

Then("the home page should be visible successfully", async function () {
  await app(this).assertHomeVisible();
});

When("I click on the {string} button", async function (label) {
  await app(this).clickNamed(label);
});

When("I click the {string} button", async function (label) {
  await app(this).clickNamed(label);
});

When("I click {string}", async function (label) {
  if (label === "Pay and Confirm Order") {
    await app(this).payAndConfirm();
    return;
  }
  if (label === "Proceed To Checkout") {
    await app(this).proceedToCheckout();
    return;
  }
  if (label === "View Product") {
    await app(this).viewFirstProduct();
    return;
  }
  await app(this).clickNamed(label);
});

Then("{string} should be visible", async function (text) {
  await app(this).assertTextVisible(text);
});

Then("the text {string} should be visible", async function (text) {
  await app(this).assertTextVisible(text);
});

Then("the error message {string} should be visible", async function (message) {
  await app(this).assertErrorVisible(message);
});

Then("the success message {string} should be visible", async function (message) {
  await app(this).assertTextVisible(message);
});

When("I enter name and email address", async function () {
  this.testData.currentUser = app(this).createUserData("signup");
  await app(this).enterSignup(this.testData.currentUser);
});

When("I fill account details: Title, Name, Email, Password, Date of birth", async function () {
  await app(this).fillAccountDetails(this.testData.currentUser);
});

When("I select the checkbox {string}", async function (label) {
  await app(this).selectCheckbox(label);
});

When("I fill address details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number", async function () {
  await app(this).fillAddressDetails(this.testData.currentUser);
});

Then("Logged in as username should be visible", async function () {
  await app(this).assertLoggedIn(this.testData.currentUser || this.testData.registeredUser);
});

Then("Logged in as username should be visible at the top", async function () {
  await app(this).assertLoggedIn(this.testData.currentUser || this.testData.registeredUser);
});

When("I enter correct email address and password", async function () {
  const user = await app(this).ensureRegisteredUser(this);
  await app(this).open("https://automationexercise.com");
  await app(this).clickNamed("Signup / Login");
  await app(this).enterLogin(user.email, user.password);
});

When("I enter incorrect email address and password", async function () {
  await app(this).enterLogin(`wrong.${Date.now()}@example.com`, "bad-password");
});

Then("I should be navigated to the login page", async function () {
  await app(this).assertOnLoginPage();
});

When("I enter name and an already registered email address", async function () {
  const user = await app(this).ensureRegisteredUser(this);
  await app(this).open("https://automationexercise.com");
  await app(this).clickNamed("Signup / Login");
  await app(this).enterSignup({ ...user, name: `Duplicate ${Date.now()}` });
});

When("I enter name, email, subject and message", async function () {
  await app(this).submitContactForm();
});

When("I upload a file", async function () {});

When("I click the OK button on the alert", async function () {
  await app(this).acceptAlertAndSubmit();
});

Then("I should land on the home page successfully", async function () {
  await app(this).assertHomeVisible();
});

Then("I should be navigated to the test cases page successfully", async function () {
  await app(this).assertTestCasesPage();
});

Then("I should be navigated to the ALL PRODUCTS page successfully", async function () {
  await app(this).assertAllProductsPage();
});

Then("the products list should be visible", async function () {
  await app(this).assertProductsVisible();
});

When("I click on {string} of the first product", async function (text) {
  await app(this).viewFirstProduct();
});

Then("I should land on the product detail page", async function () {
  await app(this).assertProductDetailVisible();
});

Then("product details should be visible: product name, category, price, availability, condition, brand", async function () {
  await app(this).assertProductDetailVisible();
});

When("I enter a product name in the search input and click the search button", async function () {
  this.testData.searchTerm = "dress";
  await app(this).searchProduct(this.testData.searchTerm);
});

Then("all products related to the search should be visible", async function () {
  await app(this).assertSearchedProducts(this.testData.searchTerm || "dress");
});

When("I enter name, email and review", async function () {
  await app(this).addReview();
});

When("I scroll down to the footer", async function () {
  await app(this).scrollFooter();
});

When("I enter an email address in the input and click the arrow button", async function () {
  await app(this).subscribe();
});

When("I hover over the first product and click {string}", async function (text) {
  await app(this).addFirstProductFromList();
});

When("I hover over the second product and click {string}", async function (text) {
  await app(this).addSecondProductFromList();
});

Then("both products should be added to the Cart", async function () {
  await app(this).assertCartHasRows(2);
});

Then("their prices, quantity and total price should be verified", async function () {
  await app(this).assertCartPrices();
});

When("I click {string} for any product on the home page", async function (text) {
  await app(this).viewFirstProduct();
});

Then("the product detail page should be opened", async function () {
  await app(this).assertProductDetailVisible();
});

When("I increase the quantity to 4", async function () {
  await app(this).setQuantityAndAdd(4);
});

Then("the product should be displayed in the cart page with exact quantity 4", async function () {
  await app(this).assertCartQuantity(4);
});

When("I add products to the cart", async function () {
  await app(this).addProductsToCart();
});

Then("the cart page should be displayed", async function () {
  await app(this).assertCartPage();
});

When("I click the {string} button corresponding to a particular product", async function (text) {
  await app(this).removeFirstCartProduct();
});

Then("the product should be removed from the cart", async function () {
  await app(this).assertCartEmptyOrRemoved();
});

When("I scroll to the bottom of the page", async function () {
  await app(this).scrollToBottom();
});

When("I click {string} on a Recommended product", async function (text) {
  await app(this).addRecommendedProduct();
});

Then("the product should be displayed in the cart page", async function () {
  await app(this).assertCartHasRows(1);
});

When("I fill all details in Signup and create account", async function () {
  this.testData.currentUser = app(this).createUserData("checkout");
  await app(this).createAccountThroughUi(this.testData.currentUser);
});

Then("Address Details and Review Your Order should be verified", async function () {
  await app(this).assertCheckoutSections();
});

When("I enter description in the comment text area and click {string}", async function (text) {
  await app(this).placeOrder(this.testData.currentUser || this.testData.registeredUser || app(this).createUserData());
});

When("I enter payment details: Name on Card, Card Number, CVC, Expiration date", async function () {
  await app(this).enterPayment();
});

Then("the invoice should be downloaded successfully", async function () {
  await app(this).downloadInvoice();
});

When("I fill email, password and click the {string} button", async function (text) {
  const user = await app(this).ensureRegisteredUser(this);
  await app(this).open("https://automationexercise.com");
  await app(this).clickNamed("Signup / Login");
  await app(this).enterLogin(user.email, user.password);
  await app(this).clickNamed("login");
});

Then("the delivery address should match the address filled during account registration", async function () {
  await app(this).assertAddressesMatch(this.testData.currentUser);
});

Then("the billing address should match the address filled during account registration", async function () {
  await app(this).assertAddressesMatch(this.testData.currentUser);
});

Then("categories should be visible on the left side bar", async function () {
  await app(this).assertCategoriesVisible();
});

When("I click on the {string} category", async function (category) {
  await app(this).openCategory();
});

When("I click on any category link under {string}, for example {string}", async function (category, product) {
  await app(this).openCategory();
});

Then("the category page should be displayed", async function () {
  await app(this).assertCategoryPage();
});

Then("the text {string} \\(or relevant category text) should be confirmed", async function (text) {
  await app(this).assertCategoryPage();
});

When("I click on any sub-category link of {string} category on the left side bar", async function (category) {
  await app(this).openMenSubCategory();
});

Then("I should be navigated to that category page", async function () {
  await app(this).assertCategoryPage();
});

Then("Brands should be visible on the left side bar", async function () {
  await app(this).assertBrandsVisible();
});

When("I click on any brand name", async function () {
  await app(this).openBrand(0);
});

Then("I should be navigated to the brand page and brand products should be displayed", async function () {
  await app(this).assertBrandPage();
});

When("I click on any other brand link on the left side bar", async function () {
  await app(this).openBrand(1);
});

Then("I should be navigated to that brand page and products should be visible", async function () {
  await app(this).assertBrandPage();
});

When("I add those products to the cart", async function () {
  await app(this).addSearchedProductsToCart();
});

Then("the products should be visible in the cart", async function () {
  await app(this).assertCartStillVisible();
});

When("I click the {string} button and submit login details", async function (text) {
  const user = await app(this).ensureRegisteredUser(this);
  await app(this).clickNamed("Signup / Login");
  await app(this).enterLogin(user.email, user.password);
  await app(this).clickNamed("login");
});

When("I go to the Cart page again", async function () {
  await app(this).clickNamed("Cart");
});

Then("those products should still be visible in the cart after login", async function () {
  await app(this).assertCartStillVisible();
});

When("I scroll down the page to the bottom", async function () {
  await app(this).scrollToBottom();
});

When("I click on the arrow at the bottom right side to move upward", async function () {
  await app(this).clickScrollArrow();
});

Then("the page should be scrolled up", async function () {
  await app(this).assertScrolledUp();
});

Then("the text {string} should be visible on screen", async function (text) {
  await app(this).assertTextVisible(text);
});

When("I scroll up the page to the top", async function () {
  await app(this).scrollToTop();
});
