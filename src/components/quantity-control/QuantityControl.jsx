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
        <Button name="Sign in to add" color="Blue" disabled />
      </div>
    );
  }

  if (safeValue === 0) {
    return (
      <div className={styles.control}>
        <Button name="Add to cart" onClick={onIncrement} color="Blue" />
      </div>
    );
  }

  return (
    <div className={styles.control}>
      <Button
        name="-"
        onClick={onDecrement}
        variant="smallButton"
        ariaLabel="Decrease quantity"
      />
      <span className={styles.count}>{safeValue}</span>
      <Button
        name="+"
        onClick={onIncrement}
        variant="smallButton"
        ariaLabel="Increase quantity"
      />
    </div>
  );
};
