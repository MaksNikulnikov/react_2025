import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/entities/cart/slice";

export const Cart = () => {
  const items = useSelector(selectCartItems);

  if (!items.length) {
    return <div>no items</div>;
  }
  return (
    <div>
      {items.map(({ id, amount }) => (
        <div key={id}>
          {amount} - {id}
        </div>
      ))}
    </div>
  );
};
