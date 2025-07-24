import { useSelector } from "react-redux";
import { selectRestaurantById } from "../../redux/entities/restoraunts/slice";
import { RestaurantTab } from "./RestaurantTab";

export const RestaurantsTabContainer = ({
  restaurantId,
  setActiveId,
  isActive,
}) => {
  const restaurant = useSelector((state) =>
    selectRestaurantById(state, restaurantId),
  );

  return (
    <RestaurantTab
      isActive={isActive}
      restaurant={restaurant}
      setActiveId={setActiveId}
    />
  );
};
