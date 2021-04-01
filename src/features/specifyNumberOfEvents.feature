Feature: Specify number of events

Scenario: When user hasn’t specified a number, 8 is the default number
Given the main page is open
When App component is rendered
Then the user can see the default number of events (8)

Scenario: User can change the number of events they want to see
Given user is on the event list 
When write in the number of events they want to see on the screen
Then the user can see number of events specified