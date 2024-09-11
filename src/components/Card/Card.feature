Feature: Card component

  Scenario: User clicks the edit button on the card
    Given the card is displayed with a title and content
    When the user clicks the edit button
    Then the onIconClick function should be called