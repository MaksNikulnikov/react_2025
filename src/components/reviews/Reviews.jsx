import { Review } from "../review/Review";

export const Reviews = ({ reviews }) => {
  return (
    <>
      <h3>Отзывы</h3>
      {reviews?.length ? (
        <ul>
          {reviews.map((review) => (
            <Review key={review.id} {...review} />
          ))}
        </ul>
      ) : (
        <p>Отзывов пока нет</p>
      )}
    </>
  );
};
