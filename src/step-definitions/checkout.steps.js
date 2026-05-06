const { When, Then } = require("@cucumber/cucumber");

When("I proceed to checkout", async function () {
  await this.pages.cartPage.startCheckout();
});

When("I enter checkout information:", async function (dataTable) {
  const [customer] = dataTable.hashes();
  await this.pages.checkoutPage.enterCustomerDetails(
    customer.firstName,
    customer.lastName,
    customer.postalCode
  );
});

When("I finish the order", async function () {
  await this.pages.checkoutPage.finishOrder();
});

Then("I should see the order confirmation", async function () {
  await this.pages.checkoutPage.assertOrderComplete();
});
