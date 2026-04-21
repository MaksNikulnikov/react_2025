export const CartItem = ({ dish, amount, isLoading }) => {
  if (isLoading) return <div>{amount} - Loading item...</div>;

  return (
    <div>
      {amount} - {dish?.name || "Unknown dish"}
    </div>
  );
};
