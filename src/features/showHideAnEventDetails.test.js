import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the main page is open', () => {});

    let AppWrapper;
    when('App is rendered', () => {
      AppWrapper = mount(<App />);
    });

    then(
      'the user can see the event list but can’t see the event details',
      () => {
        expect(AppWrapper.find('.event__Details')).toHaveLength(0);
      }
    );
  });

  test('User can expand an event to see its details', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given('user is on the screen with event list', async () => {
      AppWrapper = await mount(<App />);
      await AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });

    when('user press the button to expand event details', () => {
      AppWrapper.update();
      AppWrapper.find('.event .event-btn').at(0).simulate('click');
    });

    then('the user can see details of the event', () => {
      expect(AppWrapper.find('.event .event__Details')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given(
      'user is on the screen with event list and event is expanded',
      async () => {
        AppWrapper = await mount(<App />);
        await AppWrapper.update();
        expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        AppWrapper.find('.event .event-btn').at(0).simulate('click');
        expect(AppWrapper.find('.event .event__Details')).toHaveLength(1);
      }
    );

    when('user press the button to collapse event details', () => {
      AppWrapper.find('.event .event-btn').at(0).simulate('click');
    });

    then('the user closes details of the event', () => {
      expect(AppWrapper.find('.event .event__Details')).toHaveLength(0);
    });
  });
});
