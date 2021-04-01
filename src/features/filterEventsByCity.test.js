// importing necessary built-in functions, loadFeature() used to load a Gherking file, defineFeature() used to define the code for that  file(feature)
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({
    given,
    when,
    then,
  }) => {
    given('user hasn’t searched for any city', () => {});

    let AppWrapper;
    when('the user opens the app', () => {
      // here we specify main action of the test
      // Rendering the App component is equivalent to “the app has just opened” as it’s the code that would be executed if the user were actually opening up the app
      AppWrapper = mount(<App />);
    });

    then('the user should see a list of all upcoming events', () => {
      // without AppWrapper.update() none of changes will be displayed on the App component
      AppWrapper.update();
      // list of events rendered in the App component is compared with the list of events from the mock API
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });
  });

  test('User should see a list of suggestions when they search for a city.', ({
    given,
    when,
    then,
  }) => {
    let CitySearchWrapper, locations;
    locations = extractLocations(mockData);
    given('the main page is open', () => {
      // again we simulate app being opened, we can use shallow() instead of mount() because no need to render any of CitySearch children
      CitySearchWrapper = shallow(
        <CitySearch updateEvents={() => {}} locations={locations} />
      );
    });

    when('user starts typing in the city textbox', () => {
      // simulate function is used to simulate change event on the city element giving it a value of "Berlin"
      CitySearchWrapper.find('.city').simulate('change', {
        target: { value: 'Berlin' },
      });
    });

    then(
      'the user should see a list of cities (suggestions) that match what they’ve typed',
      () => {
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
      }
    );
  });

  test('User can select a city from the suggested list.', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given('the user was typing “Berlin” in the city textbox', async () => {
      // still simulate opening app, also simulate an event on the city textbox
      // async function to allow App component to properly load the events and locations
      AppWrapper = await mount(<App />);
      AppWrapper.find('.city').simulate('change', {
        target: { value: 'Berlin' },
      });
    });

    and('the list of suggested cities is showing', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });

    when(
      'the user selects a city (e.g., “Berlin, Germany”) from the list',
      () => {
        AppWrapper.find('.suggestions li').at(0).simulate('click');
      }
    );

    then(
      'their city should be changed to that city (i.e., “Berlin, Germany”)',
      () => {
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
      }
    );

    and(
      'the user should receive a list of upcoming events in that city',
      () => {
        // expect function that checks whether the number of events rendered in the App component are the same as those included in "mock-data.js"
        expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
      }
    );
  });
});
