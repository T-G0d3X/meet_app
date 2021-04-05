import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

export const getAccessToken = async () => {
  // first we try to retrieve token from local storage
  const accessToken = localStorage.getItem('access_token');

  // NO ACCESS TOKEN found in local storage
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const results = await axios.get(
        'https://7wl4j53pub.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

// ACCESS TOKEN FOUND in localStorage
const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

export const getEvents = async () => {
  // Nprogress is used to create and display progress bars at the top of the page (this why we show users the application is loading data when it tries to access the Google Calendar API)
  NProgress.start();

  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem('lastEvents');
    NProgress.done();
    return {
      events: JSON.parse(events).events,
      locations: extractLocations(JSON.parse(events).events),
    };
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      'https://7wl4j53pub.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' +
      '/' +
      token;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

// this function checks whether there's a path, then build the URL with the current path (or build the URL without a path using window.history.pushState() )
const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

// this function takes your code and encodes it using encodeURIComponent, then uses encoded code to get your token
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    'https://7wl4j53pub.execute-api.eu-central-1.amazonaws.com/dev/api/token' +
      '/' +
      encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem('access_token', access_token);

  return access_token;
};
