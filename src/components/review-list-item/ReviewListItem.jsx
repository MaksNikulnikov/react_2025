import { useState } from "react";
import { Button } from "../button/Button";
import { RatingDisplay } from "../rating-display/RatingDisplay";
import styles from "./review-list-item.module.css";
import { ReviewForm } from "../review-form/ReviewForm";
import { UserInfo } from "../user-info/UserInfo";

export const ReviewListItem = ({ review, user, isOwn }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

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
            <Button onClick={() => setIsFormVisible(true)}>Edit review</Button>
          </div>
        )
      )}
    </li>
  );
};
