import { useContext, } from "react";
import UserContext from "../UserContext";


export default function Login({}) {
  const { user, setUser } = useContext(UserContext);

  return <div className="login">
    <img src={user.avatar_url} alt="user avatar" />
    <p>{user.username}</p>
  </div>;
}
