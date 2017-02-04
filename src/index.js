import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import Home from './components/home/Index';
import Podcasts from './components/Podcasts';

ReactDom.render(<Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="podcasts" component={Podcasts.App}>
        <Route path=":series" component={Podcasts.Series}>
          <Route path=":id" component={Podcasts.Episode} />
          <IndexRoute component={Podcasts.Episodes} />
        </Route>
        <Redirect from="*" to="machine-learning"/>
      </Route>
      <IndexRoute component={Home} />
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
, document.getElementById('root'));
