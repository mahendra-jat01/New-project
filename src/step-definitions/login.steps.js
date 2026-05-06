const { Given, When, Then } = require("@cucumber/cucumber");

Given("I am on the Sauce Demo login page", async function () {
  await this.pages.loginPage.open();
});

Given("I am logged in as a standard user", async function () {
  await this.pages.loginPage.open();
  await this.pages.loginPage.login("standard_user", "secret_sauce");
  await this.pages.inventoryPage.assertLoaded();
});

When("I login with username {string} and password {string}", async function (username, password) {
  await this.pages.loginPage.login(username, password);
});

Then("I should see the products page", async function () {
  await this.pages.inventoryPage.assertLoaded();
});

Then("I should see login error {string}", async function (message) {
  await this.pages.loginPage.assertLoginError(message);
});
