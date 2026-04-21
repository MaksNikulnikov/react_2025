import { Outlet } from "react-router";
import { Header } from "../header/Header";
import Scrollbar from "../scrollbar/Scrollbar";
import styles from "./layout.module.css";

export const Layout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.shell}>
      <Scrollbar />
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <p className={styles.footerTitle}>Restaurant Explorer</p>
            <p className={styles.footerText}>
              Portfolio React app with menus, reviews, and a local mock API.
            </p>
          </div>
          <p className={styles.footerMeta}>
            Built with React, RTK Query, and Vite | {currentYear}
          </p>
        </div>
      </footer>
    </div>
  );
};
