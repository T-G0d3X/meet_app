import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { mockData } from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';
import { mount } from 'enzyme';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t specified a number, 8 is the default number', ({
    given,
    when,
    then,
  }) => {
    given('the main page is open', () => {});

    let AppWrapper;
    when('App component is rendered', () => {
      AppWrapper = mount(<App />);
    });

    then('the user can see the default number of events (8)', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });
  });

  test('User can change the number of events they want to see', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given('user is on the event list', () => {
      AppWrapper = mount(<App />);
    });

    when('write in the number of events they want to see on the screen', () => {
      const eventObject = { target: { value: '3' } };
      AppWrapper.find('.eventNumberInput').simulate('change', eventObject);
    });

    then('the user can see number of events specified', () => {
      AppWrapper.update();
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe('3');
    });
  });
});
