const { When, Then } = require("@cucumber/cucumber");

const productSlugs = {
  "Sauce Labs Backpack": "sauce-labs-backpack",
  "Sauce Labs Bike Light": "sauce-labs-bike-light",
  "Sauce Labs Bolt T-Shirt": "sauce-labs-bolt-t-shirt",
  "Sauce Labs Fleece Jacket": "sauce-labs-fleece-jacket",
  "Sauce Labs Onesie": "sauce-labs-onesie",
  "Test.allTheThings() T-Shirt (Red)": "test.allthethings()-t-shirt-(red)"
};

When("I add {string} to the cart", async function (productName) {
  const productSlug = productSlugs[productName];

  if (!productSlug) {
    throw new Error(`No product slug is mapped for "${productName}".`);
  }

  await this.pages.inventoryPage.addProductToCart(productSlug);
});

When("I open the cart", async function () {
  await this.pages.inventoryPage.openCart();
  await this.pages.cartPage.assertLoaded();
});

Then("the cart badge should show {int} item", async function (count) {
  await this.pages.inventoryPage.assertCartCount(count);
});

Then("the cart badge should show {int} items", async function (count) {
  await this.pages.inventoryPage.assertCartCount(count);
});

Then("I should see {string} in the cart", async function (productName) {
  await this.pages.cartPage.assertProductVisible(productName);
});
