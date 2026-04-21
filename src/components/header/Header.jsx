import { Link } from "react-router";
import { useTheme } from "../theme-context/use-theme";
import { Button } from "../button/Button";
import styles from "./header.module.css";
import { Cart } from "../cart/Cart";
import { Modal } from "../modal/Modal";
import { UserSession } from "../user-session/UserSession";

export const Header = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark}>RE</span>
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>Restaurant Explorer</span>
            <span className={styles.brandSubtitle}>
              Menus, reviews, and a demo cart flow
            </span>
          </span>
        </Link>

        <div className={styles.actions}>
          <UserSession />
          <Button onClick={toggleTheme} name={theme} />
          <Modal buttonName="Cart">
            <Cart />
          </Modal>
        </div>
      </div>
    </header>
  );
};
