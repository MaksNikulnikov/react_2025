import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectDishById } from "../../redux/entities/dishes/slice";
import { DishCounter } from "../../components/dish-counter/DishCounter";
import styles from "./dish-page.module.css";

export const DishPage = () => {
  const { dishId } = useParams();
  const dish = useSelector((state) => selectDishById(state, dishId));

  if (!dish) {
    return <p>Блюдо не найдено</p>;
  }

  return (
    <div className={styles.dishPage}>
      <h2>{dish.name}</h2>
      <p>Цена: ${dish.price}</p>
      <p>Состав: {dish.ingredients.join(", ")}</p>
      <DishCounter dishId={dish.id} isDisabled={false} />
    </div>
  );
};
