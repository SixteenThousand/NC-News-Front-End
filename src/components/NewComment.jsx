import { useState, } from "react";
import { useParams, } from "react-router-dom";
import { formatDate, } from "../utils";


export default function NewComment({ setItems, requestConf, }) {
  const [formVisible, setFormVisible] = useState(false);
  const [commentBodyInput, setCommentBodyInput] = useState("");
  const { article_id } = useParams();
  
  function addNewComment(event) {
    event.preventDefault();
    setItems((items) => {
      return items.concat({
        author: "username",
        body: "",
        created_at: formatDate(Date.now()),
        votes: 0,
        article_id,
      });
    });
  }
  
  function handleChange(event) {
    setCommentBodyInput(event.target.value);
    console.log(commentBodyInput);
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
