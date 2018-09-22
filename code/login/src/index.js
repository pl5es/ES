import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Components/Login';
import LoginFormik from './Components/LoginFormik';
import DummyNewsFeed from './Components/DummyNewsFeed';

ReactDOM.render(<LoginFormik />, document.getElementById('root'));
ReactDOM.render(<DummyNewsFeed />, document.getElementById('news'));