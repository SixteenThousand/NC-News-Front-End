import { useState, useEffect, } from "react";
import api from "../api.js";
import LoadingMsg from "./LoadingMsg";


/**
 * Renders a list of items fetched from a given URL, paginating as appropriate
 * (pagination not built yet!)
 * @prop requestConf: Object - the axios config needed to request the items'
 * data
 * @prop ItemComponent: React Component - the component to be used when
 * rendering the data of each item.
 * @prop idKey: String - a key that every item has which uniquely identifies
 * that item
 * @prop itemsKey: String - the key on the response data where the list of
 * items is stored
 * @prop NewItemComponent: React Component - a form which can be used to add
 * a new item to the list. Makes a patch request to the same endpoint as
 * Paginator
 */
export default function Paginator({
    requestConf,
    ItemComponent,
    idKey,
    itemsKey,
    loadingMsg,
    NewItemComponent, }) {
  requestConf = structuredClone(requestConf);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // for later
    // requestConf.params.p = //some page state
    // requestConf.params.limit = 10;
    api.request(requestConf).then(({ data }) => {
      setItems(data[itemsKey]);
      setIsLoading(false);
    });
  }, []);

  return <div className="paginator">
    {isLoading ?
      <LoadingMsg msg={loadingMsg} />
    :
      <>
        <NewItemComponent setItems={setItems} requestConf={requestConf} />
        {items.map((item) => {
          return <ItemComponent key={item[idKey]} data={item} />;
        })}
      </>
    }
  </div>;
}
