import styles from './restaurantPage.skeleton.module.css';

export const RestaurantPageSkeleton = () => {
  return (
    <section className={styles.skeleton}>
      <div className={styles.title} />

      <nav className={styles.tabs}>
        <div className={styles.tab}></div>
        <div className={styles.tab}></div>
      </nav>
    </section>
  );
};
