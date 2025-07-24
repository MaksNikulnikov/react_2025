import styles from "./reviews.module.css";
import { ReviewForm } from "../review-form/ReviewForm";
import { ReviewListItem } from "../review-list-item/ReviewListItem";
import { useUser } from "../user-context/use-user";
import { ReviewListItemContainer } from "../review-list-item/ReviewListItem.container";

export const Reviews = ({ reviewsIds }) => {
  const { isLogged } = useUser();
  return (
    <section className={styles.reviews}>
      <h3 className={styles.title}>Отзывы</h3>
      {reviewsIds?.length ? (
        <ul className={styles.list}>
          {reviewsIds.map((reviewId) => (
            <ReviewListItemContainer key={reviewId} reviewId={reviewId} />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>Отзывов пока нет</p>
      )}
      {isLogged && <ReviewForm />}
    </section>
  );
};
