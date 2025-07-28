import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectAmountById,
} from "../../redux/entities/cart/slice";

export const useCounter = (dishId) => {
  const dispatch = useDispatch();
  const amount = useSelector((state) => selectAmountById(state, dishId));
  const incrementHandler = () => {
    dispatch(addToCart(dishId));
  };
  const decrementHandler = () => dispatch(removeFromCart(dishId));

  return {
    value: amount || 0,
    increment: incrementHandler,
    decrement: decrementHandler,
  };
};
