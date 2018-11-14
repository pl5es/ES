import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import { postToTwitter } from 'utils/api';

export default class Twitter extends Component {
  state = {
    tweet: '',
  };

  onFailed() {
    console.log('error');
  }

  onSuccess() {
    console.log('success');
  }

  postTweet() {
    const { tweet } = this.state;
    let newTweet = {
      message : tweet,
    };
    postToTwitter(newTweet);
  }

  render() {
    const { tweet } = this.state;
    const customHeader = {};
    const accessToken = localStorage.getItem('access_token');
    customHeader['Authorization'] = `Bearer ${accessToken}`;
    return (
      <div className="container">
        <TwitterLogin
          loginUrl="http://localhost:3000/api/auth/twitter"
          onFailure={this.onFailed}
          onSuccess={this.onSuccess}
          customHeaders={customHeader}
          requestTokenUrl="http://localhost:3000/api/auth/twitter/reverse"
        />

        <br />
        <input
          value={tweet}
          onChange={e => this.setState({ tweet: e.target.value })}
        />
        <button type="submit" onClick={() => this.postTweet()}>
          Post tweet
        </button>
      </div>
    );
  }
}
