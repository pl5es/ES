import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';

export default class Twitter extends Component {
  render() {
    const customHeader = {};
    const accessToken = localStorage.getItem('access_token');
    customHeader['Authorization'] = `Bearer ${accessToken}`;
    return (
      <div>
        <TwitterLogin
          loginUrl="http://localhost:3000/api/auth/twitter"
          onFailure={this.onFailed}
          onSuccess={this.onSuccess}
          customHeaders={customHeader}
          requestTokenUrl="http://localhost:3000/api/auth/twitter/reverse"
        />
      </div>
    );
  }

  onFailed() {
    console.log('error');
  }

  onSuccess() {
    console.log('success');
  }
}
