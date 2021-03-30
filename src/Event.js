import React, { Component } from 'react';

class Event extends Component {
  state = {
    showDetails: false,
    showBtn: 'see details',
  };

  pressShowDetails = () => {
    if (this.state.showDetails === true) {
      this.setState({ showDetails: false, showBtn: 'show details' });
    } else {
      this.setState({ showDetails: true, showBtn: 'hide details' });
    }
  };

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <h3 className="event-heading">{event.summary}</h3>
        <p>{event.start.dateTime}</p>
        <p className="event-info">{event.location}</p>

        {this.state.showDetails && (
          <div>
            <h2>About event:</h2>
            <a href={event.htmlLink}>See Details on Google Calendar</a>
            <p>{event.description}</p>
          </div>
        )}

        <button className="event-btn" onClick={() => this.pressShowDetails()}>
          {this.state.showBtn}
        </button>
      </div>
    );
  }
}

export default Event;
