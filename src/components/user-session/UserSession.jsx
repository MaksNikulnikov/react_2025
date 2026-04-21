import { useMemo, useState } from "react";
import { Button } from "../button/Button";
import { useGetUsersQuery } from "../../redux/services/api";
import { useUser } from "../user-context/use-user";
import styles from "./user-session.module.css";

export const UserSession = () => {
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const { currentUser, isLogged, logIn, logOut, userId, userName } = useUser();
  const [selectedUserId, setSelectedUserId] = useState("");

  const activeUserId = selectedUserId || userId || "";

  const selectedUser = useMemo(
    () => users.find((user) => user.id === activeUserId),
    [users, activeUserId],
  );

  const handleUseSelectedUser = () => {
    if (selectedUser) {
      logIn(selectedUser);
    }
  };

  return (
    <div className={styles.session}>
      <div className={styles.summary}>
        {isLogged ? `Signed in as ${userName}` : "Choose a demo user"}
      </div>

      {isLoading ? (
        <span className={styles.note}>Loading demo users...</span>
      ) : isError ? (
        <span className={styles.error}>User list unavailable</span>
      ) : (
        <div className={styles.controls}>
          <select
            className={styles.select}
            value={activeUserId}
            onChange={(event) => setSelectedUserId(event.target.value)}
            aria-label="Demo user"
          >
            <option value="">Select a profile</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <Button
            onClick={handleUseSelectedUser}
            name={isLogged ? "Use selected user" : "Sign in"}
          />

          {currentUser ? <Button onClick={logOut} name="Sign out" /> : null}
        </div>
      )}
    </div>
  );
};
