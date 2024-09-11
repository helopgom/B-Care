Feature: API request using useApi

  Scenario: Successful GET request
    Given the API endpoint is "/api/v1/data"
    When the user makes a GET request
    Then the data should be successfully fetched
    And the loading state should be false

  Scenario: Error in API request
    Given the API endpoint is "/api/v1/invalid"
    When the user makes a GET request
    Then an error should be returned
    And the loading state should be false