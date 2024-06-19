import { useState, } from "react";
import { useParams, } from "react-router-dom";
import { formatDate, } from "../utils";


export default function NewComment({ setItems, requestConf, }) {
  const [formVisible, setFormVisible] = useState(false);
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

  return <div className="new-comment">
    {!formVisible ?
      <button onClick={() => { setFormVisible(true); }}>Comment...</button>
    :
      <form onSubmit={addNewComment}>
        <input
          type="text"
          name="body"
          placeholder="Write your comment here..."
        />
        <button>Post</button>
      </form>}
  </div>;
}
