Feature: Navigation

  Background:
    Given the app is loaded in English

  Scenario: Shows feelings screen on initial load
    Then the feelings screen should be visible
    And the needs screen should be hidden
    And the selection screen should be hidden

  Scenario: Clicking Needs tab shows needs screen
    When I navigate to the Needs tab
    Then the needs screen should be visible
    And the feelings screen should be hidden

  Scenario: Clicking Selection tab shows selection screen
    When I navigate to the Selection tab
    Then the selection screen should be visible
    And the feelings screen should be hidden

  Scenario: Clicking Feelings tab returns to feelings screen
    When I navigate to the Needs tab
    And I navigate to the Feelings tab
    Then the feelings screen should be visible
    And the needs screen should be hidden

  Scenario: Active tab has active class
    Then the Feelings tab should be active
    When I navigate to the Needs tab
    Then the Needs tab should be active
    And the Feelings tab should not be active

  Scenario: Last active screen is restored on reload
    Given the last state has cards "" on screen "needs"
    And I open the app
    Then the needs screen should be visible
