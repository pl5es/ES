import axios from 'axios';
import { API_URL } from 'utils/config';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  contentType: 'application/json',
});

const getRefreshToken = () => {
  const token = localStorage.getItem('refresh_token');
  return token;
};

const post = (endpoint, data) => {
  return axios.post(`${API_URL}/${endpoint}`, data);
};

const get = endpoint => {
  const accessToken = localStorage.getItem('access_token');
  return axiosInstance.get(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const put = (endpoint, data) => {
  const accessToken = localStorage.getItem('access_token');
  return axios.put(`${API_URL}/${endpoint}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const signUp = data => post('api/users.json', data);
export const signIn = data => post('api/oauth/token.json', data);
export const getMyInfo = () => get('api/users.json');
export const updateMyInfo = data => put('api/users.json', data);
export const getTweets = (count = 10) => get('api/users/tweets.json?count=' + count);
