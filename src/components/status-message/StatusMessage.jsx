import classNames from "classnames";
import styles from "./status-message.module.css";

export const StatusMessage = ({
  as: Component = "div",
  title,
  children,
  tone = "neutral",
  compact = false,
  className,
}) => {
  return (
    <Component
      className={classNames(
        styles.message,
        styles[tone],
        {
          [styles.compact]: compact,
        },
        className,
      )}
    >
      {title ? <span className={styles.title}>{title}</span> : null}
      {children ? <span className={styles.text}>{children}</span> : null}
    </Component>
  );
};
