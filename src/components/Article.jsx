import { useParams, } from "react-router-dom";
import { useEffect, useState, } from "react";
import { getArticle } from "../api";
import LoadingMsg from "./LoadingMsg";
import Scroller from "./Scroller";
import NewComment from "./NewComment";
import Voter from "./Voter";
import Comment from "./Comment";
import { formatDate, } from "../utils";


export default function Article({}) {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const commentRequestConf = {
    url: `/articles/${article_id}/comments`
  };
  const voteRequestConf = {
    url: `/articles/${article_id}`,
  };
  
  useEffect(() => {
    getArticle(article_id).then((data) => {
      setArticleData(data);
      setIsLoading(false);
    });
  }, []);
  
  return <article className="article">
    {isLoading ? 
      <LoadingMsg msg="Loading article..." />
    :
      <>
        <div className="top-bar">
          <div className="topic">{articleData.topic}</div>
          <Voter requestConf={voteRequestConf} initialVotes={articleData.votes} />
        </div>
        <h3>{articleData.title}</h3>
        <p>By {articleData.author}</p>
        <p>Posted: {formatDate(articleData.created_at)}</p>
        <img src={articleData.article_img_url} alt={`image for ${articleData.title}`} />
        <p>{articleData.body}</p>
        <h4>comments</h4>
        <Scroller
          requestConf={commentRequestConf}
          ItemComponent={Comment}
          idKey="comment_id"
          itemsKey="comments"
          loadingMsg="Loading comments..."
          NewItemComponent={NewComment}
        />
      </>}
  </article>;
}
