import { useState } from "react";
import { UserContext } from "./userContext";

export const UserContextProvider = ({ children }) => {
  const [name, setName] = useState("");

  const logIn = (userName) => setName(userName);
  const logOut = () => setName("");
  const isLogged = name !== "";

  return (
    <UserContext value={{ logIn, logOut, isLogged }}>{children}</UserContext>
  );
};
