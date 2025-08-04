import { useOutletContext } from "react-router";
import { useUser } from "../../components/user-context/use-user";
import styles from "./reviews-page.module.css";
import { ReviewListItemContainer } from "../../components/review-list-item/ReviewListItem.container";
import { ReviewForm } from "../../components/review-form/ReviewForm";

export const ReviewsPage = () => {
  const { isLogged } = useUser();
  const { reviewsIds } = useOutletContext();
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
