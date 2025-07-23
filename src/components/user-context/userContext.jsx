import { createContext } from "react";

export const UserContext = createContext({
  user: "",
  logIn: () => {},
  logOut: () => {},
  isLogged: () => {},
});
