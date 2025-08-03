import { useSelector } from "react-redux";
import { selectRestaurantById } from "../../redux/entities/restaurants/slice";
import { RestaurantTab } from "./RestaurantTab";

export const RestaurantsTabContainer = ({
  restaurantId,
}) => {
  const restaurant = useSelector((state) =>
    selectRestaurantById(state, restaurantId),
  );

  return (
    <RestaurantTab
      restaurant={restaurant}
    />
  );
};
