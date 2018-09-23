import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Components/Login';
import Feed from './Components/Feed';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Login />, document.getElementById('login'));
ReactDOM.render(<Feed />, document.getElementById('feed'));
registerServiceWorker();
