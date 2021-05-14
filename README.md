
# Meet App

## Description

A serverless, progressive web application (PWA) created with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to
fetch upcoming events. The serverless function is hosted by the AWS (Amazon Web Services). App allows users to search for a city and get a list of events hosted in that city. For the data visualization component, there are two charts—one that shows how many events will take place in that city on upcoming days, and another that visualizes the popularity of event genres in the form of a pie chart. 


https://user-images.githubusercontent.com/69514083/118296629-7ba33e00-b4dd-11eb-9af6-05ada7e0b35f.mp4


# FEATURE 1: FILTER EVENTS BY CITY
    USER STORY:
      1. As a [role] = user
      2. I should be able to [action] = filter events by city
      3. So that [benefit] = I can see the list of events that take place in that city

    Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
        Given- user hasn’t searched for any city
        When- the user opens the app
        Then- the user should see a list of all upcoming events
    Scenario 2: User should see a list of suggestions when they search for a city.
        Given- the main page is open
        When- user starts typing in the city textbox
        Then- the user should see a list of cities (suggestions) that match what they’ve typed
    Scenario 3: User can select a city from the suggested list.
        Given- the user was typing “Berlin” in the city textbox, and the list of suggested cities is showing
        When- the user selects a city (e.g., “Berlin, Germany”) from the list
        Then- their city should be changed to that city (i.e., “Berlin, Germany”), and the user should receive a list of upcoming events in that city

  # FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS
      USER STORY:
        1. As a User 
        2. I should be able to press a button so I see expanded event to see it details, and press button again to close event details
        3. so that I can find out more about events in the city

     Scenario 1: An event element is collapsed by default
        Given- the app has loaded events
        When- the user selects a city
        Then- the user can see the event list but can’t see the event details
      Scenario 2: User can expand an event to see its details
        Given- user is on the screen with event list
        When- user press the button to expand event details
        Then- the user can see details of the event
      Scenario 3: User can collapse an event to hide its details
        Given- user is on the screen with event list
        When- user press the button to collapse event details
        Then- the user closes details of the event


   # FEATURE 3: SPECIFY NUMBER OF EVENTS
      USER STORY:
        1. As a User 
        2. I should be able to specify number of events I want to see
        3. so that I can see only what I need/want

      Scenario 1: When user hasn’t specified a number, 32 is the default number
        Given- the app has loaded events
        When- the user selects a city
        Then- the user can see the default number of events
      Scenario 2: User can change the number of events they want to see
        Given- user is on the event list 
        When- write in the number of events they want to see on the screen
        Then- the user can see number of events specified

   # FEATURE 4: USE THE APP WHEN OFFLINE
       USER STORY:
          1. As a User 
          2. I should be able to use app offline
          3. so that I can see what I need/want when there is no or bad internet connection

        Scenario 1: Show cached data when there’s no internet connection
          Given- the user is not connected to the internet
          When- the user uses the app with no internet
          Then- the user can access cached data 
        Scenario 2: Show error when user changes the setting(city, time range) 
          Given- the user is not connected to the internet 
          When- when user tries to change something while offline
          Then- user gets error that there is no internet connection

   # FEATURE 5: DATA VISUALIZATION
        USER STORY:
          1. As a User 
          2. I should be able to visualize events
          3. so that I can see and better plan my schedule for upcoming events

         Scenario 1: Show a chart with the number of upcoming events on a chart 
            Given- the user selected a couple places of interest (city)
            When- user selects more cities
            Then- the user can see how many events there are per city 
