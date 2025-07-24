import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectAmountById,
} from "../../redux/entities/cart/slice";

export const useCount = ({ dishId } = {}) => {
  const dispatch = useDispatch();
  const amount = useSelector((state) => selectAmountById(state, dishId));

  const increment = useCallback(
    () => dispatch(addToCart(dishId)),
    [dispatch, dishId],
  );

  const decrement = useCallback(
    () => dispatch(removeFromCart(dishId)),
    [dispatch, dishId],
  );

  return {
    value: amount || 0,
    increment,
    decrement,
  };
};
