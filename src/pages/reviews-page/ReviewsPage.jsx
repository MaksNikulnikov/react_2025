import { useOutletContext } from "react-router";
import { Reviews } from "../../components/reviews/Reviews";

export const ReviewsPage = () => {
  const { reviewsIds } = useOutletContext();
  return <Reviews reviewsIds={reviewsIds} />;
};
