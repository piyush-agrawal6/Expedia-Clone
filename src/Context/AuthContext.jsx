import React, { useState } from "react";
import { createContext } from "react";
export const AuthContext = createContext();
const isUserLoggedIn = JSON.parse(localStorage.getItem("IsLogged")) || false;
const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(isUserLoggedIn);
  const [currentUser, setCurrentUser] = useState({});
  let value = { isAuth, SignIn, SignUp, SignOut, currentUser };
  function SignIn() {
    var currentUserData = JSON.parse(localStorage.getItem("loginUser"));
    setCurrentUser(currentUserData);
    setIsAuth(true);
    localStorage.setItem("IsLogged", JSON.stringify(true));
  }
  function SignUp(data) {
    var users = JSON.parse(localStorage.getItem("Users") || "[]");
    users.push(data);
    localStorage.setItem("Users", JSON.stringify(users));
  }
  function SignOut() {
    setIsAuth(false);
    setCurrentUser({});
    localStorage.setItem("IsLogged", JSON.stringify(false));
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
