Feature: Show/ Hide an Events Details

Scenario: An event element is collapsed by default
Given the main page is open
When App is rendered
Then the user can see the event list but can’t see the event details

Scenario: User can expand an event to see its details
Given user is on the screen with event list
When user press the button to expand event details
Then the user can see details of the event

Scenario: User can collapse an event to hide its details
Given user is on the screen with event list and event is expanded
When user press the button to collapse event details
Then the user closes details of the event

