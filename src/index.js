import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

import Lisa from './components/Lisa.js';
import Home from './components/Home.js';
import Tyler from './components/Tyler.js';
import App from './components/App.js';

ReactDom.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="home" component={Home}/>
      <Route path="tyler" component={Tyler}/>
      <Route path="lisa" component={Lisa}/>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'));
