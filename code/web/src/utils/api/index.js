import axios from 'axios';
import { API_URL } from 'utils/config';

export const axiosInstance = axios.create({
  contentType: 'application/json',
});

const getRefreshToken = () => {
  const token = localStorage.getItem('refresh_token');
  return token;
};

const post = (endpoint, data) => {
  return axios.post(`${API_URL}/${endpoint}`, data);
};

const postNoData = endpoint => {
  return axios.post(`${API_URL}/${endpoint}`);
};

const get = endpoint => {
  const accessToken = localStorage.getItem('access_token');
  return axios.get(`${API_URL}/${endpoint}`, {
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
  return axios.post(`${API_URL}/${endpoint}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const deleteItem = endpoint => {
  const accessToken = localStorage.getItem('access_token');
  return axios.delete(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const updateItem = (endpoint, data) => {
  const accessToken = localStorage.getItem('access_token');
  return axios.put(`${API_URL}/${endpoint}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getRedditPost = subreddit => {
  return axios
    .get(`https://www.reddit.com/r/${subreddit}/new.json?limit=1`)
    .catch(error => {
      console.log(error);
    });
};

export const signUp = data => post('api/users.json', data);
export const signIn = data => post('api/oauth/token.json', data);
export const getMyInfo = () => get('api/users.json');
export const updateMyInfo = data => put('api/users.json', data);
export const getTweets = (count = 10) =>
  get(`api/users/twitter.json?count=${count}`);

export const getFolder = id => get(`api/users/folders/${id}.json`);
export const getFolders = () => get('api/users/folders.json');
export const createFolder = data => postItem('api/users/folders.json', data);
export const deleteFolder = id => deleteItem(`api/users/folders/${id}.json`);
export const updateFolder = (data, id) =>
  updateItem(`api/users/folders/${id}.json`, data);

export const getBookmark = (folderId, bookmarkId) =>
  get(`api/users/folders/${folderId}/bookmarks/${bookmarkId}.json`);

export const createBookmark = (data, id) =>
  postItem(`api/users/folders/${id}/bookmarks.json`, data);

export const deleteBookmark = (folderId, bookmarkId) =>
  deleteItem(`api/users/folders/${folderId}/bookmarks/${bookmarkId}.json`);

export const updateBookmark = (data, id) =>
  updateItem(`api/users/bookmarks/${id}.json`, data);

export const getRequestToken = () =>
  postNoData('api//auth/twitter/request_token');

export const postToTwitter = message => postItem('api/twitter/tweet', message);
