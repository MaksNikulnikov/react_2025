import { useParams, NavLink, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectRestaurantById } from "../../redux/entities/restoraunts/slice";
import styles from "./restaurant-page.module.css";

export const RestaurantPage = () => {
  const { restaurantId } = useParams();

  const restaurant = useSelector((state) =>
    selectRestaurantById(state, restaurantId),
  );

  if (!restaurant) return <p>Ресторан не найден</p>;

  return (
    <section className={styles.restaurant}>
      <h2>{restaurant.name}</h2>

      <nav className={styles.tabs}>
        <NavLink
          to="menu"
          className={({ isActive }) =>
            isActive ? styles.tabActive : styles.tab
          }
        >
          Меню
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            isActive ? styles.tabActive : styles.tab
          }
        >
          Отзывы
        </NavLink>
      </nav>

      <div className={styles.content}>
        <Outlet
          context={{
            menuIds: restaurant.menu,
            reviewsIds: restaurant.reviews,
          }}
        />
      </div>
    </section>
  );
};
