import { Restaurant } from "../restaurant/Restaurant";
import { useState } from "react";
import { RestaurantsTabList } from "../restaurants-tab-list/RestaurantsTabList";
import { getValidRestaurants } from "./utils";

export const RestaurantsPage = ({ restaurants }) => {
  const { validRestaurants, isEmpty, firstId, getById } =
    getValidRestaurants(restaurants);
  const [activeRestaurantId, setActiveRestaurantId] = useState(firstId);

  if (isEmpty) {
    return <p>Рестораны отсутствуют</p>;
  }

  const activeRestaurant = getById(activeRestaurantId);
  return (
    <>
      <h1>Рестораны</h1>
      <RestaurantsTabList
        setActiveId={setActiveRestaurantId}
        restaurants={validRestaurants}
      />
      {activeRestaurant ? (
        <Restaurant {...activeRestaurant} />
      ) : (
        <p>Выберите ресторан</p>
      )}
    </>
  );
};
