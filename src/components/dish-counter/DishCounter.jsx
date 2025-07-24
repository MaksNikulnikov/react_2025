import { Counter } from "../counter/counter";
import { useCount } from "./use-counter";

export const DishCounter = ({ dishId }) => {
  const { value, increment, decrement } = useCount({ dishId });

  return <Counter value={value} increment={increment} decrement={decrement} />;
};
