import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'reducers';
import Login from 'pages/Login';
import Register from 'pages/Register';
import {LOGIN_USER_SUCCESS} from 'actions/types'

// const createStoreWithMiddleware = applyMiddleware()(createStore);
// const store = createStoreWithMiddleware(rootReducer);

const store = createStore(reducer, applyMiddleware(thunk));

if (localStorage.getItem('token')) {
  store.dispatch({ type: LOGIN_USER_SUCCESS });
}

const RouterApp = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  </Provider>
);

export default RouterApp;
