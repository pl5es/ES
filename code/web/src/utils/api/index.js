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

const postItem = (endpoint, data) => {
  const accessToken = localStorage.getItem('access_token');
  return axiosInstance.post(endpoint, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const deleteItem = endpoint => {
  const accessToken = localStorage.getItem('access_token');
  return axiosInstance.delete(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const updateItem = (endpoint, data) => {
  const accessToken = localStorage.getItem('access_token');
  return axiosInstance.post(endpoint, data,{
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

export const getFolder = (id) => get('/users/folders/'+id+'.json');
export const getFolders = () => get('/users/folders.json');
export const createFolder = data => postItem('/users/folders.json',data);
export const deleteFolder = (id) => deleteItem('/users/folders/'+id+'.json');
export const updateFolder = (data,id) => updateItem('/users/folders/'+id+'.json',data);

export const getBookmark = (folderId,bookmarkId) => get('/users/folders/'+folderId+'/bookmarks/'+bookmarkId+'.json');
export const createBookmark = (data,id) => postItem('/users/folders/'+id+'/bookmarks.json',data);
export const deleteBookmark = (folderId,bookmarkId) => deleteItem('/users/folders/'+folderId+'/bookmarks/'+bookmarkId+'.json');
export const updateBookmark = (data,id) => updateItem('/users/bookmarks/'+id+'.json',data);
