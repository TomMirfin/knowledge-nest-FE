import axios from "axios";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = "https://skillshare-app.onrender.com";

export const getArticles = () => {
  return axios.get("/articles");
};

export const postArticle = (newArticle) => {
  return axios.post("/articles", newArticle);
};






