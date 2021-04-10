import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 8,
    currentLocation: 'all',
  };

  updateEvents = (location, eventCount) => {
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === 'all'
            ? events
            : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          currentLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          currentLocation === 'all'
            ? events
            : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
        });
      });
    }
  };

  //we use this to make API call and save the initial data to state
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      const { numberOfEvents } = this.state;

      if (this.mounted) {
        const filteredEvents = events.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          locations: extractLocations(events),
        });
      }
    });
  }

  // we use this to update the state only if this.mounted is true
  componentWillUnmount() {
    this.mounted = false;
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location)
        .length;
      const city = location.split(' ').shift();
      return { city, number };
    });
    return data;
  };

  render() {
    return (
      <div className="App">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ color: 'rgb(75,0,130)', fontSize: '50px' }}>Meet App</h1>
          <p style={{ color: 'rgb(75,0,130)', width: '50%' }}>
            Hey there! Meet App is a serverless progressive web app that allows
            users to view upcoming events from an integrated Google Calendar.
            You need to sing in with your Google account :)
          </p>
        </div>
        <NumberOfEvents
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />

        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" type="category" name="city" />
              <YAxis
                dataKey="number"
                type="number"
                name="number of events"
                allowDecimals={false}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="eventlist-wrapper">
          <EventList events={this.state.events} />
        </div>
      </div>
    );
  }
}

export default App;
