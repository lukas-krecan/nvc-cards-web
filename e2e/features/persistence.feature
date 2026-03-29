Feature: Persistence

  Scenario: Selecting cards and reloading restores selection
    Given the language is set to "en"
    And I open the app
    When I click feeling card "f1"
    And I reload the page
    Then feeling card "f1" should be selected

  Scenario: Active screen is restored on reload
    Given the language is set to "en"
    And the last state has cards "f1" on screen "needs"
    And I open the app
    Then the needs screen should be visible

  Scenario: No @last in storage loads feelings screen with no selection
    Given the language is set to "en"
    And I open the app
    Then the feelings screen should be visible
    And feeling card "f1" should not be selected

  Scenario: Corrupted @last JSON is silently ignored and app loads normally
    Given the language is set to "en"
    And corrupted JSON is stored in @last
    And I open the app
    Then the feelings screen should be visible

  Scenario: Seeded saved state survives page reload and appears in load dialog
    Given the language is set to "en"
    And there is a saved state "My Test Save" with cards "f1, n2"
    And I open the app
    When I navigate to the Selection tab
    Then the load button should be enabled
    When I click the load menu button
    Then I should see "My Test Save"

  Scenario: @last is updated when cards are selected
    Given the language is set to "en"
    And I open the app
    When I click feeling card "f1"
    Then the localStorage @last should contain card "f1"
