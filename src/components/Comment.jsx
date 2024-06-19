import { formatDate, } from "../utils";
import Voter from "./Voter";


export default function Comment({ data, }) {
  return <aside className="comment">
    <div>{data.author}</div>
    <div>{formatDate(data.created_at)}</div>
    <Voter votes={data.votes} />
    <div>{data.body}</div>
  </aside>;
}
