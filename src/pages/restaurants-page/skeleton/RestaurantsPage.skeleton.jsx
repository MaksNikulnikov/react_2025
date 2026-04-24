import { SkeletonBlock } from "../../../components/skeleton-block/SkeletonBlock";
import styles from "./restaurants-page-skeleton.module.css";

export const RestaurantsPageSkeleton = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <SkeletonBlock className={styles.eyebrow} />
          <SkeletonBlock className={styles.title} />
          <SkeletonBlock className={styles.lead} />
          <SkeletonBlock className={styles.leadShort} />
        </div>

        <div className={styles.filters}>
          <SkeletonBlock className={styles.filterLabel} />
          <SkeletonBlock className={styles.filterControl} />
        </div>
      </section>

      <div className={styles.cards}>
        {[...Array(4)].map((_, i) => (
          <article key={i} className={styles.card}>
            <SkeletonBlock className={styles.image} />
            <div className={styles.cardContent}>
              <div className={styles.cardMeta}>
                <SkeletonBlock className={styles.metaPill} />
                <SkeletonBlock className={styles.metaText} />
              </div>

              <div className={styles.cardBody}>
                <SkeletonBlock className={styles.cardTitle} />
                <SkeletonBlock className={styles.cardText} />
                <SkeletonBlock className={styles.cardTextShort} />
              </div>

              <div className={styles.cardFooter}>
                <SkeletonBlock className={styles.footerText} />
                <SkeletonBlock className={styles.footerCta} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
