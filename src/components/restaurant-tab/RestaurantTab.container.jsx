import { RestaurantTab } from "./RestaurantTab";
import { useGetRestaurantByIdQuery } from "../../redux/services/api";

export const RestaurantsTabContainer = ({ restaurantId }) => {
  const {
    data: restaurant,
    isLoading,
    isError,
  } = useGetRestaurantByIdQuery(restaurantId);

  if (isLoading) return "...Loading";

  if (isError) return null;
  return <RestaurantTab restaurant={restaurant} />;
};
