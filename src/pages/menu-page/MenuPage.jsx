import { useOutletContext } from "react-router";
import { MenuItemContainer } from "../../components/menu-item/MenuItem.container";
import styles from "./menu-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../../redux/entities/dishes/get-dishes";
import { useEffect } from "react";
import { useParams } from "react-router";
import { selectDishesRequestStatus } from "../../redux/entities/dishes/slice";
import { REQUEST_STATUS } from "../../redux/constants";
import { MenuPageSkeleton } from "./skeleton/MenuPage.skeleton";

export const MenuPage = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const { menuIds } = useOutletContext();

  const requestStatus = useSelector((state) =>
    selectDishesRequestStatus(state, restaurantId)
  );

  useEffect(() => {
    if (restaurantId) {
      dispatch(getDishes(restaurantId));
    }
  }, [dispatch, restaurantId]);

  if (
    requestStatus === REQUEST_STATUS.IDLE ||
    requestStatus === REQUEST_STATUS.PENDING
  ) {
    return <MenuPageSkeleton />;
  }

  if (!menuIds?.length) {
    return <p className={styles.message}>Меню отсутствует</p>;
  }

  return (
    <>
      <h3 className={styles.title}>Меню</h3>
      <ul className={styles.list}>
        {menuIds.map((menuItemId) => (
          <MenuItemContainer key={menuItemId} menuItemId={menuItemId} />
        ))}
      </ul>
    </>
  );
};
