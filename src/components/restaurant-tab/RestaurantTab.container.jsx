import { RestaurantTab } from "./RestaurantTab";
import { useGetRestaurantByIdQuery } from "../../redux/services/api";
import { StatusMessage } from "../status-message/StatusMessage";

export const RestaurantTabContainer = ({ restaurantId }) => {
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

  if (!restaurant) {
    return (
      <StatusMessage
        as="span"
        tone="empty"
        compact
        title="Restaurant unavailable"
      />
    );
  }

  return <RestaurantTab restaurant={restaurant} />;
};
