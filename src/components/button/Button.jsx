import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./button.module.css";

export const Button = forwardRef(function Button(
  {
    children,
    isActive = false,
    variant = "ordinaryButton",
    color = "Base",
    className,
    type = "button",
    ...props
  },
  ref,
) {
  const colorClass = isActive ? "Green" : color;

  return (
    <button
      className={classNames(
        styles.buttonBase,
        styles[variant],
        styles[`color${colorClass}`],
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});
