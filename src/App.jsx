import { useState, } from 'react'
import { Routes, Route, } from "react-router-dom";
import Header from "./components/Header";
import AllArticles from "./components/AllArticles";
import './App.css'

function App() {
  
  return <>
    <Header />
    <Routes>
      <Route path="/" element={<AllArticles />} />
    </Routes>
  </>;
}

export default App
