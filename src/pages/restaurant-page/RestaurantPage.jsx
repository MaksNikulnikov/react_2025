import { useParams, Outlet } from "react-router";
import styles from "./restaurant-page.module.css";
import { TabLink } from "../../components/tab-link/TabLink";

import { RestaurantPageSkeleton } from "./skeleton/restaurant-page.skeleton";
import { useGetRestaurantByIdQuery } from "../../redux/services/api";

export const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const {
    data: restaurant,
    isLoading,
    isError,
  } = useGetRestaurantByIdQuery(restaurantId);

  if (isLoading) return <RestaurantPageSkeleton />;

  if (isError) return null;

  return (
    <section className={styles.restaurant}>
      <h2>{restaurant.name}</h2>

      <nav className={styles.tabs}>
        <TabLink to="menu">Меню</TabLink>
        <TabLink to="reviews">Отзывы</TabLink>
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
