@checkout
Feature: Checkout
  As a Sauce Demo customer
  I want to complete checkout
  So that I can place an order

  Background:
    Given I am logged in as a standard user

  @smoke @checkout-flow
  Scenario: Checkout process
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I proceed to checkout
    And I enter checkout information:
      | firstName | lastName | postalCode |
      | Jane      | Doe      | 10001      |
    And I finish the order
    Then I should see the order confirmation
