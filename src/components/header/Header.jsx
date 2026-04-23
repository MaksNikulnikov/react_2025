import { Link } from "react-router";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../theme-context/use-theme";
import { Button } from "../button/Button";
import styles from "./header.module.css";
import { Cart } from "../cart/Cart";
import { Modal } from "../modal/Modal";
import { UserSession } from "../user-session/UserSession";
import { selectCartTotalAmount } from "../../redux/entities/cart/slice";

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartButtonRef = useRef(null);
  const { toggleTheme, themeLabel } = useTheme();
  const cartItemsCount = useSelector(selectCartTotalAmount);
  const cartButtonName = cartItemsCount
    ? `Cart (${cartItemsCount})`
    : "Cart";

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
          <Button onClick={toggleTheme}>{themeLabel}</Button>
          <Button onClick={() => setIsCartOpen(true)} ref={cartButtonRef}>
            {cartButtonName}
          </Button>
          <Modal
            open={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            dialogLabel="Cart contents"
            returnFocusRef={cartButtonRef}
          >
            <Cart />
          </Modal>
        </div>
      </div>
    </header>
  );
};
