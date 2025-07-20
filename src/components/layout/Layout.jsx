import Scrollbar from "../scrollbar/Scrollbar";
import styles from "./Layout.module.css";


export const Layout = ({ children }) => {
  return (
    <>
      <Scrollbar/>
      <header className={styles.header}>header</header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>footer</footer>
    </>
  );
};
