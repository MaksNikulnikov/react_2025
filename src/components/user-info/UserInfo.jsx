import styles from "./user-info.module.css";

export const UserInfo = ({ user }) => {
  return (
    <div className={styles.userInfo}>
      <span className={styles.label}>Author:</span>
      <span className={styles.name}>{user?.name || "Unknown user"}</span>
    </div>
  );
};
