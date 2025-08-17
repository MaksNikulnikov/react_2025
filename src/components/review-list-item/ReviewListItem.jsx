import { useState } from "react";
import { Button } from "../button/Button";
import { Counter } from "../counter/Counter";
import { UserInfoContainer } from "../user-info/UserInfo.container";
import styles from "./review-list-item.module.css";
import { ReviewForm } from "../review-form/ReviewForm";

export const ReviewListItem = ({ review }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  return (
    <li className={styles.reviewItem}>
      <p className={styles.reviewText}>{review.text}</p>
      <Counter value={review.rating} />
      <UserInfoContainer userId={review.userId} />
      {isFormVisible ? (
        <ReviewForm reviewData={review} handleUpdate={()=>setIsFormVisible(false)}/>
      ) : (
        <div className={styles.reviewUpdateButtonContainer}>
          <Button
            name="Редактировать"
            onClick={() => setIsFormVisible(true)}
          ></Button>
        </div>
      )}
    </li>
  );
};
