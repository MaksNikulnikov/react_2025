import { useOutletContext, useParams } from "react-router";
import { useUser } from "../../components/user-context/use-user";
import styles from "./reviews-page.module.css";
import { ReviewListItemContainer } from "../../components/review-list-item/ReviewListItem.container";
import { ReviewForm } from "../../components/review-form/ReviewForm";
import { useDispatch, useSelector } from "react-redux";
import { selectReviewsRequestStatus } from "../../redux/entities/reviews/slice";
import { useEffect } from "react";
import { getReviews } from "../../redux/entities/reviews/get-reviews";
import { REQUEST_STATUS } from "../../redux/constants";
import { ReviewPageSkeleton } from "./skeleton/ReviewPage.skeleton";

export const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const { isLogged } = useUser();
  const { reviewsIds } = useOutletContext();

  const requestStatus = useSelector((state) =>
    selectReviewsRequestStatus(state, restaurantId)
  );

  useEffect(() => {
    if (restaurantId) {
      dispatch(getReviews(restaurantId));
    }
  }, [dispatch, restaurantId]);

  if (
    requestStatus === REQUEST_STATUS.IDLE ||
    requestStatus === REQUEST_STATUS.PENDING
  ) {
    return <ReviewPageSkeleton />;
  }

  if (!reviewsIds?.length) {
    return <p className={styles.message}>Ревью отсутствует</p>;
  }

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
