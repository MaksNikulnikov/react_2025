import { useState } from "react";
import styles from "./restaurant-page.module.css";
import { RestaurantContainer } from "../restaurant/Restaurant.container";
import { RestaurantsTabList } from "../restaurants-tab-list/RestaurantsTabList";

export const RestaurantsPage = ({ restaurantsIds }) => {
  const [activeRestaurantId, setActiveRestaurantId] = useState(
    restaurantsIds[0],
  );
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Рестораны</h1>
      <RestaurantsTabList
        setActiveId={setActiveRestaurantId}
        restaurantsIds={restaurantsIds}
        activeRestaurantId={activeRestaurantId}
      />
      {activeRestaurantId ? (
        <RestaurantContainer restaurantId={activeRestaurantId} />
      ) : (
        <p className={styles.message}>Выберите ресторан</p>
      )}
    </div>
  );
};
