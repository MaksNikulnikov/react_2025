import { useCounter } from "./hooks";

const LIMIT = { min: 0, max: 5 };

export const Counter = () => {
  const { count, increment, decrement } = useCounter(LIMIT);
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};
