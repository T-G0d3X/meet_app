import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: false,
    locations: this.props.locations,
    infoText: '',
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });

    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'Cannot find the city you are looking for.',
        showSuggestions: false,
      });
    } else {
      this.setState({
        query: value,
        suggestions,
        infoText: '',
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
    });

    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className="CitySearch" style={{ marginTop: '25px' }}>
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
          placeholder="Search for a city"
        />
        <InfoAlert text={this.state.infoText} />
        <ul
          className="suggestions"
          style={this.state.showSuggestions ? {} : { display: 'none' }}
        >
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              id={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li
            key="all"
            className="suggestion_name"
            onClick={() => this.handleItemClicked('all')}
          >
            <b style={{ color: 'purple' }}>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
