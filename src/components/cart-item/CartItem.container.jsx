import { useGetDishByIdQuery } from "../../redux/services/api";
import { CartItem } from "../cart-item/CartItem";

export const CartItemContainer = ({ id, amount }) => {
  const { data: dish, isLoading } = useGetDishByIdQuery(id);
  return <CartItem dish={dish} amount={amount} isLoading={isLoading} />;
};
