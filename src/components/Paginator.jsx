import { useState } from "react";
import axios from "axios";


export default function Paginator({ requestUrl, itemComponent, idKey }) {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    axios.get(requestUrl)
      .then(({ data }) => {

      });

  return <ol className="paginator">
    {items.map((item) => {
      return <itemComponent key={item[idKey]} data={item} />
  </ol>
}
