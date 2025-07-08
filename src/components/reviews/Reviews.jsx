import React from "react";
import Review from "../review/Review";

export default function Reviews({ reviews }) {
  return (
    <>
      <h3>Отзывы</h3>
      <ul>
        {reviews.map((review) => (
          <Review key={review.id} {...review} />
        ))}
      </ul>
    </>
  );
}
