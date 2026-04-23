import { useDispatch } from "react-redux";
import { Button } from "../button/Button";
import { useGetUsersQuery } from "../../redux/services/api";
import { useUser } from "../user-context/use-user";
import { clearCart } from "../../redux/entities/cart/slice";
import styles from "./user-session.module.css";

export const UserSession = () => {
  const dispatch = useDispatch();
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const { currentUser, isLogged, logIn, logOut, userId, userName } = useUser();

  const handleSignOut = () => {
    logOut();
    dispatch(clearCart());
  };

  const handleUserChange = (event) => {
    const nextUserId = event.target.value;

    if (!nextUserId) {
      handleSignOut();
      return;
    }

    const nextUser = users.find((user) => user.id === nextUserId);

    if (nextUser) {
      if (userId && userId !== nextUser.id) {
        dispatch(clearCart());
      }

      logIn(nextUser);
    }
  };

  return (
    <div className={styles.session}>
      <div className={styles.summary}>
        {isLogged ? `Demo user: ${userName}` : "Choose a demo user"}
      </div>

      {isLoading ? (
        <span className={styles.note}>Loading demo users...</span>
      ) : isError ? (
        <span className={styles.error}>User list unavailable</span>
      ) : (
        <div className={styles.controls}>
          <select
            className={styles.select}
            value={userId}
            onChange={handleUserChange}
            aria-label="Demo user"
          >
            <option value="">Select a profile</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {currentUser ? <Button onClick={handleSignOut}>Sign out</Button> : null}
        </div>
      )}
    </div>
  );
};
