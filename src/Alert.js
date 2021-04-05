import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    // set color of Alert to null, coz children going to override it
    this.color = null;
    this.marginTop = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      marginTop: this.marginTop,
    };
  };

  render() {
    return (
      <div className="Alert" style={{ height: '1px' }}>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
    this.marginTop = '1px';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
    this.marginTop = '160px';
  }
}

// exporting InfoAlert, ErrorAlert so I can use it in CitySearch component
export { InfoAlert, ErrorAlert };
