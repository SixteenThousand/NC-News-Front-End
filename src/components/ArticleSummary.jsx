import { Link } from "react-router-dom";


export default function ArticleSummary({ data, }) {
  const postedDate = new Date(data.created_at);
  const postedDateStr = "".concat(
    postedDate.getFullYear(),
    "-",
    (postedDate.getMonth()+1).toString().padStart(2,'0'),
    "-",
    postedDate.getDate());
  
  return <Link to={`/articles/${data.article_id}`}>
      <article className="article-summary">
      <div className="title">{data.title}</div>
      <div className="details">
        <div className="topic">{data.topic}</div>
        <div className="votes">{data.votes}</div>
        <div className="author">By {data.author}</div>
        <div className="created_at">Posted: {postedDateStr}</div>
      </div>
      <img src={data.article_img_url} alt={`image for ${data.title}`} />
    </article>;
  </Link>;
}
