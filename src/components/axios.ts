import axios from "axios";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = "https://skillshare-app.onrender.com";

export const getArticles = () => {
  return axios.get("/articles");
};

export const postArticle = (newArticle) => {
  return axios.post("/articles", newArticle);
};

export const getUserByUsername = (username) => {
  return axios.get(`/users/username/${username}`);
};

export const patchUserByUser = (username, patchBody) => {
  console.log(username);
  console.log(patchBody);
  return axios.put(`/users/${username}`);
};
