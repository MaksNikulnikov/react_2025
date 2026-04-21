import { useState } from "react";
import { useForm } from "./useForm";
import styles from "./review-form.module.css";
import { Button } from "../button/Button";
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "../../redux/services/api";
import { useParams } from "react-router";
import { useUser } from "../user-context/use-user";
import { StatusMessage } from "../status-message/StatusMessage";

export const ReviewForm = ({ reviewData, handleUpdate }) => {
  const isNewReview = !reviewData;
  const { restaurantId } = useParams();
  const { userId, userName } = useUser();
  const { form, setReview, setRating, clear } = useForm(reviewData);
  const { review, rating } = form;
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [submitError, setSubmitError] = useState("");

  const getErrorMessage = (error, fallbackMessage) =>
    error?.data?.message || fallbackMessage;

  const handleClear = () => {
    setSubmitError("");
    clear();
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!userId) {
      setSubmitError("Choose a demo user before leaving a review.");
      return;
    }

    try {
      await createReview({
        restaurantId,
        body: { userId, text: review, rating: Number(rating) },
      }).unwrap();
      clear();
    } catch (err) {
      setSubmitError(
        getErrorMessage(err, "Unable to submit the review right now."),
      );
    }
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      await updateReview({
        reviewId: reviewData.id,
        body: { text: review, rating: Number(rating) },
      }).unwrap();
      handleUpdate();
    } catch (err) {
      setSubmitError(
        getErrorMessage(err, "Unable to update the review right now."),
      );
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={isNewReview ? handleCreateReview : handleUpdateReview}
    >
      {isNewReview ? (
        <p className={styles.hint}>Posting as {userName}</p>
      ) : null}

      {submitError ? (
        <StatusMessage tone="error" compact title={submitError} />
      ) : null}

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
        <Button onClick={handleClear} name="Clear" />
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
