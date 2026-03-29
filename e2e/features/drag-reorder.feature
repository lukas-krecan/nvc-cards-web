Feature: Drag reorder

  Scenario: Dragging a card changes its position
    Given the app is loaded in English
    When I select feeling cards "f1", "f2" and "f3"
    And I navigate to the Selection tab
    Then the selection screen should show 3 cards
    When I drag card "f1" after card "f3"
    Then card "f1" should not be first in the selection

  Scenario: Drag reorder is persisted to localStorage
    Given the app is loaded in English
    When I select feeling cards "f1", "f2" and "f3"
    And I navigate to the Selection tab
    And I drag card "f1" after card "f3"
    Then card "f1" should not be first in the selection
    And the localStorage @last first card should not be "f1" and length should be 3

  Scenario: Drag reorder survives page reload
    Given the app is loaded in English
    When I select feeling cards "f1", "f2" and "f3"
    And I navigate to the Selection tab
    And I drag card "f1" after card "f3"
    And I record the selection order
    And I reload the page
    Then the selection screen should be visible
    And the selection order should match the order before reload
