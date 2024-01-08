import axios from "axios";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = "https://skillshare-app.onrender.com";

export const getArticles = () => {
  return axios.get("/articles");
};

export const postArticle = (newArticle) => {
  return axios.post("/articles", newArticle);
};

export const getUserById = (user_id) => {
  return axios.get(`/users/${user_id}`);
};

export const getUserByUsername = (username) => {
  return axios.get(`/users/username/${username}`);
};

export const patchUserByUser = (username, patchBody) => {
  console.log(username);
  console.log(patchBody);
  return axios.put(`/users/${username}`, patchBody);
};

export const getArticleByArticleId = (article_id) => {
  console.log("works in the axios file!");
  return axios.get(`articles/${article_id}`);
};
