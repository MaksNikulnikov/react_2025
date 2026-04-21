import { useGetDishByIdQuery } from "../../redux/services/api";
import { CartItem } from "../cart-item/CartItem";
import { StatusMessage } from "../status-message/StatusMessage";

export const CartItemContainer = ({ id, amount }) => {
  const { data: dish, isLoading, isError } = useGetDishByIdQuery(id);

  if (isLoading) {
    return (
      <StatusMessage tone="loading" compact title="Loading cart item..." />
    );
  }

  if (isError || !dish) {
    return (
      <StatusMessage tone="error" compact title="Cart item unavailable.">
        Remove the missing dish by changing the local data or resetting the cart.
      </StatusMessage>
    );
  }

  return <CartItem dish={dish} amount={amount} />;
};
