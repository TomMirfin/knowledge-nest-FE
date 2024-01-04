import axios from "axios";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = "https://skillshare-app.onrender.com";

export const getArticles = () => {
  console.log("were receiving stuff!");
  console.log(axios.get("/articles"));
  return axios.get("/articles");
};

export const getUserById = (user_id) => {
  return axios.get(`/users/${user_id}`);
};
