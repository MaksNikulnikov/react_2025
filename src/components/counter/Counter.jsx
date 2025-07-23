import { useCounter } from "./hooks";
import styles from "./counter.module.css";
import { Button } from "../button/Button";

const LIMIT = { min: 0, max: 5 };

export const Counter = ({ isDisabled = false }) => {
  const { count, increment, decrement } = useCounter(LIMIT);
  return (
    <div className={styles.counter}>
      {!isDisabled && (
        <Button name={"-"} onClick={decrement} variant="smallButton"></Button>
      )}
      <span className={styles.count}>{count}</span>
      {!isDisabled && (
        <Button name={"+"} onClick={increment} variant="smallButton"></Button>
      )}
    </div>
  );
};
