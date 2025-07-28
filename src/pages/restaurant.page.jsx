import { useParams } from "react-router";
import { RestaurantContainer } from "../components/restaurant/Restaurant.container";

export const RestaurantPage = () => {
  const { restaurantId } = useParams();
console.log('restaurantPage', restaurantId)
  if (!restaurantId) {
    return null;
  }

  return <RestaurantContainer restaurantId={restaurantId} />;
};
