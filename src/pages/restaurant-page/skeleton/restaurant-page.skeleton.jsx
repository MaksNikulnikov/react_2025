import { SkeletonBlock } from "../../../components/skeleton-block/SkeletonBlock";
import styles from "./restaurantPage.skeleton.module.css";

export const RestaurantPageSkeleton = ({ children }) => {
  return (
    <section className={styles.skeleton}>
      <SkeletonBlock className={styles.title} />

      <nav className={styles.tabs}>
        <SkeletonBlock className={styles.tab} />
        <SkeletonBlock className={styles.tab} />
      </nav>

      <div className={styles.content}>{children}</div>
    </section>
  );
};
