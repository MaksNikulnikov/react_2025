import { useSelector } from "react-redux";
import { CartItemContainer } from "../cart-item/CartItem.container";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartEntries = Object.entries(cart);

  if (cartEntries.length === 0) {
    return <div>no items</div>;
  }

  return (
    <div>
      {cartEntries.map(([id, amount]) => (
        <CartItemContainer key={id} id={id} amount={amount} />
      ))}
    </div>
  );
};
