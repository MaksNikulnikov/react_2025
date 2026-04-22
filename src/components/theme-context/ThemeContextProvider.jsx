import { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";

const STORAGE_KEY = "restaurant-explorer-theme";
const THEMES = {
  light: "light",
  dark: "dark",
};

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return THEMES.light;
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);

  if (storedTheme === THEMES.light || storedTheme === THEMES.dark) {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.dark
    : THEMES.light;
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((currentTheme) =>
      currentTheme === THEMES.dark ? THEMES.light : THEMES.dark,
    );

  const themeLabel = theme === THEMES.dark ? "Dark mode" : "Light mode";

  return (
    <ThemeContext value={{ theme, themeLabel, toggleTheme }}>
      {children}
    </ThemeContext>
  );
};
