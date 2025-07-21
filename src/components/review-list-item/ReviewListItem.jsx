import { Counter } from "../counter/Counter";
import styles from "./review-list-item.module.css";

export const ReviewListItem = ({ text }) => {
  return (
    <li className={styles.item}>
      {text}
      <Counter />
    </li>
  );
};
