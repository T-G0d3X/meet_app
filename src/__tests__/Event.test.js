import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test('Event component rendered', () => {
    expect(EventWrapper).toHaveLength(1);
  });

  test('render event element', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('render collapsed event', () => {
    expect(EventWrapper.find('.collapsed-event')).toHaveLength(1);
  });

  test('render heading in event', () => {
    expect(EventWrapper.find('.event-heading')).toHaveLength(1);
  });

  test('render paragraph info in event', () => {
    expect(EventWrapper.find('.event-info')).toHaveLength(1);
  });

  test('render show details button in event', () => {
    expect(EventWrapper.find('.event-btn')).toHaveLength(1);
  });

  test('render extra info when show details button clicked', () => {
    EventWrapper.setState({ showDetails: false });
    EventWrapper.find('.event-btn').simulate('click');
    expect(EventWrapper.find('.expanded-event')).toHaveLength(1);
  });

  test('render default event view when hide button clicked', () => {
    EventWrapper.setState({ showDetails: true });
    EventWrapper.find('.event-btn').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(false);
  });
});
