import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleNumberInput = (num) => {
    const value = num.target.value;
    this.props.updateEvents(null, value);
    this.setState({ numberOfEvents: value });
    if (value < 1) {
      this.setState({
        numberOfEvents: value,
        errorText: 'Pick min 1 event',
      });
    } else {
      return this.setState({
        numberOfEvents: value,
        errorText: '',
      });
    }
  };

  render() {
    return (
      <div className="numberOfEvents">
        <label className="eventNumberLabel">Number of events:</label>
        <input
          type="number"
          className="eventNumberInput"
          value={this.state.eventNumber}
          onChange={this.handleNumberInput}
          id="eventNumberInput"
        />
      </div>
    );
  }
}

export default NumberOfEvents;
