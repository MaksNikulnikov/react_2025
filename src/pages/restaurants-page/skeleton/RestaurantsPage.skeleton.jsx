import styles from "./restaurants-page-skeleton.module.css";

export const RestaurantsPageSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.title}></div>
      <div className={styles.tabs}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.tab}></div>
        ))}
      </div>
    </div>
  );
};
