import { Restaurant } from "../restaurant/Restaurant";
import { useState } from "react";
import { RestaurantsTabList } from "../restaurants-tab-list/RestaurantsTabList";
import { getValidRestaurants } from "./utils";
import styles from "./restaurant-page.module.css";

export const RestaurantsPage = ({ restaurants }) => {
  const { validRestaurants, isEmpty, firstId, getById } =
    getValidRestaurants(restaurants);
  const [activeRestaurantId, setActiveRestaurantId] = useState(firstId);

  if (isEmpty) {
    return <p>Рестораны отсутствуют</p>;
  }

  const activeRestaurant = getById(activeRestaurantId);
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Рестораны</h1>
      <RestaurantsTabList
        setActiveId={setActiveRestaurantId}
        restaurants={validRestaurants}
        activeRestaurantId={activeRestaurantId}
      />
      {activeRestaurant ? (
        <Restaurant {...activeRestaurant} />
      ) : (
        <p className={styles.message}>Выберите ресторан</p>
      )}
    </div>
  );
};
