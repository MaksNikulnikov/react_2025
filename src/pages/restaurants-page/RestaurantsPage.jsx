import { useState } from "react";
import styles from "./restaurant-page.module.css";
import { RestaurantsTabList } from "../../components/restaurants-tab-list/RestaurantsTabList";
import { RestaurantsPageSkeleton } from "./skeleton/RestaurantsPage.skeleton";
import { useGetRestaurantsQuery } from "../../redux/services/api";
import { StatusMessage } from "../../components/status-message/StatusMessage";

export const RestaurantsPage = () => {
  const { data = [], isLoading, isError } = useGetRestaurantsQuery();
  const [selectedCuisine, setSelectedCuisine] = useState("");

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

  const cuisineOptions = [...new Set(data.map((restaurant) => restaurant.description))];
  const visibleRestaurants = selectedCuisine
    ? data.filter((restaurant) => restaurant.description === selectedCuisine)
    : data;
  const sortedRestaurants = [...visibleRestaurants].sort((left, right) => {
    const reviewDifference = right.reviews.length - left.reviews.length;

    if (reviewDifference !== 0) {
      return reviewDifference;
    }

    return left.name.localeCompare(right.name);
  });

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Decision-first browse</p>
          <h1 className={styles.title}>Choose a restaurant faster</h1>
          <p className={styles.lead}>
            Compare cuisine, menu size, and review volume before you open a restaurant page.
          </p>
        </div>

        <div className={styles.filters}>
          <label className={styles.filterLabel} htmlFor="cuisine-filter">
            Cuisine
          </label>
          <select
            id="cuisine-filter"
            className={styles.filterSelect}
            value={selectedCuisine}
            onChange={(event) => setSelectedCuisine(event.target.value)}
          >
            <option value="">All cuisines</option>
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>
      </section>

      <RestaurantsTabList restaurants={sortedRestaurants} />
    </div>
  );
};
