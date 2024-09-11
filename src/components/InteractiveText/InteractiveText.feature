Feature: InteractiveText component

  Scenario: Loading the user profile
    Given the user is on the interactive text component
    When the component is loading the user profile
    Then the component should display "Cargando..."

  Scenario: User profile fails to load
    Given the user is on the interactive text component
    When there is an error fetching the user profile
    Then the component should display an error message

  Scenario: User profile loads successfully
    Given the user is on the interactive text component
    When the user profile is loaded
    Then the component should display the user's name and welcome messages

  Scenario: User is talking
    Given the user is talking
    When the component is displaying the talking state
    Then the component should display "Hablando..."

  Scenario: User has finished talking
    Given the user has finished talking
    When the talking state is off
    Then the component should display "¿Te apetece hablar de otra cosa?"