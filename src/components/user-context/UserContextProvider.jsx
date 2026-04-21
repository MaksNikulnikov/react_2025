import { useState } from "react";
import { UserContext } from "./userContext";

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const logIn = (user) => setCurrentUser(user);
  const logOut = () => setCurrentUser(null);

  const value = {
    currentUser,
    logIn,
    logOut,
    isLogged: currentUser !== null,
    userId: currentUser?.id ?? "",
    userName: currentUser?.name ?? "",
  };

  return <UserContext value={value}>{children}</UserContext>;
};
