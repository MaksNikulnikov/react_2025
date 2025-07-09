import { RestaurantTab } from "../restaurant-tab/RestaurantTab";

export const RestaurantsTabList = ({ restaurants, setActiveId }) => {
  return (
    <>
      {restaurants.length ? (
        <nav>
          {restaurants.map((restaurant) => (
            <RestaurantTab
              key={restaurant.id}
              restaurant={restaurant}
              setActiveId={setActiveId}
            ></RestaurantTab>
          ))}
        </nav>
      ) : (
        <p>Рестораны отсутствуют</p>
      )}
    </>
  );
};
