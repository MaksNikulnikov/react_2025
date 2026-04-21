import { useParams } from "react-router";
import { useUser } from "../../components/user-context/use-user";
import styles from "./reviews-page.module.css";
import { ReviewForm } from "../../components/review-form/ReviewForm";
import { ReviewPageSkeleton } from "./skeleton/ReviewPage.skeleton";
import { useGetReviewsByRestaurantIdQuery } from "../../redux/services/api";
import { ReviewListItemContainer } from "../../components/review-list-item/ReviewListItem.container";
import { StatusMessage } from "../../components/status-message/StatusMessage";

export const ReviewsPage = () => {
  const { restaurantId } = useParams();
  const { isLogged } = useUser();
  const {
    data: reviews,
    isLoading,
    isError,
  } = useGetReviewsByRestaurantIdQuery(restaurantId);

  if (isLoading) {
    return <ReviewPageSkeleton />;
  }

  return (
    <section className={styles.reviews}>
      <h3 className={styles.title}>Reviews</h3>
      {isError ? (
        <StatusMessage
          className={styles.message}
          tone="error"
          title="Unable to load reviews."
        >
          Check the local API and try again.
        </StatusMessage>
      ) : reviews?.length ? (
        <ul className={styles.list}>
          {reviews.map((review) => (
            <ReviewListItemContainer key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <StatusMessage
          className={styles.message}
          tone="empty"
          title="No reviews yet."
        >
          Be the first to share an impression.
        </StatusMessage>
      )}
      {isLogged && <ReviewForm />}
    </section>
  );
};
