import Login from "./Login";
import { Link, } from "react-router-dom";

export default function Header({}) {
  return <header className="header">
    <Link to="/">
      <div className="title">
        <h1>NCN</h1>
        <h2>All the code, all the news</h2>
      </div>
    </Link>
    <Login />
  </header>;
}
