import { useOutletContext } from "react-router";
import { MenuItemContainer } from "../../components/menu-item/MenuItem.container";
import styles from "./menu-page.module.css";

export const MenuPage = () => {
  const { menuIds } = useOutletContext();
  return (
    <>
      <h3 className={styles.title}>Меню</h3>
      <ul className={styles.list}>
        {menuIds.map((menuItemId) => (
          <MenuItemContainer key={menuItemId} menuItemId={menuItemId} />
        ))}
      </ul>
    </>
  );
};
