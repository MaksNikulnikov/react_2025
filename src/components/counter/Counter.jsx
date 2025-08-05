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
    return <DefaultCounter isDisabled={isDisabled} initial={value} max={100}/>;
  }
  return (
    <div className={styles.counter}>
      {!isDisabled && (
        <>
          <Button name={"-"} onClick={decrement} variant="smallButton"></Button>
          <span className={styles.count}>{value}</span>
          <Button name={"+"} onClick={increment} variant="smallButton"></Button>
        </>
      )}
    </div>
  );
};
