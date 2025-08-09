import styles from "./restaurant-page.module.css";
import { RestaurantsTabList } from "../../components/restaurants-tab-list/RestaurantsTabList";
import { RestaurantsPageSkeleton } from "./skeleton/RestaurantsPage.skeleton";
import { useGetRestaurantsQuery } from "../../redux/services/api";

export const RestaurantsPage = () => {
  const {data, isLoading, isError} = useGetRestaurantsQuery()

  console.log('data', data)

  if (isLoading) 
    return <RestaurantsPageSkeleton/>
  if (isError)
    return null
  const restaurantsIds = data.map(entity=> entity.id)
  console.log('restaurantsIsd', restaurantsIds)
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Рестораны</h1>
      <RestaurantsTabList restaurantsIds={restaurantsIds} />
    </div>
  );
};
