import { Counter } from "../counter/Counter";

export const MenuItem = ({ name }) => {
  return (
    <li>
      <span>{name}</span>
      <Counter />
    </li>
  );
};
