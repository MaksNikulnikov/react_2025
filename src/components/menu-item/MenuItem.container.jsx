import { useSelector } from "react-redux";
import { selectDishById } from "../../redux/entities/dishes/slice";
import { MenuItem } from "./MenuItem";

export const MenuItemContainer = ({ menuItemId }) => {
  const dish = useSelector((state) => selectDishById(state, menuItemId));
  return <MenuItem dish={dish} />;
};
