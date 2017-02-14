import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
var ReactGA = require('react-ga');
ReactGA.initialize('UA-3128634-8');

import App from './components/App';
import Home from './components/home/Index';
import Podcasts from './components/Podcasts';

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

ReactDom.render(<Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={App}>
      <Route path="podcasts" component={Podcasts.App}>
        <Route path=":series" component={Podcasts.Series}>
          <Route path=":id" component={Podcasts.Episode} />
          <IndexRoute component={Podcasts.Episodes} />
        </Route>
      </Route>
      <IndexRoute component={Home} />
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
, document.getElementById('root'));
