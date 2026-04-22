import { useParams } from "react-router";
import { MenuItem } from "../../components/menu-item/MenuItem";
import styles from "./menu-page.module.css";
import { StatusMessage } from "../../components/status-message/StatusMessage";
import { useGetDishesByRestaurantIdQuery } from "../../redux/services/api";

export const MenuPage = () => {
  const { restaurantId } = useParams();
  const {
    data: dishes = [],
    isLoading,
    isError,
  } = useGetDishesByRestaurantIdQuery(restaurantId);

  return (
    <>
      <h3 className={styles.title}>Menu</h3>
      {isLoading ? (
        <StatusMessage
          className={styles.message}
          tone="loading"
          title="Loading menu..."
        />
      ) : isError ? (
        <StatusMessage
          className={styles.message}
          tone="error"
          title="Unable to load the menu."
        >
          Check the local API and try again.
        </StatusMessage>
      ) : dishes.length ? (
        <ul className={styles.list}>
          {dishes.map((dish) => (
            <MenuItem key={dish.id} dish={dish} />
          ))}
        </ul>
      ) : (
        <StatusMessage
          className={styles.message}
          tone="empty"
          title="This menu is empty right now."
        />
      )}
    </>
  );
};
