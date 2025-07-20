import { useTheme } from "../theme-context/use-theme";
import { Button } from "../button/Button";
import styles from "./header.module.css";
import { useUser } from "../user-context/use-user";

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
      ></Button>
      <Button onClick={toggleTheme} name={theme}></Button>
    </header>
  );
};
