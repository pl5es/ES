import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Feed from './Feed';
import Perfil from './Perfil';
import Header from './Header';

export default class App extends Component {

  render() {
    return (
      <main>
        <Header/>
        <Switch>
          <Route exact path='/' component={Feed}/>
          <Route path='/login' component={Login}/>
          <Route path='/perfil' component={Perfil}/>
        </Switch>
      </main>
    );
  }
}
