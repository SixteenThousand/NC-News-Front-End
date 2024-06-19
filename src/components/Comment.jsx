import { formatDate, } from "../utils";
import Voter from "./Voter";


export default function Comment({ data, }) {
  const voteRequestConf = {
    url: `/articles/${data.article_id}/comments`
  };
  return <aside className="comment">
    <div>{data.author}</div>
    <div>{formatDate(data.created_at)}</div>
    <Voter requestConf={voteRequestConf} initialVotes={data.votes} />
    <div>{data.body}</div>
  </aside>;
}
