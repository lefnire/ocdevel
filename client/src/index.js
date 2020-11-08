import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import Home from './components/home/Index';
import Podcasts from './components/Podcasts';

// redirect from old routes
let match = window.location.href.match(/machine[\-]?learning(\/.*)?/);
if (match) {
  window.location.href = match[1] ? `/mlg${match[1]}` : '/mlg';
}

// 8bb28bed: google analytics
ReactDom.render(<Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="mlg" component={Podcasts.Series}>
        <Route path="recommend" component={Podcasts.Recommend} />
        <Route path=":id" component={Podcasts.Episode} />
        <IndexRoute component={Podcasts.Episodes} />
      </Route>
      <IndexRoute component={Home} />
      <Redirect from="*" to="/mlg"/>
    </Route>
  </Router>
, document.getElementById('root'));
