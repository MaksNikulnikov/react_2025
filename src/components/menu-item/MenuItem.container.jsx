import { MenuItem } from "./MenuItem";
import { useGetDishByIdQuery } from "../../redux/services/api";
import { StatusMessage } from "../status-message/StatusMessage";

export const MenuItemContainer = ({ menuItemId }) => {
  const { data: dish, isLoading, isError } = useGetDishByIdQuery(menuItemId);

  if (isLoading) {
    return (
      <StatusMessage as="li" tone="loading" compact title="Loading dish..." />
    );
  }

  if (isError) {
    return (
      <StatusMessage as="li" tone="error" compact title="Dish unavailable.">
        Try reloading the menu.
      </StatusMessage>
    );
  }

  if (!dish) {
    return (
      <StatusMessage as="li" tone="empty" compact title="Dish unavailable.">
        The menu item no longer exists in the local dataset.
      </StatusMessage>
    );
  }

  return <MenuItem dish={dish} />;
};
