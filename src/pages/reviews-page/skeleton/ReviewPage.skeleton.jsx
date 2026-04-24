import { SkeletonBlock } from "../../../components/skeleton-block/SkeletonBlock";
import styles from "./review-page.skeleton.module.css";

export const ReviewPageSkeleton = () => {
  return (
    <section className={styles.reviews}>
      <SkeletonBlock className={styles.title} />

      <div className={styles.list}>
        {[...Array(2)].map((_, index) => (
          <article key={index} className={styles.card}>
            <SkeletonBlock className={styles.textPrimary} />
            <SkeletonBlock className={styles.textSecondary} />
            <SkeletonBlock className={styles.rating} />
            <SkeletonBlock className={styles.author} />
          </article>
        ))}
      </div>

      <div className={styles.form}>
        <SkeletonBlock className={styles.formHint} />
        <div className={styles.field}>
          <SkeletonBlock className={styles.fieldLabel} />
          <SkeletonBlock className={styles.textarea} />
        </div>
        <div className={styles.field}>
          <SkeletonBlock className={styles.fieldLabelSmall} />
          <SkeletonBlock className={styles.select} />
        </div>
        <div className={styles.actions}>
          <SkeletonBlock className={styles.buttonSecondary} />
          <SkeletonBlock className={styles.buttonPrimary} />
        </div>
      </div>
    </section>
  );
};
