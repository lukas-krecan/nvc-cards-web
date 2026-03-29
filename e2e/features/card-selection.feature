Feature: Card selection

  Background:
    Given the app is loaded in English

  Scenario: Unselected feeling card has no selected class
    Then feeling card "f1" should not be selected

  Scenario: Clicking a feeling card selects it
    When I click feeling card "f1"
    Then feeling card "f1" should be selected

  Scenario: Clicking a selected feeling card deselects it
    When I click feeling card "f1"
    And I click feeling card "f1"
    Then feeling card "f1" should not be selected

  Scenario: Multiple feelings can be selected simultaneously
    When I click feeling card "f1"
    And I click feeling card "f2"
    And I click feeling card "f3"
    Then feeling card "f1" should be selected
    And feeling card "f2" should be selected
    And feeling card "f3" should be selected

  Scenario: Clicking a need card selects it
    When I navigate to the Needs tab
    And I click needs card "n1"
    Then needs card "n1" should be selected

  Scenario: Clicking a selected need card deselects it
    When I navigate to the Needs tab
    And I click needs card "n1"
    And I click needs card "n1"
    Then needs card "n1" should not be selected

  Scenario: Feeling and need selections coexist
    When I click feeling card "f1"
    And I navigate to the Needs tab
    And I click needs card "n1"
    Then needs card "n1" should be selected
    When I navigate to the Feelings tab
    Then feeling card "f1" should be selected
