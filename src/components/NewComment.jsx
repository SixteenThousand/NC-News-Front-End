import { useState, useContext, } from "react";
import api from "../api";
import UserContext from "../UserContext";
import LoadingMsg from "./LoadingMsg";
import ErrorMsg from "./ErrorMsg";


export default function NewComment({ setItems, requestConf, }) {
  requestConf = structuredClone(requestConf);
  const [commentBodyInput, setCommentBodyInput] = useState("");
  // the "step" in posting a comment that the user is in. Must be one of
  // "start", "writing", "loading", "error"
  const [postingStep, setPostingStep] = useState("start");
  const { user } = useContext(UserContext);
  
  function addNewComment(event) {
    event.preventDefault();
    setPostingStep("loading");
    requestConf.method = "POST";
    requestConf.data = {
      username: user.username,
      body: commentBodyInput,
    };
    api.request(requestConf)
      .then(({ data }) => {
        setCommentBodyInput("");
        setItems((items) => [
          data.postedComment,
          ...items
        ]);
        setPostingStep("start");
      })
      .catch((err) => {
        console.log("Something went wrong\n", err);
      });
  }
  
  function handleChange(event) {
    setCommentBodyInput(event.target.value);
  }

  return <div className="new-comment">
    {function() {
      switch(postingStep) {
        case "start":
          return <button onClick={() => { setPostingStep("write"); }}>
            Comment...
          </button>;
        case "write":
          return <form onSubmit={addNewComment}>
            <textarea name="body" rows="3"
              onChange={handleChange} placeholder="Write your comment here..."
              value={commentBodyInput}>
            </textarea>
            <button>Post</button>
          </form>;
        case "loading":
          return <LoadingMsg msg="posting comment..." />;
        default:
          return <ErrorMsg />;
      }
    }()}
  </div>;
}
