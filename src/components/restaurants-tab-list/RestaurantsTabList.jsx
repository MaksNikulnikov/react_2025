import { RestaurantTab } from "../restaurant-tab/RestaurantTab";
import { StatusMessage } from "../status-message/StatusMessage";
import styles from "./restaurants-tab-list.module.css";

export const RestaurantsTabList = ({ restaurants }) => {
  return (
    <>
      {restaurants.length ? (
        <nav className={styles.grid} aria-label="Restaurant list">
          {restaurants.map((restaurant) => (
            <RestaurantTab
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}
        </nav>
      ) : (
        <StatusMessage
          className={styles.message}
          tone="empty"
          title="No restaurants available yet."
        />
      )}
    </>
  );
};
