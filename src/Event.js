import React, { Component } from 'react';

class Event extends Component {
  state = {
    showDetails: false,
    showBtn: 'Show details',
  };

  pressShowDetails = () => {
    if (this.state.showDetails === true) {
      this.setState({ showDetails: false, showBtn: 'Show details' });
    } else {
      this.setState({ showDetails: true, showBtn: 'Hide details' });
    }
  };

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <h2
          className="event-heading"
          style={{ color: 'rgb(75,0,130)', fontSize: '30px' }}
        >
          {event.summary}
        </h2>
        <p>{event.start.dateTime}</p>
        <p className="event-info">{event.location}</p>

        {this.state.showDetails && (
          <div className="event__Details">
            <h3 style={{ color: 'rgb(153,50,204)' }}>About event:</h3>
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
