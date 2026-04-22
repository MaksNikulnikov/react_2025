import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  themeLabel: "Light mode",
  toggleTheme: () => {},
});
