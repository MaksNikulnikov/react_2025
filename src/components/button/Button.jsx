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
  ariaLabel,
  buttonRef,
}) => {
  const colorClass = isActive ? "Green" : color;

  return (
    <button
      aria-label={ariaLabel}
      className={classNames(
        styles.buttonBase,
        styles[variant],
        styles[`color${colorClass}`],
      )}
      disabled={disabled}
      onClick={onClick}
      ref={buttonRef}
      type={type}
    >
      {name}
    </button>
  );
};
