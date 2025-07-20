import { Button } from "../button/Button";

export const RestaurantTab = ({ restaurant, setActiveId, isActive }) => {
  const { id, name } = restaurant;
  return (
    <Button
      name={name ?? "placeholder"}
      onClick={() => setActiveId(id)}
      isActive={isActive}
    ></Button>
  );
};
