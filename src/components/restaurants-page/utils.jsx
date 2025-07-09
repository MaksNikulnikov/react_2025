export const getValidRestaurants = (restaurants) => {
  const list = Array.isArray(restaurants) ? restaurants : [];

  return {
    validRestaurants: list,
    isEmpty: list.length === 0,
    firstId: list[0]?.id ?? null,
    getById: (id) => list.find((r) => r.id === id),
  };
};
