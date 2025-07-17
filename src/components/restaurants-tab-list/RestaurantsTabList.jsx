import { RestaurantTab } from "../restaurant-tab/RestaurantTab";
import styles from "./restaurants-tab-list.module.css";

export const RestaurantsTabList = ({
  restaurants,
  setActiveId,
  activeRestaurantId,
}) => {
  return (
    <>
      {restaurants.length ? (
        <nav className={styles.nav}>
          {restaurants.map((restaurant) => (
            <RestaurantTab
              key={restaurant.id}
              restaurant={restaurant}
              setActiveId={setActiveId}
              isActive={restaurant.id === activeRestaurantId}
            />
          ))}
        </nav>
      ) : (
        <p className={styles.message}>Рестораны отсутствуют</p>
      )}
    </>
  );
};
