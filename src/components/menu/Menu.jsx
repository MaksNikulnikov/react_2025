import { MenuItemContainer } from "../menu-item/MenuItem.container";
import styles from "./menu.module.css";

export const Menu = ({ menuIds }) => {
  return (
    <>
      <h3 className={styles.title}>Меню</h3>
      {menuIds?.length ? (
        <ul className={styles.list}>
          {menuIds.map((menuItemId) => (
            <MenuItemContainer key={menuItemId} menuItemId={menuItemId} />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>Меню отсутствует</p>
      )}
    </>
  );
};
