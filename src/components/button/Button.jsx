import styles from "./button.module.css";
import classNames from "classnames";

export const Button = ({
  name,
  onClick,
  isActive = false,
  variant = "ordinaryButton",
  color = "",
  type ="button",
}) => {
  return (
    <button
      className={classNames(styles.buttonBase, styles[variant], styles[color], {
        [styles.active]: isActive,
      })}
      onClick={onClick}
      type={type}
    >
      {name}
    </button>
  );
};
