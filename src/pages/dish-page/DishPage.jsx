import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDishById,
  selectDishRequestStatus,
} from "../../redux/entities/dishes/slice";
import { DishCounter } from "../../components/dish-counter/DishCounter";
import styles from "./dish-page.module.css";
import { useEffect } from "react";
import { getDish } from "../../redux/entities/dishes/get-dish";
import { REQUEST_STATUS } from "../../redux/constants";
import { DishPageSkeleton } from "./skeleton/DishPage.skeleton";

export const DishPage = () => {
  const dispatch = useDispatch();
  const { dishId } = useParams();

  const dish = useSelector((state) => selectDishById(state, dishId));
  const requestStatus = useSelector((state) =>
    selectDishRequestStatus(state, dishId)
  );

  useEffect(() => {
    if (dishId) {
      dispatch(getDish(dishId));
    }
  }, [dispatch, dishId]);

  if (
    requestStatus === REQUEST_STATUS.IDLE ||
    requestStatus === REQUEST_STATUS.PENDING
  ) {
    return <DishPageSkeleton />;
  }

  if (!dish) {
    return <p>Блюдо не найдено</p>;
  }

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
