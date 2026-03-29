Feature: Selection screen

  Background:
    Given the app is loaded in English

  Scenario: Empty selection screen shows "No cards selected"
    When I navigate to the Selection tab
    Then I should see "No cards selected"

  Scenario: Toolbar is not visible on feelings screen
    Then the share button should not be visible

  Scenario: After selecting cards, selection screen shows selected cards
    When I click feeling card "f1"
    And I click feeling card "f2"
    And I navigate to the Selection tab
    Then the selection screen should show 2 cards

  Scenario: Selection screen does not show unselected cards
    When I click feeling card "f1"
    And I navigate to the Selection tab
    Then card "f2" should not be in the selection screen

  Scenario: Deselecting a card on selection screen removes it
    When I click feeling card "f1"
    And I click feeling card "f2"
    And I navigate to the Selection tab
    And I click card "f1" in the selection screen
    Then the selection screen should show 1 cards

  Scenario: Deselecting last card shows "No cards selected"
    When I click feeling card "f1"
    And I navigate to the Selection tab
    And I click card "f1" in the selection screen
    Then I should see "No cards selected"

  Scenario: Toolbar buttons are visible on selection screen with cards selected
    When I click feeling card "f1"
    And I navigate to the Selection tab
    Then the share button should be visible
    And the save button should be visible
    And the delete button should be visible

  Scenario: Share, save and delete buttons are disabled when no cards selected
    When I navigate to the Selection tab
    Then the share button should be disabled
    And the save button should be disabled
    And the delete button should be disabled

  Scenario: Load button is disabled when no saved states exist
    When I navigate to the Selection tab
    Then the load button should be disabled
