import { useSelector } from "react-redux";
import { selectUserById } from "../../redux/entities/users/slice";

import styles from "./user-info.module.css"

export const UserInfo = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  return (
    <div className={styles.userInfo}>
      <span className={styles.label}>Автор:</span>
      <span className={styles.name}>{user.name}</span>
    </div>
  );
};
