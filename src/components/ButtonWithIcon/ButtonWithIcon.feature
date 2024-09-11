Feature: ButtonWithIcon component

  Scenario: User clicks the button while recording
    Given the button is in recording state
    When the user clicks the button
    Then the onClick handler should be called
    And the button should display the "talking" state

  Scenario: User clicks the button while not recording
    Given the button is not in recording state
    When the user clicks the button
    Then the onClick handler should be called
    And the button should display the "not-talking" state