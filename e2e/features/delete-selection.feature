Feature: Delete selection

  Background:
    Given the app is loaded in English

  Scenario: Delete button is disabled when no cards selected
    When I navigate to the Selection tab
    Then the delete button should be disabled

  Scenario: Delete clears all selected cards immediately
    When I click feeling card "f1"
    And I click feeling card "f2"
    And I navigate to the Needs tab
    And I click needs card "n1"
    And I navigate to the Selection tab
    And I click the delete menu button
    Then I should see "No cards selected"

  Scenario: After delete, feeling cards have no selected class
    When I click feeling card "f1"
    And I navigate to the Selection tab
    And I click the delete menu button
    And I navigate to the Feelings tab
    Then feeling card "f1" should not be selected

  Scenario: After delete, @last has empty selectedCards
    When I click feeling card "f1"
    And I navigate to the Selection tab
    And I click the delete menu button
    Then the localStorage @last should have no selected cards
