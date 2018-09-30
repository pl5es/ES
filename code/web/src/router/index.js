import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import history from 'utils/history';
import Login from 'pages/Login';
import Register from 'pages/Register';
import PrivatePage from 'pages/PrivatePage';
import { PublicRoute, PrivateRoute } from 'router/routes';

const RouterApp = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/register" component={Register} />
      <PrivateRoute path="/protected" component={PrivatePage} />
    </Switch>
  </Router>
);

export default RouterApp;
