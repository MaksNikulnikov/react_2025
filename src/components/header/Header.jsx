import { useTheme } from "../theme-context/use-theme";
import { Button } from "../button/Button";
import styles from "./header.module.css";
import { useUser } from "../user-context/use-user";
import { Cart } from "../cart/Cart";
import { Modal } from "../modal/Modal";

export const Header = () => {
  const { toggleTheme, theme } = useTheme();
  const { logIn, logOut, isLogged } = useUser();

  return (
    <header className={styles.header}>
      <Button
        onClick={() => {
          if (isLogged) {
            logOut();
          } else {
            const userName = prompt("Enter your name:");
            if (userName) logIn(userName);
          }
        }}
        name={isLogged ? "Logout" : "Login"}
      />
      <Button onClick={toggleTheme} name={theme} />
      <Modal buttonName={"🛒"}>
        <Cart />
      </Modal>
    </header>
  );
};
