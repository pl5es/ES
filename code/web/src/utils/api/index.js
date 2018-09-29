import axios from 'axios';
import { API_URL } from 'utils/config';


const post = (endpoint, data) => {
  return axios.post(`${API_URL}/${endpoint}`, data);
};

export const signUp = data => post('api/users.json', data);
export const signIn = data => post('api/oauth/token.json', data);
