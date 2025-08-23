import { useState } from "react";
import { UserContext } from "./userContext";

export const UserContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const CURRENT_USER_ID = "mock-user-id";

  const logIn = (userName) => setName(userName);
  const logOut = () => setName("");
  const isLogged = name !== "";
  const userId = CURRENT_USER_ID;

  return (
    <UserContext value={{ logIn, logOut, isLogged, userId }}>
      {children}
    </UserContext>
  );
};
