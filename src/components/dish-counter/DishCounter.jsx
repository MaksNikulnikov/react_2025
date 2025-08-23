import { Counter } from "../counter/Counter";
import { useCounter } from "./use-counter";

export const DishCounter = ({ dishId, isDisabled }) => {
  const { value, increment, decrement } = useCounter(dishId);
  return (
    <Counter
      isDisabled={isDisabled}
      value={value}
      increment={increment}
      decrement={decrement}
    />
  );
};
