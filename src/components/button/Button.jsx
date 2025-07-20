import { ThemeContextProvider } from "../theme-context/ThemeContextProvider";
import { useTheme } from "../theme-context/use-theme";
import styles from "./button.module.css";
import classNames from "classnames";

export const Button = ({
  name,
  onClick,
  isActive = false,
  variant = "ordinaryButton",
  color = "",
  type = "button",
}) => {

  const {theme} = useTheme()
  console.log('theme', theme)
  return (
    <ThemeContextProvider>
      <button
        className={classNames(
          styles.buttonBase,
          styles[variant],
          styles[color],
          {
            [styles.active]: isActive,
            [styles.dark]: theme === "🌙 Dark",
          }
        )}
        onClick={onClick}
        type={type}
      >
        {name}
      </button>
    </ThemeContextProvider>
  );
};
