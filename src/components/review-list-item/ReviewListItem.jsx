import { Counter } from "../counter/Counter";
import { UserInfoContainer } from "../user-info/UserInfo.container";
import styles from "./review-list-item.module.css";

export const ReviewListItem = ({ review }) => {
  return (
    <li className={styles.reviewItem}>
      <p className={styles.reviewText}>{review.text}</p>
      <Counter value={review.rating}/>
      <UserInfoContainer userId={review.userId} />
    </li>
  );
};
