import React, { Component } from 'react';

class Event extends Component {
  state = {
    showDetails: false,
  };

  pressShowDetails = () => {
    if (this.state.showDetails === false) {
      this.setState({ showDetails: true });
    } else {
      this.setState({ showDetails: false });
    }
  };

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <div className="collapsed-event">
          <h3 className="event-heading">{event.summary}</h3>
          <p className="event-info">{event.location}</p>
          {!this.pressShowDetails && (
            <button className="event-btn" onClick={this.pressShowDetails}>
              Show details
            </button>
          )}
          {this.pressShowDetails && (
            <button className="event-btn" onClick={this.pressShowDetails}>
              Hide details
            </button>
          )}
        </div>

        {this.pressShowDetails && (
          <div className="expanded-event">
            <h4>About event:</h4>
            <a href="googleCalendar">See details on Google Calendar</a>
            <p className="event-description">{event.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
