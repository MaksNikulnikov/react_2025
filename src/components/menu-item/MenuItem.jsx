import { Counter } from "../counter/Counter";
import styles from "./menu-item.module.css"

export const MenuItem = ({ name }) => {
  return (
    <li className={styles.item}>
      <span>{name}</span>
      <Counter />
    </li>
  );
};
