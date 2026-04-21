import { useOutletContext } from "react-router";
import { MenuItemContainer } from "../../components/menu-item/MenuItem.container";
import styles from "./menu-page.module.css";
import { StatusMessage } from "../../components/status-message/StatusMessage";

export const MenuPage = () => {
  const { menuIds } = useOutletContext();

  return (
    <>
      <h3 className={styles.title}>Menu</h3>
      {menuIds.length ? (
        <ul className={styles.list}>
          {menuIds.map((menuItemId) => (
            <MenuItemContainer key={menuItemId} menuItemId={menuItemId} />
          ))}
        </ul>
      ) : (
        <StatusMessage
          className={styles.message}
          tone="empty"
          title="This menu is empty right now."
        />
      )}
    </>
  );
};
