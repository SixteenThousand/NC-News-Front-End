import { useState, useEffect, } from "react";
import axios from "axios";


/**
* Renders a list of items fetched from a given URL, paginating as appropriate
* (pagination not built yet!)
* @prop requestUrl: string - the url from which requests for the item data
* is made
* @prop ItemComponent: React Component - the component to be used when
* rendering the data of each item.
* @prop idKey: String - a key that every item has which uniquely identifies
* that item
* @prop itemsKey: String - the key on the response data where the list of
* items is stored
*/
export default function Paginator({ requestUrl, ItemComponent, idKey, itemsKey }) {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    axios.get(requestUrl)
      .then(({ data }) => {
        setItems(data[itemsKey]);
      });
  }, []);

  return <ol className="paginator">
    {items.map((item) => {
      return <ItemComponent key={item[idKey]} data={item} />;
    })}
  </ol>;
}
