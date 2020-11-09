import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'css-social-buttons/css/zocial.css';

import App from './components/App';

// redirect from old routes
let match = window.location.href.match(/machine[\-]?learning(\/.*)?/);
if (match) {
  window.location.href = match[1] ? `/mlg${match[1]}` : '/mlg';
}

// 8bb28bed: google analytics
ReactDom.render(<Router><App /></Router>, document.getElementById('root'));