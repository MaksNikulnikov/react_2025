import styles from './menu-page.skeleton.module.css';

export const MenuPageSkeleton = () => {
  return (
      <div className={styles.content}>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
      </div>
  );
};
