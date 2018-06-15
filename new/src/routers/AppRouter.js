import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from "../components/Dashboard";
import NotFoundPage from "../components/NotFound";
import Header from '../components/Header';

export const history = createHistory();

const AppRouter = () => (
<Router history={history}>
 <div>
  <Header />
  <Switch>

    <Route
    path="/"
    component={DashboardPage}
    exact={true}
   />
   <Route
    component={NotFoundPage}
   />
  </Switch>
 </div>

</Router>

);




export default AppRouter;
