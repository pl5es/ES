import axios from 'axios';
import { API_URL } from 'utils/config';

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
