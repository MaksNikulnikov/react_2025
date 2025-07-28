import { useSelector } from "react-redux";
import { selectMultipleDishesById } from "../../redux/entities/dishes/slice";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartEntries = Object.entries(cart);

  const dishIds = Object.keys(cart);
  const dishes = useSelector((state) =>
    selectMultipleDishesById(state, dishIds),
  );

  if (cartEntries.length === 0) {
    return <div>no items</div>;
  }
  return (
    <div>
      {cartEntries.map(([id, amount]) => {
        const dish = dishes.find((d) => d.id === id);
        return (
          <div key={id}>
            {amount} – {dish?.name || "unknown dish"}
          </div>
        );
      })}
    </div>
  );
};
