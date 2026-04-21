import { Outlet } from "react-router";
import { Header } from "../header/Header";
import Scrollbar from "../scrollbar/Scrollbar";
import styles from "./layout.module.css";

export const Layout = () => {
  return (
    <>
      <Scrollbar />
      <Header />
      <main className={styles.main}>{<Outlet />}</main>
      <footer className={styles.footer}>footer</footer>
    </>
  );
};
