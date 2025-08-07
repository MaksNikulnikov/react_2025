import styles from './review-page.skeleton.module.css';

export const ReviewPageSkeleton = () => {
  return (
      <div className={styles.content}>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
      </div>
  );
};
