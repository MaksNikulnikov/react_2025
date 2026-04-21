import { useSelector } from "react-redux";
import { CartItemContainer } from "../cart-item/CartItem.container";
import { StatusMessage } from "../status-message/StatusMessage";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartEntries = Object.entries(cart);

  if (cartEntries.length === 0) {
    return (
      <StatusMessage tone="empty" title="Your cart is empty.">
        Add dishes from the menu to see them here.
      </StatusMessage>
    );
  }

  return (
    <div>
      {cartEntries.map(([id, amount]) => (
        <CartItemContainer key={id} id={id} amount={amount} />
      ))}
    </div>
  );
};
