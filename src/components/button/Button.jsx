import classNames from "classnames";
import styles from "./button.module.css";

export const Button = ({
  name,
  onClick,
  isActive = false,
  variant = "ordinaryButton",
  color = "Base",
  type = "button",
  disabled = false,
}) => {
  const colorClass = isActive ? "Green" : color;

  return (
    <button
      className={classNames(
        styles.buttonBase,
        styles[variant],
        styles[`color${colorClass}`],
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {name}
    </button>
  );
};
