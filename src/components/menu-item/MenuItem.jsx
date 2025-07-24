import { DishCounter } from "../dish-counter/DishCounter";
import { useUser } from "../user-context/use-user";
import styles from "./menu-item.module.css";

export const MenuItem = ({ dish }) => {
  const { isLogged } = useUser();
  return (
    <li className={styles.item}>
      <span>{dish.name}</span>
      <DishCounter isDisabled={!isLogged} />
    </li>
  );
};
