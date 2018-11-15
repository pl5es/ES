import React from 'react';
import TwitterLogin from 'react-twitter-auth';
import { API_URL } from 'utils/config';

const TwitterButton = props => (
  <TwitterLogin
    loginUrl={`${API_URL}/api/auth/twitter`}
    onFailure={onFailed}
    onSuccess={response => {
      props.setUserId
        ? registerUser(response, props.setUserId)
        : loginUser(response, props.login);
    }}
    showIcon
    requestTokenUrl={`${API_URL}/api/auth/twitter/reverse`}
  >
    Connect with Twitter
  </TwitterLogin>
);

const onFailed = () => {
  console.log('error');
};

const registerUser = (response, setUserId) => {
  response.json().then(body => setUserId(body.user_id));
};

const postInfo = (body, login) => {
  let loginObject = {
    twitter_oauth_token: body.oauth_token,
    twitter_oauth_token_secret: body.oauth_token_secret,
    twitter_user_id: body.user_id,
    auth_type: 'twitter',
    grant_type: 'password',
  };

  login(loginObject);
};


const loginUser = (response, login) => {
  response.json().then(body => postInfo(body, login));
};

export default TwitterButton;
