import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import ReactGA from 'react-ga';

import App from './components/App';
import Home from './components/home/Index';
import Podcasts from './components/Podcasts';

const PROD = !~window.location.href.indexOf('localhost');
PROD && ReactGA.initialize('UA-3128634-8');
function logPageView() {
  if (!PROD) return;
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
