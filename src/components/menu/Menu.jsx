import { MenuItem } from "../menu-item/MenuItem";
import styles from "./menu.module.css";

export const Menu = ({ menu }) => {
  return (
    <>
      <h3 className={styles.title}>Меню</h3>
      {menu?.length ? (
        <ul className={styles.list}>
          {menu.map((menuItem) => (
            <MenuItem key={menuItem.id} {...menuItem} />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>Меню отсутствует</p>
      )}
    </>
  );
};
