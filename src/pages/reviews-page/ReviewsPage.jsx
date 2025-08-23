import { useParams } from "react-router";
import { useUser } from "../../components/user-context/use-user";
import styles from "./reviews-page.module.css";
import { ReviewForm } from "../../components/review-form/ReviewForm";
import { ReviewPageSkeleton } from "./skeleton/ReviewPage.skeleton";
import { useGetReviewsByRestaurantIdQuery } from "../../redux/services/api";
import { ReviewListItemContainer } from "../../components/review-list-item/ReviewListItem.container";

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

  if (isError || !reviews.length) {
    return <p className={styles.message}>Ревью отсутствует</p>;
  }

  return (
    <section className={styles.reviews}>
      <h3 className={styles.title}>Отзывы</h3>
      {reviews?.length ? (
        <ul className={styles.list}>
          {reviews.map((review) => (
            <ReviewListItemContainer key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>Отзывов пока нет</p>
      )}
      {isLogged && <ReviewForm />}
    </section>
  );
};
