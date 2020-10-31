import React from 'react';
import ReactGA from 'react-ga';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from '../components/App';

// redirect from old routes
let match = window.location.href.match(/machine[\-]?learning(\/.*)?/);
if (match) {
  window.location.href = match[1] ? `/mlg${match[1]}` : '/mlg';
}

const PROD = !~window.location.href.indexOf('localhost');
PROD && ReactGA.initialize('UA-3128634-8');
function logPageView() {
  if (!PROD) return;
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export default function Home() {
  // return <Router onUpdate={logPageView}>
  return <Router>
    <App />
  </Router>
}