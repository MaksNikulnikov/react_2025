import { useSelector } from "react-redux";
import {
  useGetDishesByRestaurantIdQuery,
  useGetRestaurantsQuery,
} from "../../redux/services/api";
import { CartItem } from "../cart-item/CartItem";
import { StatusMessage } from "../status-message/StatusMessage";
import styles from "./cart.module.css";

const formatPrice = (price) => `$${price}`;

const pluralize = (count, singular, plural = `${singular}s`) =>
  count === 1 ? singular : plural;

const getRestaurantEntries = (restaurants, cartEntries) =>
  restaurants
    .map((restaurant) => ({
      restaurant,
      entries: cartEntries
        .filter(([dishId]) => restaurant.menu.includes(dishId))
        .map(([dishId, amount]) => ({ dishId, amount })),
    }))
    .filter(({ entries }) => entries.length > 0);

const getUnavailableEntries = (restaurants, cartEntries) => {
  const knownDishIds = new Set(restaurants.flatMap((restaurant) => restaurant.menu));

  return cartEntries
    .filter(([dishId]) => !knownDishIds.has(dishId))
    .map(([dishId, amount]) => ({ dishId, amount }));
};

const CartRestaurantSection = ({ restaurant, entries }) => {
  const { data: dishes = [], isLoading, isError } = useGetDishesByRestaurantIdQuery(
    restaurant.id,
  );
  const itemCount = entries.reduce((total, entry) => total + entry.amount, 0);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <StatusMessage
          tone="loading"
          title={`Loading ${restaurant.name} order...`}
        />
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.section}>
        <StatusMessage
          tone="error"
          title={`${restaurant.name} menu is unavailable.`}
        >
          Refresh the page or try another restaurant section.
        </StatusMessage>
      </section>
    );
  }

  const dishesById = Object.fromEntries(
    dishes.map((dish) => [dish.id, dish]),
  );
  const subtotal = entries.reduce((total, entry) => {
    const dishPrice = dishesById[entry.dishId]?.price || 0;
    return total + dishPrice * entry.amount;
  }, 0);

  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <div>
          <h3 className={styles.sectionTitle}>{restaurant.name}</h3>
          <p className={styles.sectionDescription}>{restaurant.description}</p>
        </div>

        <dl className={styles.sectionMeta}>
          <div className={styles.sectionStat}>
            <dt className={styles.sectionStatLabel}>Items</dt>
            <dd className={styles.sectionStatValue}>{itemCount}</dd>
          </div>
          <div className={styles.sectionStat}>
            <dt className={styles.sectionStatLabel}>Subtotal</dt>
            <dd className={styles.sectionStatValue}>{formatPrice(subtotal)}</dd>
          </div>
        </dl>
      </header>

      <ul className={styles.itemList}>
        {entries.map(({ dishId, amount }) => {
          const dish = dishesById[dishId];

          return dish ? (
            <CartItem key={dishId} dish={dish} amount={amount} />
          ) : (
            <li key={dishId} className={styles.itemFallback}>
              <StatusMessage tone="error" compact title="Cart item unavailable.">
                This dish is no longer present in the restaurant menu.
              </StatusMessage>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartEntries = Object.entries(cart);
  const { data: restaurants = [], isLoading, isError } = useGetRestaurantsQuery();

  if (cartEntries.length === 0) {
    return (
      <StatusMessage tone="empty" title="Your cart is empty.">
        Add dishes from the menu to see them here.
      </StatusMessage>
    );
  }

  if (isLoading) {
    return <StatusMessage tone="loading" title="Loading your cart..." />;
  }

  if (isError) {
    return (
      <StatusMessage tone="error" title="Cart details are unavailable.">
        Refresh the page to reconnect the restaurant catalog.
      </StatusMessage>
    );
  }

  const restaurantGroups = getRestaurantEntries(restaurants, cartEntries);
  const unavailableEntries = getUnavailableEntries(restaurants, cartEntries);
  const totalItems = cartEntries.reduce((total, [, amount]) => total + amount, 0);
  const totalRestaurants = restaurantGroups.length;

  return (
    <div className={styles.cart}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Your order</h2>
          <p className={styles.caption}>
            {totalItems} {pluralize(totalItems, "item")} from {totalRestaurants}{" "}
            {pluralize(totalRestaurants, "restaurant")}.
          </p>
        </div>
      </header>

      <div className={styles.sections}>
        {restaurantGroups.map(({ restaurant, entries }) => (
          <CartRestaurantSection
            key={restaurant.id}
            restaurant={restaurant}
            entries={entries}
          />
        ))}

        {unavailableEntries.length ? (
          <section className={styles.section}>
            <header className={styles.sectionHeader}>
              <div>
                <h3 className={styles.sectionTitle}>Unavailable items</h3>
                <p className={styles.sectionDescription}>
                  These items no longer belong to an active restaurant menu.
                </p>
              </div>
            </header>

            <ul className={styles.itemList}>
              {unavailableEntries.map(({ dishId, amount }) => (
                <li key={dishId} className={styles.itemFallback}>
                  <StatusMessage tone="error" compact title="Cart item unavailable.">
                    {amount} {pluralize(amount, "item")} stored under ID {dishId}.
                  </StatusMessage>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
};
