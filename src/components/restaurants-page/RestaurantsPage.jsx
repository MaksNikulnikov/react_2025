import { Restaurant } from "../restaurant/Restaurant";
import { useState } from "react";
import { RestaurantsTabList } from "../restaurants-tab-list/RestaurantsTabList";
import { getValidRestaurants } from "./utils";

export const RestaurantsPage = ({ restaurants }) => {
  const { validRestaurants, isEmpty, firstId, getById } =
    getValidRestaurants(restaurants);
  const [activeId, setActiveId] = useState(firstId);

  if (isEmpty) {
    return <p>Рестораны отсутствуют</p>;
  }

  const activeRestaurant = getById(activeId);
  return (
    <>
      <h1>Рестораны</h1>
      <RestaurantsTabList
        setActiveId={setActiveId}
        restaurants={validRestaurants}
      ></RestaurantsTabList>
      {activeRestaurant ? (
        <Restaurant {...activeRestaurant} />
      ) : (
        <p>Выберите ресторан</p>
      )}
    </>
  );
};
