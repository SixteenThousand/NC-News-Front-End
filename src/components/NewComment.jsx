import { useState, } from "react";
import { useParams, } from "react-router-dom";
import { formatDate, } from "../utils";
import api from "../api";


export default function NewComment({ setItems, requestConf, }) {
  requestConf = structuredClone(requestConf);
  const [formVisible, setFormVisible] = useState(false);
  const [commentBodyInput, setCommentBodyInput] = useState("");
  const { article_id } = useParams();
  
  function addNewComment(event) {
    event.preventDefault();
    setItems((items) => {
      return [{
        author: "jessjelly",
        body: commentBodyInput,
        created_at: formatDate(Date.now()),
        votes: 0,
      }].concat(items);
    });
    requestConf.method = "POST";
    requestConf.data = {
      username: "jessjelly",
      body: commentBodyInput,
    };
    api.request(requestConf)
      .then(({ data }) => {
        setCommentBodyInput("");
      })
      .catch((err) => {
        console.log("Something went wrong\n", err);
      });
  }
  
  function handleChange(event) {
    setCommentBodyInput(event.target.value);
  }

  return <div className="new-comment">
    {!formVisible ?
      <button onClick={() => { setFormVisible(true); }}>Comment...</button>
    :
      <form onSubmit={addNewComment}>
        <textarea name="body" rows="3"
          onChange={handleChange} placeholder="Write your comment here..."
          value={commentBodyInput}>
        </textarea>
        <button>Post</button>
      </form>}
  </div>;
}
