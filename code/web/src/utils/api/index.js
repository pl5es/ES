import axios from "axios";
import { API_URL, ORCID_CLIENT_ID, ORCID_CLIENT_SECRET } from "utils/config";

export const axiosInstance = axios.create({
  contentType: "application/json"
});

const postTest = (url = "") =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(response => response.json());

export const postOrcid = code => {
  const url = `https://orcid.org/oauth/token?client_id=APP-D7HK0ZRV7DLASQHI&client_secret=696a5ad5-faa5-46aa-9a7b-7ae3240827fd&grant_type=authorization_code&redirect_uri=http://localhost:3001/auth/orcid/callback&code=${code}`;
  return postTest(url)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

const externalPost = endpoint => {
  return axios.post(endpoint);
};

const post = (endpoint, data) => {
  return axios.post(`${API_URL}/${endpoint}`, data);
};

const postNoData = endpoint => {
  return axios.post(`${API_URL}/${endpoint}`);
};

const get = endpoint => {
  const accessToken = localStorage.getItem("access_token");
  return axios.get(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

const put = (endpoint, data) => {
  const accessToken = localStorage.getItem("access_token");
  return axios.put(`${API_URL}/${endpoint}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

const postItem = (endpoint, data) => {
  const accessToken = localStorage.getItem("access_token");
  return axios.post(`${API_URL}/${endpoint}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

const deleteItem = endpoint => {
  const accessToken = localStorage.getItem("access_token");
  return axios.delete(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

const updateItem = (endpoint, data) => {
  const accessToken = localStorage.getItem("access_token");
  return axios.put(`${API_URL}/${endpoint}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const getRedditPost = subreddit => {
  return axios
    .get(`https://www.reddit.com/r/${subreddit}/new.json?limit=1`)
    .catch(error => {
      console.log(error);
    });
};

export const signUp = data => post("api/users.json", data);
export const signIn = data => post("api/oauth/token.json", data);
export const getMyInfo = () => get("api/users.json");
export const updateMyInfo = data => put("api/users.json", data);
export const getTweets = (count = 7) =>
  get(`api/users/twitter/tweets.json?count=${count}`);

export const getFolder = id => get(`api/users/folders/${id}.json`);
export const getFolders = () => get("api/users/folders.json");
export const createFolder = data => postItem("api/users/folders.json", data);
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
  postNoData("api//auth/twitter/request_token");

export const orcidPost = code => post("api/auth/orcid/reverse", { code: code });
export const newOrcidPost = code => post("api/auth/orcid/reverse/login", { code: code });

export const postToTwitter = message =>
  postItem("api/users/twitter/post_tweet", message);

export const postORCID = code =>
  externalPost(
    `https://orcid.org/oauth/token?client_id=APP-D7HK0ZRV7DLASQHI&client_secret=696a5ad5-faa5-46aa-9a7b-7ae3240827fd&grant_type=authorization_code&redirect_uri=http://localhost:3001/orcid&code=${code}`
  );