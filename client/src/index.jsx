import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './components/Reviews';

const App = () => (
  <Reviews />
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
