import { useState, useEffect, } from "react";
import { useSearchParams, } from "react-router-dom";
import api from "../api.js";
import LoadingMsg from "./LoadingMsg";
import { compareByKey, } from "../utils";


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
  const [urlQueries, setUrlQueries]  = useSearchParams();
  
  useEffect(() => {
    api.request(requestConf).then(({ data }) => {
      // filter out some received items based on queries in the url
      // but do not filter by the "sort_by" query
      let sortByQuery;
      let sortOrderQuery;
      const filterQueries = [];
      for(const entry of urlQueries.entries()) {
        switch(entry[0]) {
          case "sort_by":
            sortByQuery = entry[1];
            break;
          case "order":
            sortOrderQuery = entry[1];
            break;
          default:
            filterQueries.push(entry);
            break;
        }
      }
      const newItems = data[itemsKey]
        .filter((item) => {
          for(const [key,value] of filterQueries) {
            if(value !== "all" && value !== item[key]) return false;
          }
          return true;
        })
        .toSorted(compareByKey(urlQueries.get("sort_by")));
      if(sortOrderQuery === "desc") newItems.reverse();
      setItems(newItems);
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
