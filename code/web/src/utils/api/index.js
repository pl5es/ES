import axios from 'axios';
import { API_URL } from 'utils/config';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:300/api',
  timeout: 5000,
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
  return axios.get(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const postItem = (endpoint, data) => {
  const accessToken = localStorage.getItem('access_token');
  return axios.post(`${API_URL}/${endpoint}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

const deleteItem = endpoint => {
  const accessToken = localStorage.getItem('access_token');
  return axios.delete(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

const updateItem = (endpoint, data) => {
  const accessToken = localStorage.getItem('access_token');
  return axios.put(`${API_URL}/${endpoint}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}





export const signUp = data => post('api/users.json', data);
export const signIn = data => post('api/oauth/token.json', data);
export const getMyInfo = () => get('api/users/1.json');

export const getFolders = () => get('api/users/folders.json');
export const createFolder = data => postItem('api/users/folders.json',data);
export const deleteFolder = (id) => deleteItem('api/users/folders/'+id+'.json');
export const updateFolder = (data,id) => updateItem('api/users/folders/'+id+'.json',data);

export const getBookmarks = () => get('api/users/bookmarks.json');
export const createBookmark = data => postItem('api/users/bookmarks.json',data);
export const deleteBookmark = (id) => deleteItem('api/users/bookmarks/'+id+'.json');
export const updateBookmark = (data,id) => updateItem('api/users/bookmarks/'+id+'.json',data);
