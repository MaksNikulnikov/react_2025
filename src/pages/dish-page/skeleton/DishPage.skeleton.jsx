import { SkeletonBlock } from "../../../components/skeleton-block/SkeletonBlock";
import styles from "./dish-page-skeleton.module.css";

export const DishPageSkeleton = () => {
  return (
    <div className={styles.dishPage}>
      <SkeletonBlock className={styles.skeletonTitle} />
      <SkeletonBlock className={styles.skeletonText} />
      <SkeletonBlock className={styles.skeletonTextShort} />
      <SkeletonBlock className={styles.skeletonIngredients} />
      <SkeletonBlock className={styles.skeletonCounter} />
    </div>
  );
};
