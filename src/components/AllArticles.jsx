import { useState } from "react";
// import ArticleSummary from "./ArticleSummary";
import Paginator from "./Paginator";


export default function AllArticles({}) {
  // the axios config needed to request the articles
  const [requestConf, setRequestConf] = useState({ url: "/articles"});
  return <div className="all-articles">
{/*     <SearchBar setRequestConf={setRequestConf} /> */}
    <Paginator
      requestConf={requestConf}
      ItemComponent={ArticleSummary}
      idKey="article_id"
      itemsKey="articles"
    />
  </div>;
}


// export default
function ArticleSummary({ data, }) {
  return <article className="article-summary">
    <div className="title">{data.title}</div>
    <div className="details">
      <div className="topic">{data.topic}</div>
      <div className="votes">{data.votes}</div>
      <div className="author">By {data.author}</div>
      <div className="created_at">Posted: {data.votes}</div>
    </div>
    <img src={data.article_img_url} alt={`image for ${data.title}`} />
  </article>;
}
