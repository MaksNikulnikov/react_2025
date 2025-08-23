import { useParams } from "react-router";
import { DishCounter } from "../../components/dish-counter/DishCounter";
import styles from "./dish-page.module.css";
import { DishPageSkeleton } from "./skeleton/DishPage.skeleton";
import { useGetDishByIdQuery } from "../../redux/services/api";

export const DishPage = () => {
  const { dishId } = useParams();

  const { data: dish, isLoading, isError } = useGetDishByIdQuery(dishId);

  if (isLoading) return <DishPageSkeleton />;

  if (isError || !dish) return null;

  return (
    <div className={styles.dishPage}>
      <h2 className={styles.title}>{dish.name}</h2>
      <p className={styles.price}>Цена: ${dish.price}</p>
      <p className={styles.ingredients}>
        Состав: {dish.ingredients.join(", ")}
      </p>
      <div className={styles.counterWrapper}>
        <DishCounter dishId={dish.id} isDisabled={false} />
      </div>
    </div>
  );
};
