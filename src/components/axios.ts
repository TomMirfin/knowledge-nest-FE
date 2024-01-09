import axios from "axios";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = "https://skillshare-app.onrender.com";

export const getArticles = () => {
  return axios.get("/articles");
};

export const postArticle = (newArticle: object) => {
  return axios.post("/articles", newArticle);
};

export const getUserById = (user_id: string) => {
  return axios.get(`/users/${user_id}`);
};
export const getUserByUsername = (username: string) => {
  return axios.get(`/users/username/${username}`);
};

export const patchUserByUser = (username: string, patchBody: object) => {
  // console.log(username);
  // console.log(patchBody);

  return axios.put(`/users/${username}`, patchBody);
};

export const getArticleByArticleId = (article_id: string) => {
  // console.log("works in the axios file!");
  return axios.get(`articles/${article_id}`);
};

export const postUser = (userObj: object) => {
  return axios.post("/users", userObj);
};

export const getReviews = (username: string) => {
  return axios.get("/reviews", username);
};
