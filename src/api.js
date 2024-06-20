import axios from "axios";

const axiosInst = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export default axiosInst;


export function getArticle(articleId) {
  return axiosInst.get(`/articles/${articleId}`)
    .then(({ data }) => {
      return data;
    });
}
