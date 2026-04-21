import { createContext } from "react";

export const UserContext = createContext({
  currentUser: null,
  logIn: () => {},
  logOut: () => {},
  isLogged: false,
  userId: "",
  userName: "",
});
