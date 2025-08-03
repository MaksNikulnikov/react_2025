import styles from './restaurantSkeleton.module.css';

export const RestaurantSkeleton = () => {
  return (
    <section className={styles.skeleton}>
      <div className={styles.title} />

      <nav className={styles.tabs}>
        <div className={styles.tab}></div>
        <div className={styles.tab}></div>
      </nav>

      <div className={styles.content}>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
      </div>
    </section>
  );
};
