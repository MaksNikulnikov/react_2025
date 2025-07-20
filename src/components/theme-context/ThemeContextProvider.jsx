import { useState } from "react";
import { ThemeContext } from "./themeContext";

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("🌙 Dark");

  const toggleTheme = () =>
    setTheme(theme === "🌙 Dark" ? "☀️ Light" : "🌙 Dark");

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};
