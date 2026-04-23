import { Button } from "../button/Button";
import styles from "./quantity-control.module.css";

export const QuantityControl = ({
  isDisabled = false,
  value = 0,
  onIncrement,
  onDecrement,
}) => {
  const safeValue = Math.max(0, Number(value) || 0);

  if (isDisabled) {
    return (
      <div className={styles.control}>
        <Button color="Blue" disabled>
          Sign in to add
        </Button>
      </div>
    );
  }

  if (safeValue === 0) {
    return (
      <div className={styles.control}>
        <Button onClick={onIncrement} color="Blue">
          Add to cart
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.control}>
      <Button
        onClick={onDecrement}
        variant="smallButton"
        aria-label="Decrease quantity"
      >
        -
      </Button>
      <span className={styles.count}>{safeValue}</span>
      <Button
        onClick={onIncrement}
        variant="smallButton"
        aria-label="Increase quantity"
      >
        +
      </Button>
    </div>
  );
};
