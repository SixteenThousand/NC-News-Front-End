import axios from "axios";

const axiosInst = axios.create({
  baseURL: "https://nc-news-mwvr.onrender.com/api",
  // baseURL: "http://localhost:8000/api",
});
export default axiosInst;


export function getArticle(articleId) {
  return axiosInst.get(`/articles/${articleId}`)
    .then(({ data }) => {
      return data;
    });
}

export function getComments(articleId) {
  return axiosInst.get(`/articles/${articleId}/comments`)
    .then(({ data }) => {
      return data;
    });
}

export function getAllArticles() {
  return axiosInst.get("/articles")
    .then(({ data }) => {
      return data;
    });
}

export function voteOnComment(commentId) {
  return axiosInst.patch(`/comments/${commentId}`)
    .then(({ data }) => {
      return data.votes;
    });
}

export function voteOnArticle(articleId) {
  return axiosInst.patch(`/articles/${articleId}`)
    .then(({ data }) => {
      return data.votes;
    });
}
