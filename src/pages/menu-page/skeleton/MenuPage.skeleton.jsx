import { SkeletonBlock } from "../../../components/skeleton-block/SkeletonBlock";
import styles from "./menu-page.skeleton.module.css";

export const MenuPageSkeleton = ({
  showHeading = false,
  rowCount = 4,
}) => {
  const rows = Math.max(1, rowCount);

  return (
    <div className={styles.content}>
      {showHeading ? <SkeletonBlock className={styles.title} /> : null}
      <div className={styles.list}>
        {[...Array(rows)].map((_, index) => (
          <div key={index} className={styles.row}>
            <SkeletonBlock className={styles.name} />
            <SkeletonBlock className={styles.control} />
          </div>
        ))}
      </div>
    </div>
  );
};
