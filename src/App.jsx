import { useState, } from 'react'
import { Routes, Route, } from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import AllArticles from "./components/AllArticles";
import Article from "./components/Article";

function App() {
  
  return <>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </main>
  </>;
}

export default App
