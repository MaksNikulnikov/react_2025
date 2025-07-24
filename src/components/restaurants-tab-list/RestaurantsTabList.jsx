import { RestaurantTab } from "../restaurant-tab/RestaurantTab";
import { RestaurantsTabContainer } from "../restaurant-tab/RestaurantTab.container";
import styles from "./restaurants-tab-list.module.css";

export const RestaurantsTabList = ({
  restaurantsIds,
  setActiveId,
  activeRestaurantId,
}) => {
  return (
    <>
      {restaurantsIds.length ? (
        <nav className={styles.nav}>
          {restaurantsIds.map((restaurantId) => (
            <RestaurantsTabContainer
              key={restaurantId}
              restaurantId={restaurantId}
              setActiveId={setActiveId}
              isActive={restaurantId === activeRestaurantId}
            />
          ))}
        </nav>
      ) : (
        <p className={styles.message}>Рестораны отсутствуют</p>
      )}
    </>
  );
};
