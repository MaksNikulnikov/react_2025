import { useForm } from "./useForm";
import styles from "./review-form.module.css";
import { Button } from "../button/Button";
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "../../redux/services/api";
import { useParams } from "react-router";

export const ReviewForm = ({ reviewData, handleUpdate }) => {
  const isNewReview = !reviewData;
  const { restaurantId } = useParams();
  const { form, setName, setReview, setRating, clear } = useForm(reviewData);
  const { name, review, rating } = form;
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        restaurantId,
        body: { user: name, text: review, rating: Number(rating) },
      }).unwrap();
      clear();
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      await updateReview({
        reviewId: reviewData.id,
        body: { text: review, rating: Number(rating) },
      }).unwrap();
      clear();
      handleUpdate();
    } catch (err) {
      console.error("Failed to update review:", err);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={isNewReview ? handleCreateReview : handleUpdateReview}
    >
      {isNewReview && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.input}
            id="name"
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={setName}
          />
        </div>
      )}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="review">
          Review
        </label>
        <textarea
          className={styles.textarea}
          id="review"
          value={review}
          placeholder="Share your impression"
          onChange={setReview}
        ></textarea>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="rating">
          Rating
        </label>
        <select
          className={styles.select}
          id="rating"
          value={rating}
          onChange={setRating}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n.toString()}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.actions}>
        <Button onClick={clear} name="Clear" />
        {isNewReview ? (
          <Button
            type="submit"
            color="Blue"
            name={isLoading ? "Submitting..." : "Submit review"}
          />
        ) : (
          <Button
            type="submit"
            color="Blue"
            name={isUpdating ? "Updating..." : "Update review"}
          />
        )}
      </div>
    </form>
  );
};
