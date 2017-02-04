import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import Home from './components/home/Home';
import Podcasts from './components/podcasts/Podcasts';
import MachineLearning from './components/podcasts/MachineLearning';
import WebDevelopment from './components/podcasts/WebDevelopment';
import DigitalNomad from './components/podcasts/DigitalNomad';

ReactDom.render(<Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="podcasts" component={Podcasts}>
        <Route path="machine-learning" component={MachineLearning}/>
        <Route path="web-development" component={WebDevelopment}/>
        <Route path="digital-nomad" component={DigitalNomad}/>
        <Redirect from="*" to="machine-learning"/>
      </Route>
      <IndexRoute component={Home} />
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
, document.getElementById('root'));
