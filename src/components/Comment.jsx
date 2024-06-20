import { useContext, useState, } from "react";
import { formatDate, } from "../utils";
import Voter from "./Voter";
import ErrorMsg from "./ErrorMsg";
import LoadingMsg from "./LoadingMsg";
import UserContext from "../UserContext";
import api from "../api";


export default function Comment({ data, }) {
  const{ user } = useContext(UserContext);
  const voteRequestConf = {
    url: `/articles/${data.article_id}/comments`
  };
  // represents the step in the deletion process this comment is on. Must be one 
  // of "not_deleted", "loading", "deleted", "checking"
  const [deletionStep, setDeletionStep] = useState("not_deleted");
  
  const deletionWidget = {
    not_deleted: (<button onClick={() => { setDeletionStep("checking"); }}>
      Delete
    </button>),
    deleted: (<div>--Comment Deleted--</div>),
    loading: (<LoadingMsg msg="Deleting comment..." />),
    checking: (<div>
      Are you sure?
      <button onClick={deleteComment}>Yes</button>
      <button onClick={() => { setDeletionStep("not_deleted"); }}>
        No
      </button>
    </div>),
    error: (<ErrorMsg />),
  };
  
  function deleteComment() {
    setDeletionStep("loading");
    return api.delete(`/comments/${data.comment_id}`)
      .then(({ data }) => {
        setDeletionStep("deleted");
      })
      .catch((err) => {
        console.log(err);
        setDeletionStep("error");
      });
  }
  
  return <div className="comment">
    <div>{data.author}</div>
    <div>{formatDate(data.created_at)}</div>
    <Voter requestConf={voteRequestConf} initialVotes={data.votes} />
    <div>{data.body}</div>
    {data.author === user.username ? deletionWidget[deletionStep] : null}
  </div>;
}
