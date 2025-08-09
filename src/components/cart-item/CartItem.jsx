export const CartItem = ({ dish, amount, isLoading }) => {
  if (isLoading) return <div>{amount} – loading...</div>;
  return (
    <div>
      {amount} – {dish?.name || "unknown dish"}
    </div>
  );
};
