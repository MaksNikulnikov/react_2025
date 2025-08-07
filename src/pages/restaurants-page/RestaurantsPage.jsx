import styles from "./restaurant-page.module.css";
import { RestaurantsTabList } from "../../components/restaurants-tab-list/RestaurantsTabList";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestStatus, selectRestaurantsIds } from "../../redux/entities/restaurants/slice";
import { useEffect } from "react";
import { getRestaurants } from "../../redux/entities/restaurants/get-restaurants";
import { REQUEST_STATUS } from "../../redux/constants";
import { RestaurantsPageSkeleton } from "./skeleton/RestaurantsPage.skeleton";

export const RestaurantsPage = () => {
  const dispatch = useDispatch();
  const restaurantsIds = useSelector(selectRestaurantsIds);
  const requestStatus = useSelector(selectRequestStatus);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  if (requestStatus === REQUEST_STATUS.IDLE || requestStatus === REQUEST_STATUS.PENDING) 
    return <RestaurantsPageSkeleton/>
  if (!restaurantsIds.length)
    return null

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Рестораны</h1>
      <RestaurantsTabList restaurantsIds={restaurantsIds} />
    </div>
  );
};
