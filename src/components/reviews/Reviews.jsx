import { ReviewForm } from "../review-form/ReviewForm";
import { ReviewListItem } from "../review-list-item/ReviewListItem";

export const Reviews = ({ reviews }) => {
  return (
    <>
      <h3>Отзывы</h3>
      {reviews?.length ? (
        <ul>
          {reviews.map((review) => (
            <ReviewListItem key={review.id} {...review} />
          ))}
        </ul>
      ) : (
        <p>Отзывов пока нет</p>
      )}
      <ReviewForm />
    </>
  );
};
