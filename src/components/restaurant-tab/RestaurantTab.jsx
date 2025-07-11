export const RestaurantTab = ({ restaurant, setActiveId }) => {
  const { id, name } = restaurant;
  return (
    <button onClick={() => setActiveId(id)}>{name ?? "placeholder"}</button>
  );
};
