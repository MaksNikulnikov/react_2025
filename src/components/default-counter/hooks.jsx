import React from "react";

export const useCounter = ({
  min = -Infinity,
  max = Infinity,
  initial = 0,
}) => {
  const [count, setCount] = React.useState(initial);
  return {
    count,
    increment: () => setCount((prevCount) => Math.min(max, prevCount + 1)),
    decrement: () => setCount((prevCount) => Math.max(min, prevCount - 1)),
  };
};
