import { useSelector } from "react-redux";
import { Restaurant } from "./Restaurant";
import { selectRestaurantById } from "../../redux/entities/restoraunts/slice";

export const RestaurantContainer = ({ restaurantId }) => {
  const restaurant = useSelector((state) =>
    selectRestaurantById(state, restaurantId),
  );

  if (!restaurant?.name) {
    return null;
  }

  return (
    <Restaurant
      key={restaurantId}
      name={restaurant.name}
      menuIds={restaurant.menu}
      reviewsIds={restaurant.reviews}
    ></Restaurant>
  );
};
