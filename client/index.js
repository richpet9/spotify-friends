import React from 'react';
import ReactDOM from 'react-dom';
import Home from './src/pages/Home';

function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
}

function App() {
  let access = getHashParams().access_token;
  let refresh = getHashParams().refresh_token;

  if (refresh) {
    localStorage.setItem('refresh_token', refresh);
  }

  return <Home access={access} />;
}

ReactDOM.render(<App />, document.getElementById('app'));
