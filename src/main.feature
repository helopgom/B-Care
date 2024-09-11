Feature: Application initialization and routing

  Scenario: Application renders successfully
    Given the application is initialized
    When the application is rendered
    Then the router should be provided