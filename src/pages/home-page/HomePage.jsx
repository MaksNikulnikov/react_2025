import { Link } from "react-router";
import styles from "./home-page.module.css";

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Portfolio React application</p>
          <h1 className={styles.title}>
            Explore restaurants, dishes, reviews, and cart flow in one compact
            demo.
          </h1>
          <p className={styles.description}>
            Restaurant Explorer combines nested routing, RTK Query data loading,
            modal interactions, and a local mock API into a single portfolio
            project focused on real application structure rather than isolated
            widgets.
          </p>

          <div className={styles.actions}>
            <Link to="/restaurants" className={styles.primaryAction}>
              Browse restaurants
            </Link>
            <a href="#capabilities" className={styles.secondaryAction}>
              See capabilities
            </a>
          </div>

          <ul className={styles.metrics}>
            <li>Nested routes for menu and reviews</li>
            <li>RTK Query data fetching and cache invalidation</li>
            <li>Local Express mock API for development</li>
          </ul>
        </div>

        <div className={styles.previewPanel}>
          <article className={styles.previewCard}>
            <span className={styles.previewLabel}>Navigation</span>
            <h2 className={styles.previewTitle}>Route from overview to details</h2>
            <p className={styles.previewText}>
              Move from the restaurant list into menus, reviews, and individual
              dish pages without losing context.
            </p>
          </article>

          <article className={styles.previewCard}>
            <span className={styles.previewLabel}>State flow</span>
            <h2 className={styles.previewTitle}>Test cart and review interactions</h2>
            <p className={styles.previewText}>
              The project includes counters, a modal cart, and review mutations
              to demonstrate state updates across screens.
            </p>
          </article>

          <article className={styles.previewAccent}>
            <span className={styles.previewAccentLabel}>Mock backend</span>
            <p className={styles.previewAccentText}>
              Local API responses make the UI feel like a real application while
              keeping the setup lightweight for portfolio review.
            </p>
          </article>
        </div>
      </section>

      <section id="capabilities" className={styles.capabilities}>
        <article className={styles.capabilityCard}>
          <p className={styles.cardIndex}>01</p>
          <h2 className={styles.cardTitle}>Structured app shell</h2>
          <p className={styles.cardText}>
            Header, routed content, modal cart, and footer are organized as one
            consistent application frame.
          </p>
        </article>

        <article className={styles.capabilityCard}>
          <p className={styles.cardIndex}>02</p>
          <h2 className={styles.cardTitle}>Data-driven pages</h2>
          <p className={styles.cardText}>
            Restaurants, dishes, users, and reviews are loaded through a shared
            API layer instead of page-specific fetch code.
          </p>
        </article>

        <article className={styles.capabilityCard}>
          <p className={styles.cardIndex}>03</p>
          <h2 className={styles.cardTitle}>Interactive demo surface</h2>
          <p className={styles.cardText}>
            The app is small enough to review quickly, but large enough to show
            routing, state, forms, and asynchronous UI behavior together.
          </p>
        </article>
      </section>
    </div>
  );
};
