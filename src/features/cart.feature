@cart
Feature: Cart
  As a Sauce Demo customer
  I want to add products to my cart
  So that I can review them before checkout

  Background:
    Given I am logged in as a standard user

  @smoke @add-to-cart
  Scenario: Add product to cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show 1 item
    When I open the cart
    Then I should see "Sauce Labs Backpack" in the cart
