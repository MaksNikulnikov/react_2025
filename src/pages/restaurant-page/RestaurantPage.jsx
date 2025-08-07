import { useParams, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestStatusById, selectRestaurantById } from "../../redux/entities/restaurants/slice";
import styles from "./restaurant-page.module.css";
import { TabLink } from "../../components/tab-link/TabLink";
import { useEffect } from "react";
import { getRestaurant } from "../../redux/entities/restaurants/get-restaurant";
import { REQUEST_STATUS } from "../../redux/constants";
import { RestaurantPageSkeleton } from "./skeleton/restaurant-page.skeleton";

export const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();

  const restaurant = useSelector((state) =>
    selectRestaurantById(state, restaurantId)
  );

  const requestStatus = useSelector((state) =>selectRequestStatusById(state, restaurantId));

  useEffect(() => {
    dispatch(getRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  if (requestStatus === REQUEST_STATUS.IDLE || requestStatus === REQUEST_STATUS.PENDING) 
    return <RestaurantPageSkeleton/>
  if (!restaurant)
    return null

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
