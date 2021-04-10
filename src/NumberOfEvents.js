import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 8,
    errorText: '',
  };

  handleNumberInput = (num) => {
    const value = num.target.value;
    this.props.updateEvents(null, value);
    this.setState({ numberOfEvents: value });

    if (value < 1 || value > 50) {
      this.setState({
        errorText: 'Select number from 1 to 50',
      });
    } else {
      return this.setState({
        errorText: '',
      });
    }
  };

  render() {
    return (
      <div className="numberOfEvents">
        <label className="eventNumberLabel"></label>
        <input
          type="number"
          className="eventNumberInput"
          value={this.state.value}
          onChange={this.handleNumberInput}
          placeholder="Number of events"
        />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
