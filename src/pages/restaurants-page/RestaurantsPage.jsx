import styles from "./restaurant-page.module.css";
import { RestaurantsTabList } from "../../components/restaurants-tab-list/RestaurantsTabList";
import { useSelector } from "react-redux";
import { selectRestaurantsIds } from "../../redux/entities/restoraunts/slice";

export const RestaurantsPage = () => {
  const restaurantsIds = useSelector(selectRestaurantsIds);
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Рестораны</h1>
      <RestaurantsTabList restaurantsIds={restaurantsIds} />
    </div>
  );
};
