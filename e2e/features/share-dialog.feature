Feature: Share dialog

  Background:
    Given the app is loaded in English

  Scenario: Share button is disabled when no cards selected
    When I navigate to the Selection tab
    Then the share button should be disabled

  Scenario: Clicking share opens the share modal
    When I click feeling card "f1"
    And I navigate to the Selection tab
    And I click the share menu button
    Then the modal should be open
    And I should see "Selected cards"

  Scenario: Share modal body shows selected card text with "- " prefix
    When I click feeling card "f1"
    And I navigate to the Selection tab
    And I click the share menu button
    Then the modal body should list card texts with "- " prefix

  Scenario: Copy to clipboard button is present in share modal
    When I click feeling card "f1"
    And I navigate to the Selection tab
    And I click the share menu button
    Then I should see "Copy to clipboard"

  Scenario: Copy to clipboard copies card text
    Given clipboard permissions are granted
    When I click feeling card "f1"
    And I navigate to the Selection tab
    And I click the share menu button
    And I click the copy to clipboard button
    Then the clipboard text should start with "- "

  Scenario: Closing share modal does not change card selection
    When I click feeling card "f1"
    And I navigate to the Selection tab
    And I click the share menu button
    And I close the modal
    Then the modal should be closed
    And card "f1" should be visible in the selection screen
