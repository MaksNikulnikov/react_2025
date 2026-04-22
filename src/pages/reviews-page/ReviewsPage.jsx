import { useParams } from "react-router";
import { useUser } from "../../components/user-context/use-user";
import styles from "./reviews-page.module.css";
import { ReviewForm } from "../../components/review-form/ReviewForm";
import { ReviewPageSkeleton } from "./skeleton/ReviewPage.skeleton";
import {
  useGetReviewsByRestaurantIdQuery,
  useGetUsersQuery,
} from "../../redux/services/api";
import { ReviewListItem } from "../../components/review-list-item/ReviewListItem";
import { StatusMessage } from "../../components/status-message/StatusMessage";

export const ReviewsPage = () => {
  const { restaurantId } = useParams();
  const { isLogged, userId } = useUser();
  const {
    data: reviews = [],
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useGetReviewsByRestaurantIdQuery(restaurantId);
  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetUsersQuery();

  const usersById = Object.fromEntries(
    users.map((user) => [user.id, user]),
  );

  const ownReview = reviews.find((review) => review.userId === userId);

  if (isReviewsLoading || isUsersLoading) {
    return <ReviewPageSkeleton />;
  }

  return (
    <section className={styles.reviews}>
      <h3 className={styles.title}>Reviews</h3>
      {isUsersError ? (
        <StatusMessage
          className={styles.message}
          tone="neutral"
          title="Author profiles are unavailable."
        >
          Reviews are still shown, but some author names may be missing.
        </StatusMessage>
      ) : null}
      {isReviewsError ? (
        <StatusMessage
          className={styles.message}
          tone="error"
          title="Unable to load reviews."
        >
          Check the local API and try again.
        </StatusMessage>
      ) : reviews.length ? (
        <ul className={styles.list}>
          {reviews.map((review) => (
            <ReviewListItem
              key={review.id}
              review={review}
              user={usersById[review.userId]}
              isOwn={userId === review.userId}
            />
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
      {isLogged && !isReviewsError ? (
        ownReview ? (
          <StatusMessage
            className={styles.message}
            tone="neutral"
            title="You already reviewed this restaurant."
          >
            Use the Edit review button on your review card to update it.
          </StatusMessage>
        ) : (
          <ReviewForm />
        )
      ) : null}
    </section>
  );
};
