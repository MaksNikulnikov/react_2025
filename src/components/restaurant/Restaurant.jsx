import { MenuContainer } from "../menu/menu.container";
import { ReviewsContainer } from "../reviews/Reviews.container";
import styles from "./restaurant.module.css";

export const Restaurant = ({ name, menuIds, reviewsIds }) => {
  console.log("erstaurants", menuIds);
  return (
    <section className={styles.restaurant}>
      <h2>{name}</h2>
      <MenuContainer menuIds={menuIds} />
      <ReviewsContainer reviewsIds={reviewsIds} />
    </section>
  );
};
