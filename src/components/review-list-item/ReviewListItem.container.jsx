import { useSelector } from "react-redux";
import { selectReviewById } from "../../redux/entities/reviews/slice";
import { ReviewListItem } from "./ReviewListItem";

export const ReviewListItemContainer = ({ reviewId }) => {
  const review = useSelector((state) => selectReviewById(state, reviewId));
  return <ReviewListItem review={review} />;
};
