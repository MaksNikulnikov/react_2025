import styles from "./counter.module.css";
import { Button } from "../button/Button";
import { DefaultCounter } from "../default-counter/DefaultCounter";

export const Counter = ({
  isDisabled = false,
  value,
  increment,
  decrement,
}) => {
  if (!increment || !decrement) {
    return <DefaultCounter isDisabled={isDisabled} initial={value} max={100} />;
  }

  if (isDisabled) {
    return (
      <div className={styles.counter}>
        <Button name="Sign in to add" color="Blue" disabled />
      </div>
    );
  }

  if (value === 0) {
    return (
      <div className={styles.counter}>
        <Button
          name="Add to cart"
          onClick={increment}
          color="Blue"
        />
      </div>
    );
  }

  return (
    <div className={styles.counter}>
      <Button name={"-"} onClick={decrement} variant="smallButton"></Button>
      <span className={styles.count}>{value}</span>
      <Button name={"+"} onClick={increment} variant="smallButton"></Button>
    </div>
  );
};
