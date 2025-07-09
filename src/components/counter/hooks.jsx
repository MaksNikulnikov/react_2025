import React from 'react'

export const useCounter = ({min= -Infinity, max = Infinity}) => {
    const [count, setCount] = React.useState(0);
  return {
    count,
    increment: () => setCount((prevCount) => Math.min( max, prevCount + 1)),
    decrement: () => setCount((prevCount) => Math.max(min, prevCount - 1)),
  }
}
