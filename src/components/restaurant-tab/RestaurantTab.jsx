import styles from "./restaurant-tab.module.css"
import classNames from "classnames";

export const RestaurantTab = ({ restaurant, setActiveId, isActive }) => {
  const { id, name } = restaurant;
  return (
    <button className={classNames(styles.button, { [styles.active]: isActive })} onClick={() => setActiveId(id)}>{name ?? "placeholder"}</button>
  );
};
