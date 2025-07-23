import { useTheme } from "../theme-context/use-theme";
import styles from "./button.module.css";
import classNames from "classnames";

export const Button = ({
  name,
  onClick,
  isActive = false,
  variant = "ordinaryButton",
  color = "Base",
  type = "button",
}) => {
  const { theme } = useTheme();

  const colorClass = isActive ? "Green" : color;

  const colorThemeClass =
    color && theme === "🌙 Dark"
      ? styles[`color${colorClass}Dark`]
      : styles[`color${colorClass}Light`];

  return (
    <button
      className={classNames(
        styles.buttonBase,
        styles[variant],
        colorThemeClass,
        {
          [styles.active]: isActive,
        },
      )}
      onClick={onClick}
      type={type}
    >
      {name}
    </button>
  );
};
