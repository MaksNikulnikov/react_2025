import { RestaurantTab } from "./RestaurantTab";
import { useGetRestaurantByIdQuery } from "../../redux/services/api";
import { StatusMessage } from "../status-message/StatusMessage";

export const RestaurantsTabContainer = ({ restaurantId }) => {
  const {
    data: restaurant,
    isLoading,
    isError,
  } = useGetRestaurantByIdQuery(restaurantId);

  if (isLoading) {
    return (
      <StatusMessage as="span" tone="loading" compact title="Loading..." />
    );
  }

  if (isError) {
    return (
      <StatusMessage
        as="span"
        tone="error"
        compact
        title="Unavailable"
      />
    );
  }

  return <RestaurantTab restaurant={restaurant} />;
};
