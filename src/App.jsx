import 'normalize.css';
import React from 'react';
import ReactGA from 'react-ga4';
import { ANALYTICS_ID } from './config';
import { ChannelsPage } from './views/ChannelsPage/ChannelsPage';

if (ANALYTICS_ID) {
  ReactGA.initialize(ANALYTICS_ID);
  ReactGA.send('pageview');
}

function App() {
  return <ChannelsPage />;
}

export default App;
