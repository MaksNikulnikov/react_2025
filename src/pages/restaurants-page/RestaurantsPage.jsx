import styles from "./restaurant-page.module.css";
import { RestaurantsTabList } from "../../components/restaurants-tab-list/RestaurantsTabList";
import { RestaurantsPageSkeleton } from "./skeleton/RestaurantsPage.skeleton";
import { useGetRestaurantsQuery } from "../../redux/services/api";
import { StatusMessage } from "../../components/status-message/StatusMessage";

export const RestaurantsPage = () => {
  const { data, isLoading, isError } = useGetRestaurantsQuery();

  if (isLoading) return <RestaurantsPageSkeleton />;

  if (isError) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Restaurants</h1>
        <StatusMessage tone="error" title="Unable to load restaurants.">
          Check whether the local API server is running and try again.
        </StatusMessage>
      </div>
    );
  }

  const restaurantsIds = data.map((entity) => entity.id);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Restaurants</h1>
      <RestaurantsTabList restaurantsIds={restaurantsIds} />
    </div>
  );
};
