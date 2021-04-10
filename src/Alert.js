import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    // set color of Alert to null, coz children going to override it
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return <p style={this.getStyle()}>{this.props.text}</p>;
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }
}

// exporting InfoAlert, ErrorAlert so I can use it in CitySearch component
export { InfoAlert, ErrorAlert };
