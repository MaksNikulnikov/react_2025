import { Counter } from "../counter/Counter";
import styles from "./review-list-item.module.css";

export const ReviewListItem = ({ review }) => {
  return (
    <li className={styles.item}>
      {review.text}
      <Counter />
    </li>
  );
};
