import { useParams, Outlet } from "react-router";
import styles from "./restaurant-page.module.css";
import { TabLink } from "../../components/tab-link/TabLink";

import { RestaurantPageSkeleton } from "./skeleton/restaurant-page.skeleton";
import { useGetRestaurantByIdQuery } from "../../redux/services/api";
import { StatusMessage } from "../../components/status-message/StatusMessage";

export const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const {
    data: restaurant,
    isLoading,
    isError,
  } = useGetRestaurantByIdQuery(restaurantId);

  if (isLoading) return <RestaurantPageSkeleton />;

  if (isError) {
    return (
      <section className={styles.restaurant}>
        <StatusMessage tone="error" title="Restaurant unavailable.">
          Return to the restaurant list and try another page.
        </StatusMessage>
      </section>
    );
  }

  return (
    <section className={styles.restaurant}>
      <h2>{restaurant.name}</h2>

      <nav className={styles.tabs}>
        <TabLink to="menu">Menu</TabLink>
        <TabLink to="reviews">Reviews</TabLink>
      </nav>

      <div className={styles.content}>
        <Outlet
          context={{
            menuIds: restaurant.menu,
            reviewsIds: restaurant.reviews,
          }}
        />
      </div>
    </section>
  );
};
