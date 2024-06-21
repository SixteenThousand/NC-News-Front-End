import { useState, useEffect, } from "react";
import { useSearchParams, } from "react-router-dom";
import ErrorMsg from "./ErrorMsg";
import api from "../api";

// fields the user can sort by. Values are the display names of the fields
const SORTABLE_FIELDS = {
  "created_at": "Post Date",
  "comment_count": "Number of comments",
  "votes": "votes",
};

export default function SearchBar({ setRequestConf, }) {
  const [searchInputs, setSearchInputs] = useState({
    topic: "coding",
    sortBy: "created_at",
    order: "desc",
  });
  const [topics, setTopics] = useState([]);
  const [hasErrored, setHasErrored] = useState(false);
  const [urlQueries, setUrlQueries] = useSearchParams();
  
  useEffect(() => {
    api.get("/topics")
      .then(({ data }) => {
        setTopics(data.map((topic) => topic.slug));
      })
      .catch((err) => {
        console.log(err);
        setHasErrored(true);
      });
  }, []);

  function handleChange(event) {
    setSearchInputs((currSearchInputs) => {
      return {
        ...currSearchInputs,
        [event.target.name]: event.target.value,
      };
    });
  }
  
  if(hasErrored) {
    return <ErrorMsg msg="Topics could not be loaded. Please try again." />;
  }
  return <form className="search-bar">
    <label>
      Topic:
      <select onChange={handleChange} name="topic"
          defaultValue={searchInputs.topic}>
        {topics.map((topic) => {
          return <option key={topic} value={topic}>
            {topic}
          </option>;
        })}
      </select>
    </label>
    <label>
      Sort by:
      <select onChange={handleChange} name="sort_by"
          defaultValue={searchInputs.sortBy}>
        {Object.keys(SORTABLE_FIELDS).map((field) => {
            return <option key={field} value={field}>
              {SORTABLE_FIELDS[field]}
            </option>;
        })}
      </select>
    </label>
    <label>
      Order:
      <select onChange={handleChange} name="order"
          defaultValue={searchInputs.order}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </label>
    <button>Search</button>
  </form>;
}
