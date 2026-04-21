import { useParams } from "react-router";
import { DishCounter } from "../../components/dish-counter/DishCounter";
import styles from "./dish-page.module.css";
import { DishPageSkeleton } from "./skeleton/DishPage.skeleton";
import { useGetDishByIdQuery } from "../../redux/services/api";
import { StatusMessage } from "../../components/status-message/StatusMessage";

export const DishPage = () => {
  const { dishId } = useParams();

  const { data: dish, isLoading, isError } = useGetDishByIdQuery(dishId);

  if (isLoading) return <DishPageSkeleton />;

  if (isError || !dish) {
    return (
      <div className={styles.dishPage}>
        <StatusMessage tone="error" title="Dish not available.">
          Return to the restaurant menu and choose another item.
        </StatusMessage>
      </div>
    );
  }

  return (
    <div className={styles.dishPage}>
      <h2 className={styles.title}>{dish.name}</h2>
      <p className={styles.price}>Price: ${dish.price}</p>
      <p className={styles.ingredients}>
        Ingredients: {dish.ingredients.join(", ")}
      </p>
      <div className={styles.counterWrapper}>
        <DishCounter dishId={dish.id} isDisabled={false} />
      </div>
    </div>
  );
};
