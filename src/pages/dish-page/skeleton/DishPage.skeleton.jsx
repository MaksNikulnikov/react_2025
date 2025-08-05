import styles from "./dish-page-skeleton.module.css";

export const DishPageSkeleton = () => {
  return (
    <div className={styles.dishPage}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonText} />
      <div className={styles.skeletonTextShort} />
      <div className={styles.skeletonCounter} />
    </div>
  );
};
