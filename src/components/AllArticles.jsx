import { useState } from "react";
// import ArticleSummary from "./ArticleSummary";
import Paginator from "./Paginator";


export default function AllArticles({}) {
  const [requestUrl, setRequestUrl] = useState("http://localhost:8000/api/articles");
  return <div className="all-articles">
{/*     <SearchBar setRequestUrl={setRequestUrl} /> */}
    <Paginator
      requestUrl={requestUrl}
      ItemComponent={ArticleSummary}
      idKey="article_id"
      itemsKey="articles"
    />
  </div>;
}


// export default
function ArticleSummary({ data, }) {
  return <article className="article-summary">
    <div>{data.title}</div>
  </article>;
}
