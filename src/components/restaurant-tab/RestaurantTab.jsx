import { NavLink } from "react-router";
import styles from "./restaurant-tab.module.css";

export const RestaurantTab = ({ restaurant }) => {
  const { id, name } = restaurant;

  return (
    <NavLink to={`/restaurants/${id}`} className={styles.linkButton}>
      {name}
    </NavLink>
  );
};
