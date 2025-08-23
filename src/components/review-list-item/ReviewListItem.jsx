import { Button } from "../button/Button";
import { Counter } from "../counter/Counter";
import styles from "./review-list-item.module.css";
import { ReviewForm } from "../review-form/ReviewForm";
import { UserInfo } from "../user-info/UserInfo";

export const ReviewListItem = ({
  review,
  user,
  isFormVisible,
  setIsFormVisible,
  isOwn,
}) => {
  return (
    <li className={styles.reviewItem}>
      <p className={styles.reviewText}>{review.text}</p>
      <Counter value={review.rating} />
      <UserInfo user={user} />
      {isFormVisible ? (
        <ReviewForm
          reviewData={review}
          handleUpdate={() => setIsFormVisible(false)}
        />
      ) : (
        isOwn && (
          <div className={styles.reviewUpdateButtonContainer}>
            <Button
              name="Редактировать"
              onClick={() => setIsFormVisible(true)}
            />
          </div>
        )
      )}
    </li>
  );
};
