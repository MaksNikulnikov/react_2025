import { MenuItem } from "./MenuItem";
import { useGetDishByIdQuery } from "../../redux/services/api";

export const MenuItemContainer = ({ menuItemId }) => {
  const { data: dish, isLoading, isError } = useGetDishByIdQuery(menuItemId);
  if (isLoading) return "...Loading";

  if (isError) return null;
  return <MenuItem dish={dish} />;
};
