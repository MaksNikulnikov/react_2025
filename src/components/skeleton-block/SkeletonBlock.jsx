import classNames from "classnames";
import styles from "./skeleton-block.module.css";

export const SkeletonBlock = ({
  as: Component = "div",
  className,
}) => (
  <Component
    aria-hidden="true"
    className={classNames(styles.block, className)}
  />
);
