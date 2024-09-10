Feature: Emergency Button

  Scenario: User clicks the emergency button
    Given the user is on the footer
    When the user clicks on the "EMERGENCIA" button
    Then the phone dialer should be called with 112
    