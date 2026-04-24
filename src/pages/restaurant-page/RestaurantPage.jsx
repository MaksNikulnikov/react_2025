import { useLocation, useParams, Outlet } from "react-router";
import { useSelector } from "react-redux";
import styles from "./restaurant-page.module.css";
import { TabLink } from "../../components/tab-link/TabLink";

import { RestaurantPageSkeleton } from "./skeleton/restaurant-page.skeleton";
import { api, useGetRestaurantByIdQuery } from "../../redux/services/api";
import { StatusMessage } from "../../components/status-message/StatusMessage";
import { MenuPageSkeleton } from "../menu-page/skeleton/MenuPage.skeleton";
import { ReviewPageSkeleton } from "../reviews-page/skeleton/ReviewPage.skeleton";

const selectRestaurantsResult = api.endpoints.getRestaurants.select();

export const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const { pathname } = useLocation();
  const restaurantPreview = useSelector((state) =>
    selectRestaurantsResult(state)?.data?.find(
      (restaurant) => restaurant.id === restaurantId,
    ),
  );
  const {
    data: restaurant,
    isLoading,
    isError,
  } = useGetRestaurantByIdQuery(restaurantId);

  const restaurantShell = restaurant || restaurantPreview;
  const isReviewRoute = pathname.endsWith("/reviews");
  const childSkeleton = isReviewRoute ? (
    <ReviewPageSkeleton />
  ) : (
    <MenuPageSkeleton
      showHeading
      rowCount={restaurantShell?.menu?.length}
    />
  );

  if (!restaurantShell && isLoading) {
    return (
      <RestaurantPageSkeleton>
        {childSkeleton}
      </RestaurantPageSkeleton>
    );
  }

  if (isError && !restaurantShell) {
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
      <h2>{restaurantShell?.name}</h2>

      <nav className={styles.tabs}>
        <TabLink to="menu">Menu</TabLink>
        <TabLink to="reviews">Reviews</TabLink>
      </nav>

      <div className={styles.content}>
        {restaurant ? <Outlet context={restaurant} /> : childSkeleton}
      </div>
    </section>
  );
};
