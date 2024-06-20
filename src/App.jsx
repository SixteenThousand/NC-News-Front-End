import { Routes, Route, } from "react-router-dom";
import "./App.css"
import { UserContextProvider } from "./UserContext";
import Header from "./components/Header";
import AllArticles from "./components/AllArticles";
import Article from "./components/Article";

function App() {
  
  return <UserContextProvider>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </main>
  </UserContextProvider>;
}

export default App
