Feature: Button component

  Scenario: User clicks the button with onClick handler
    Given the button is rendered with a custom onClick handler
    When the user clicks the button
    Then the onClick handler should be called

  Scenario: User clicks the button with a link
    Given the button is rendered with a link
    When the user clicks the button
    Then the user should be redirected to the link