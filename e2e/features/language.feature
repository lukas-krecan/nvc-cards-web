Feature: Language

  Scenario: App loads in English when language is "en"
    Given the language is set to "en"
    And I open the app
    Then I should see tab "Feelings"
    And I should see tab "Needs"
    And I should see tab "Selection"

  Scenario: App loads in Czech when language is "cs"
    Given the language is set to "cs"
    And I open the app
    Then I should see tab "Pocity"
    And I should see tab "Potřeby"
    And I should see tab "Výběr"

  Scenario: Language toggle switches from English to Czech
    Given I am on a mobile viewport
    And the language is set to "en"
    And I open the app
    When I open the navbar
    And I switch the language to Czech
    Then I should see tab "Pocity"

  Scenario: Language toggle switches from Czech to English
    Given I am on a mobile viewport
    And the language is set to "cs"
    And I open the app
    When I open the navbar
    And I switch the language to English
    Then I should see tab "Feelings"

  Scenario: Language persists to localStorage after toggle
    Given I am on a mobile viewport
    And the language is set to "en"
    And I open the app
    When I open the navbar
    And I switch the language to Czech
    Then the localStorage @language should be "cs"

  Scenario: Language preference survives page reload
    Given the language is set to "cs"
    And I open the app
    When I reload the page
    Then I should see tab "Pocity"
