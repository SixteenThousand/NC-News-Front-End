import { useState } from "react";


export default function AllArticles({}) {
  const [requestUrl, setRequestUrl] = useState("localhost:8000/articles");
  return <div className="all-articles">
    <SearchBar setRequestUrl={setRequestUrl} />
    <Paginator requestUrl={requestUrl} />
  </div>
}
