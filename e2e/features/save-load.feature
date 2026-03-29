Feature: Save and load

  Background:
    Given the app is loaded in English

  # ── Save ────────────────────────────────────────────────────────────────

  Scenario: Save button is disabled when no cards selected
    When I navigate to the Selection tab
    Then the save button should be disabled

  Scenario: Full save flow writes a saved-* key to localStorage
    When I click feeling card "f1"
    And I navigate to the Selection tab
    And I click the save menu button
    Then the modal should be open
    When I fill the save name with "My save"
    And I confirm the save
    Then the modal should be closed
    And a saved state key should exist in localStorage

  Scenario: Saved state contains the correct selected cards
    When I click feeling card "f1"
    And I navigate to the Selection tab
    And I click the save menu button
    And I fill the save name with "Test"
    And I confirm the save
    Then the saved state should contain card "f1"

  Scenario: Closing save modal with X does not save
    When I click feeling card "f1"
    And I navigate to the Selection tab
    And I click the save menu button
    And I fill the save name with "Should not save"
    And I close the modal
    Then the modal should be closed
    And no saved state keys should exist in localStorage

  # ── Load ────────────────────────────────────────────────────────────────

  Scenario: Load button is disabled when no saved states exist
    When I navigate to the Selection tab
    Then the load button should be disabled

  Scenario: Load button is enabled when saved states exist
    Given there is a saved state "Existing" with cards "f1"
    And I open the app
    When I navigate to the Selection tab
    Then the load button should be enabled

  Scenario: Load modal lists saved states by name
    Given there is a saved state "Morning session" with cards "f1"
    And I open the app
    When I navigate to the Selection tab
    And I click the load menu button
    Then the modal should be open
    And I should see "Morning session"

  Scenario: Loading a saved state restores cards and navigates to selection screen
    Given there is a saved state "Restore me" with cards "f2, n3"
    And I open the app
    When I navigate to the Selection tab
    And I click the load menu button
    And I load the saved state
    Then the selection screen should be visible
    And card "f2" should be visible in the selection screen
    And card "n3" should be visible in the selection screen

  Scenario: Deleting a saved state removes it from the list
    Given there is a saved state "To be deleted" with cards "f1"
    And I open the app
    When I navigate to the Selection tab
    And I click the load menu button
    And I delete the saved state
    Then I should not see "To be deleted"

  Scenario: Deleting last saved state closes the modal
    Given there is a saved state "Last one" with cards "f1"
    And I open the app
    When I navigate to the Selection tab
    And I click the load menu button
    And I delete the saved state
    Then the modal should be closed
