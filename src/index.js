import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

import Contact from './components/Contact.js';
import Home from './components/Home.js';
import Portfolio from './components/Portfolio.js';
import App from './components/App.js';

ReactDom.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="home" component={Home}/>
      <Route path="portfolio" component={Portfolio}/>
      <Route path="contact" component={Contact}/>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'));
