import styles from "./reviews.module.css";
import { ReviewForm } from "../review-form/ReviewForm";
import { ReviewListItem } from "../review-list-item/ReviewListItem";
import { useUser } from "../user-context/use-user";

export const Reviews = ({ reviews }) => {
  const { isLogged } = useUser();
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
      {isLogged && <ReviewForm />}
    </section>
  );
};
