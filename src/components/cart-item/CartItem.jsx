import styles from "./cart-item.module.css";

const formatPrice = (price) => `$${price}`;

export const CartItem = ({ dish, amount }) => {
  const subtotal = dish.price * amount;

  return (
    <li className={styles.item}>
      <div className={styles.details}>
        <p className={styles.name}>{dish.name}</p>
        <p className={styles.meta}>
          <span>{amount} x {formatPrice(dish.price)}</span>
          <span>{dish.ingredients.join(", ")}</span>
        </p>
      </div>

      <div className={styles.total}>
        <span className={styles.totalLabel}>Subtotal</span>
        <strong className={styles.totalValue}>{formatPrice(subtotal)}</strong>
      </div>
    </li>
  );
};
