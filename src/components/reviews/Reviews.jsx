import styles from "./reviews.module.css";
import { ReviewForm } from "../review-form/ReviewForm";
import { ReviewListItem } from "../review-list-item/ReviewListItem";

export const Reviews = ({ reviews }) => {
  return (
    <section className={styles.reviews}>
      <h3 className={styles.title}>Отзывы</h3>
      {reviews?.length ? (
        <ul className={styles.list}>
          {reviews.map((review) => (
            <ReviewListItem key={review.id} {...review} />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>Отзывов пока нет</p>
      )}
      <ReviewForm />
    </section>
  );
};
