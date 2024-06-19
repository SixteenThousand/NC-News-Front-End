import { useState, } from "react";
import api from "../api";


export default function Voter({ requestConf, initialVotes }) {
  requestConf = structuredClone(requestConf);
  requestConf.method = "PATCH";
  const[votes, setVotes] = useState(initialVotes);
  function handleVote(event) {
    if(event.target.name === "down") {
      requestConf.data = {
        inc_votes: -1,
      };
      setVotes((votes) => votes - 1);
      api.request(requestConf).catch((err) => {
        console.log("%d: %s",err.response.status,err.response.data);
        setVotes((votes) => votes + 1);
      });
    } else {
      requestConf.data = {
        inc_votes: 1,
      };
      setVotes((votes) => votes + 1);
      api.request(requestConf).catch((err) => {
        console.log("%d: %s",err.response.status,err.response.data);
        setVotes((votes) => votes - 1);
      });
    }
  }
  
  return <div className="votes">
    <button onClick={handleVote} name="down">🔽</button>
    {votes}
    <button onClick={handleVote} name="up">🔼</button>
  </div>;
}
