import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberWrapper;

  beforeAll(() => {
    NumberWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('renders NumbersOfEvents component', () => {
    expect(NumberWrapper).toHaveLength(1);
  });

  test('renders numberOfEvents element', () => {
    expect(NumberWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('renders number of events label', () => {
    expect(NumberWrapper.find('.eventNumberLabel')).toHaveLength(1);
  });

  test('render number change input element', () => {
    expect(NumberWrapper.find('.eventNumberInput')).toHaveLength(1);
  });

  // prop(name) returns the prop with specified name in the current node
  test('renders default number of events', () => {
    const eventNumberInput = NumberWrapper.state('eventNumberInput');
    expect(NumberWrapper.find('.eventNumberInput').prop('value')).toBe(
      eventNumberInput
    );
  });

  test('render changes in number of events', () => {
    NumberWrapper.setState({ NumberOfEvents: '16' });

    const newNumberInput = { target: { value: 8 } };
    NumberWrapper.find('.eventNumberInput').simulate('change', newNumberInput);
    expect(NumberWrapper.state('numberOfEvents')).toBe(8);
  });
});
