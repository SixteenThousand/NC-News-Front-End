import { useState, useEffect, } from "react";
import ErrorMsg from "./ErrorMsg";
import api from "../api";


export default function SearchBar({ setRequestConf, }) {
  const [searchInputs, setSearchInputs] = useState({});
  const [topics, setTopics] = useState([]);
  const [hasErrored, setHasErrored] = useState(false);
  
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
    <select onChange={handleChange} name="topic" value={searchInputs.topic}>
      {topics.map((topic) => 
        <option key={topic} value={topic}>{topic}</option>
      )}
    </select>
    <button>Search</button>
  </form>;
}
