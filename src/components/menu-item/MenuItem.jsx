import { Counter } from "../counter/Counter";
import { useUser } from "../user-context/use-user";
import styles from "./menu-item.module.css"

export const MenuItem = ({ name }) => {
  const {isLogged} = useUser()
  return (
    <li className={styles.item}>
      <span>{name}</span>
      <Counter isDisabled={!isLogged}/>
    </li>
  );
};
