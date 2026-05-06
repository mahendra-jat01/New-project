@login
Feature: Login
  As a Sauce Demo customer
  I want to sign in with my credentials
  So that I can access the product catalog

  Background:
    Given I am on the Sauce Demo login page

  @smoke @valid-login
  Scenario: Valid login
    When I login with username "standard_user" and password "secret_sauce"
    Then I should see the products page

  @negative @invalid-login
  Scenario: Invalid login
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see login error "Sorry, this user has been locked out."
