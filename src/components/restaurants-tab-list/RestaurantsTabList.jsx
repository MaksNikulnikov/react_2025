import { RestaurantTabContainer } from "../restaurant-tab/RestaurantTab.container";
import { StatusMessage } from "../status-message/StatusMessage";
import styles from "./restaurants-tab-list.module.css";

export const RestaurantsTabList = ({ restaurantsIds }) => {
  return (
    <>
      {restaurantsIds.length ? (
        <nav className={styles.nav}>
          {restaurantsIds.map((restaurantId) => (
            <RestaurantTabContainer
              key={restaurantId}
              restaurantId={restaurantId}
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
