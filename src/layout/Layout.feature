Feature: Layout component behavior

  Scenario: Footer is hidden on home and register pages
    Given the user is on the home page
    Then the footer should not be displayed

  Scenario: Footer is shown on other pages
    Given the user is on the dashboard page
    Then the footer should be displayed