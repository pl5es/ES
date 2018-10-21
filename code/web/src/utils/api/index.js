import axios from 'axios';
// import { API_URL } from 'utils/config';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  contentType: 'application/json',
});

const getRefreshToken = () => {
  const token = localStorage.getItem('refresh_token');
  return token;
};

const post = (endpoint, data) => {
  return axiosInstance.post(endpoint, data);
};

const get = endpoint => {
  const accessToken = localStorage.getItem('access_token');
  return axiosInstance.get(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const signUp = data => post('/users.json', data);
export const signIn = data => post('/oauth/token.json', data);
export const getMyInfo = () => get('/users.json');
export const getTweets = data => get('/users/tweets.json', data);
