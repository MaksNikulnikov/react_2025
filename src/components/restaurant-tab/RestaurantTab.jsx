import { NavLink } from "react-router";
import styles from "./restaurant-tab.module.css";

const getDecisionHint = ({ description, menu, reviews }) => {
  const normalizedDescription = description.toLowerCase();

  if (normalizedDescription.includes("bakery")) {
    return "Best for coffee, pastries, and a quick stop.";
  }

  if (normalizedDescription.includes("grill")) {
    return "Best for burgers and a heavier meal.";
  }

  if (normalizedDescription.includes("italian")) {
    return "Best when you want a familiar lunch option.";
  }

  if (normalizedDescription.includes("indian")) {
    return "Best when you want stronger flavors and shared plates.";
  }

  if (reviews.length >= 3) {
    return "Most reviewed option on this list.";
  }

  if (menu.length >= 3) {
    return "Wider menu if your group wants more choice.";
  }

  return "Good if you want a straightforward place to inspect.";
};

export const RestaurantTab = ({ restaurant }) => {
  const { id, name, description, img, menu, reviews } = restaurant;
  const decisionHint = getDecisionHint(restaurant);

  return (
    <NavLink
      to={`/restaurants/${id}`}
      className={({ isActive }) =>
        isActive ? `${styles.card} ${styles.cardActive}` : styles.card
      }
    >
      <img
        className={styles.image}
        src={img}
        alt={`${name} interior and dishes`}
        loading="lazy"
      />

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.cuisine}>{description}</span>
          <span className={styles.metric}>{reviews.length} reviews</span>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.hint}>{decisionHint}</p>
        </div>

        <div className={styles.footer}>
          <span className={styles.metric}>{menu.length} dishes</span>
          <span className={styles.cta}>Open menu and reviews</span>
        </div>
      </div>
    </NavLink>
  );
};
