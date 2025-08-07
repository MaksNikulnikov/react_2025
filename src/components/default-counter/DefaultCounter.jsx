import { useCounter } from "./hooks";
import styles from "./default-counter.module.css";
import { Button } from "../button/Button";

export const DefaultCounter = ({
  isDisabled = false,
  initial = 0,
  min = 0,
  max = 5,
}) => {
  const { count, increment, decrement } = useCounter({ min, max, initial });
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
