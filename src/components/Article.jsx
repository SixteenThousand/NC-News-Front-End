import { useParams, } from "react-router-dom";
import { useEffect, } from "react";


export default function Article({}) {
  const { article_id } = useParams();
  
  useEffect(() => {

  }, []);
  
  return <p>Helloo! This is article {article_id}</p>;
}
