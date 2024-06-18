import axios from "axios";

const axiosInst = axios.create({
  // baseURL: "https://nc-news-mwvr.onrender.com/api",
  baseURL: "http://localhost:8000/api",
});
export default axiosInst;


export function getArticle(articleId) {
  return axiosInst.get(`/articles/${articleId}`)
    .then(({ data }) => {
      return data;
    });
}
