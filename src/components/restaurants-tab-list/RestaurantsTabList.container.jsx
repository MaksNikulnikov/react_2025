import { RestaurantsTabList } from "./RestaurantsTabList";

export const RestaurantsTabListContainer = ({
  restaurantsIds,
  setActiveId,
  activeRestaurantId,
}) => {
  return (
    <RestaurantsTabList
      activeRestaurantId={activeRestaurantId}
      restaurantsIds={restaurantsIds}
      setActiveId={setActiveId}
    />
  );
};
