import axios from "axios";
import { ArticleData } from "../types/type";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = "https://skillshare-app.onrender.com";

export const getArticles = () => {
  return axios.get("/articles");
};

export const postArticle = (newArticle: object) => {
  return axios.post<ArticleData>("/articles", newArticle);
};

export const getUserById = (user_id: string) => {
  return axios.get(`/users/${user_id}`);
};
export const getUserByUsername = (username: any) => {
  return axios.get(`/users/username/${username}`);
};

export const patchUserByUser = (username: any, patchBody: object) => {
  return axios.put(`/users/${username}`, patchBody);
};

export const getArticleByArticleId = (article_id: any) => {
  return axios.get(`articles/${article_id}`);
};

export const postUser = (userObj: object) => {
  return axios.post("/users", userObj);
};

export const getReviews = (username: string) => {
  return axios.get(`/reviews?created_about=${username}`);
};

export const postReview = (postBody: any) => {
  return axios.post("/reviews", postBody);
};
