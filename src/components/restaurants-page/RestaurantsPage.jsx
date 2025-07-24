import { useState } from "react";
import styles from "./restaurant-page.module.css";
import { RestaurantContainer } from "../restaurant/Restaurant.container";
import { RestaurantsTabListContainer } from "../restaurants-tab-list/RestaurantsTabList.container";

export const RestaurantsPage = ({ restaurantsIds }) => {
  const [activeRestaurantId, setActiveRestaurantId] = useState(
    restaurantsIds[0],
  );
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Рестораны</h1>
      <RestaurantsTabListContainer
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
