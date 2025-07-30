import { NavLink } from "react-router";
import styles from "./tab-link.module.css";

export const TabLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive ? styles.tabActive : styles.tab
    }
  >
    {children}
  </NavLink>
);
