import { useTheme } from "../theme-context/use-theme";
import { Button } from "../button/Button";
import styles from "./header.module.css";

export const Header = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <header className={styles.header}>
      <Button
        onClick={toggleTheme}
        name={theme}
      ></Button>
    </header>
  );
};
