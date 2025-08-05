import { Counter } from "../counter/Counter";
import { UserInfo } from "../user-info/UserInfo";
import styles from "./review-list-item.module.css";

export const ReviewListItem = ({ review }) => {
  console
  return (
    <li className={styles.reviewItem}>
      <p className={styles.reviewText}>{review.text}</p>
      <Counter value={review.rating}/>
      <UserInfo userId={review.userId} />
    </li>
  );
};
