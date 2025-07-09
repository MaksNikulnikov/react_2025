import { Restaurant } from "../restaurant/Restaurant";

export const RestaurantsList = ({ restaurants }) => {
  return (
    <>
      {restaurants.length ? (
        <ul>
          {restaurants.map((restaurant) => {
            return <Restaurant key={restaurant.id} {...restaurant} />;
          })}
        </ul>
      ) : (
        <p>Рестораны не найдены</p>
      )}
    </>
  );
};
