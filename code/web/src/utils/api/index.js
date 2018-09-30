import axios from 'axios';
import { API_URL } from 'utils/config';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:300/api',
  timeout: 5000,
  contentType: "application/json"
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
  return axios.get(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const signUp = data => post('api/users.json', data);
export const signIn = data => post('api/oauth/token.json', data);
export const getMyInfo = () => get('api/users/1.json');
