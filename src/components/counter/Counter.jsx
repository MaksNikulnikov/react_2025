import { useCounter } from "./hooks";
import styles from "./counter.module.css"

const LIMIT = { min: 0, max: 5 };

export const Counter = () => {
  const { count, increment, decrement } = useCounter(LIMIT);
  return (
    <div className={styles.counter}>
      <button className={styles.button} onClick={decrement}>-</button>
      <span className={styles.count}>{count}</span>
      <button className={styles.button} onClick={increment}>+</button>
    </div>
  );
};
