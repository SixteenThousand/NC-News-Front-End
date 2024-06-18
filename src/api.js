import axios from "axios";

export default axios.create({
  baseURL: "https://nc-news-mwvr.onrender.com/api",
  // baseURL: "http://localhost:8000/api",
});
