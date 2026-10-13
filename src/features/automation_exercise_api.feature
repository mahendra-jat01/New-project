@api
Feature: Automation Exercise API test cases

  Background:
    Given the Automation Exercise API is available

  Scenario: API 1 - Get all products list
    When I send a "GET" API request to "/api/productsList"
    Then the API response code should be 200
    And the API response should include a non-empty "products" list

  Scenario: API 2 - POST to all products list is not supported
    When I send a "POST" API request to "/api/productsList"
    Then the API response code should be 405
    And the API response message should be "This request method is not supported."

  Scenario: API 3 - Get all brands list
    When I send a "GET" API request to "/api/brandsList"
    Then the API response code should be 200
    And the API response should include a non-empty "brands" list

  Scenario: API 4 - PUT to all brands list is not supported
    When I send a "PUT" API request to "/api/brandsList"
    Then the API response code should be 405
    And the API response message should be "This request method is not supported."

  Scenario: API 5 - Search product with search_product parameter
    When I send a "POST" API request to "/api/searchProduct" with form data
      | search_product | tshirt |
    Then the API response code should be 200
    And the API response should include a non-empty "products" list

  Scenario: API 6 - Search product without search_product parameter
    When I send a "POST" API request to "/api/searchProduct"
    Then the API response code should be 400
    And the API response message should be "Bad request, search_product parameter is missing in POST request."

  Scenario: API 7 - Verify login with valid details
    Given I have a registered API test user
    When I send a "POST" API request to "/api/verifyLogin" with the API test user's login data
    Then the API response code should be 200
    And the API response message should be "User exists!"
    And I delete the API test user

  Scenario: API 8 - Verify login without email parameter
    When I send a "POST" API request to "/api/verifyLogin" with form data
      | password | automation123 |
    Then the API response code should be 400
    And the API response message should be "Bad request, email or password parameter is missing in POST request."

  Scenario: API 9 - DELETE to verify login is not supported
    When I send a "DELETE" API request to "/api/verifyLogin"
    Then the API response code should be 405
    And the API response message should be "This request method is not supported."

  Scenario: API 10 - Verify login with invalid details
    When I send a "POST" API request to "/api/verifyLogin" with form data
      | email    | missing.user@example.com |
      | password | invalid-password         |
    Then the API response code should be 404
    And the API response message should be "User not found!"

  Scenario: API 11 - Create register user account
    When I create a new API test user account
    Then the API response code should be 201
    And the API response message should be "User created!"
    And I delete the API test user

  Scenario: API 12 - Delete user account
    Given I have a registered API test user
    When I send a "DELETE" API request to "/api/deleteAccount" with the API test user's login data
    Then the API response code should be 200
    And the API response message should be "Account deleted!"

  Scenario: API 13 - Update user account
    Given I have a registered API test user
    When I update the API test user account
    Then the API response code should be 200
    And the API response message should be "User updated!"
    And I delete the API test user

  Scenario: API 14 - Get user account detail by email
    Given I have a registered API test user
    When I send a "GET" API request to "/api/getUserDetailByEmail" with the API test user's email
    Then the API response code should be 200
    And the API response should include a "user" object
    And I delete the API test user
