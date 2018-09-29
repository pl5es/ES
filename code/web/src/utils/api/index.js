import { API_URL } from 'utils/config';
import axios from 'axios';

const post = (endpoint, data) => {
  return axios.post(`${API_URL}/${endpoint}`, data);
};

const get = endpoint => {
  return axios.get(`${API_URL}/${endpoint}`);
};

export const signUp = data => post('api/users.json', data);
export const signIn = () => get('users.json');
