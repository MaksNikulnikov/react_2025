import { NavLink } from "react-router";
import { DishCounter } from "../dish-counter/DishCounter";
import { useUser } from "../user-context/use-user";
import styles from "./menu-item.module.css";

export const MenuItem = ({ dish }) => {
  const { isLogged } = useUser();
  return (
    <li className={styles.item}>
      <NavLink to={`/dish/${dish.id}`} className={styles.name}>
        {dish.name}
      </NavLink>
      <DishCounter dishId={dish.id} isDisabled={!isLogged} />
    </li>
  );
};
