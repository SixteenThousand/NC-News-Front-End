import { useState } from "react";
import ArticleSummary from "./ArticleSummary";
import Paginator from "./Paginator";
import Todo from "./Todo";


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
      NewItemComponent={Todo}
    />
  </div>;
}
