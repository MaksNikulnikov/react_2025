import { Button } from "../button/Button";
import { RatingDisplay } from "../rating-display/RatingDisplay";
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
      <RatingDisplay value={review.rating} />
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
              name="Edit review"
              onClick={() => setIsFormVisible(true)}
            />
          </div>
        )
      )}
    </li>
  );
};
