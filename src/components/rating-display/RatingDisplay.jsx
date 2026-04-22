import styles from "./rating-display.module.css";

const normalizeRating = (value, max) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return 0;
  }

  return Math.min(max, Math.max(0, numericValue));
};

export const RatingDisplay = ({ value, max = 5 }) => {
  const rating = normalizeRating(value, max);
  const displayValue = Number.isInteger(rating) ? rating : rating.toFixed(1);

  return (
    <div
      className={styles.rating}
      aria-label={`Rating ${displayValue} out of ${max}`}
    >
      <span className={styles.label}>Rating</span>
      <span className={styles.value}>
        {displayValue}/{max}
      </span>
    </div>
  );
};
