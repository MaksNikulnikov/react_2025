import { Menu } from "../menu/Menu";
import { Reviews } from "../reviews/Reviews";
import styles from "./restaurant.module.css";

export const Restaurant = ({ name, menuIds, reviewsIds }) => {
  return (
    <section className={styles.restaurant}>
      <h2>{name}</h2>
      <Menu menuIds={menuIds} />
      <Reviews reviewsIds={reviewsIds} />
    </section>
  );
};
