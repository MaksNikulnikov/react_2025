import { QuantityControl } from "../quantity-control/QuantityControl";
import { useCounter } from "./use-counter";

export const DishCounter = ({ dishId, isDisabled }) => {
  const { value, increment, decrement } = useCounter(dishId);
  return (
    <QuantityControl
      isDisabled={isDisabled}
      value={value}
      onIncrement={increment}
      onDecrement={decrement}
    />
  );
};
