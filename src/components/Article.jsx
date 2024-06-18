import { useParams, } from "react-router-dom";
import { useEffect, useState, } from "react";
import { getArticle } from "../api";
import Todo from "./Todo";
import { formatDate, } from "../utils";


export default function Article({}) {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState(null);
  
  useEffect(() => {
    getArticle(article_id).then((data) => {
      setArticleData(data);
    });
  }, []);
  
  return <article className="article">
    {function() {
      if(articleData === null) {
        return <Todo msg="Error component not built!" />;
      }
      return <>
        <h3>{articleData.title}</h3>
        <p>By {articleData.author}</p>
        <p>Posted: {formatDate(articleData.created_at)}</p>
        <img src={articleData.article_img_url} alt={`image for ${articleData.title}`} />
        <p>{articleData.body}</p>
        <h4>comments</h4>
        <Todo msg="comment endpoint not complete!" />
      </>;
    }()}
  </article>;
}
