Feature: Edit user preferences

  Scenario: Render user preferences and allow adding a new topic
    Given the user is on the Edit Preferences page
    When the user adds a new topic
    Then the new topic should be added to the preferences

  Scenario: Remove a topic from preferences
    Given the user is on the Edit Preferences page
    When the user removes a topic
    Then the topic should be removed from the preferences

  Scenario: Show error when adding an empty topic
    Given the user is on the Edit Preferences page
    When the user tries to add an empty topic
    Then an error message should be displayed

  Scenario: Show error when adding a duplicate topic
    Given the user is on the Edit Preferences page
    When the user tries to add a duplicate topic
    Then an error message should be displayed