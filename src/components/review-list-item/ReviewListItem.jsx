import { Counter } from "../counter/Counter";

export const ReviewListItem = ({ text }) => {
  return (
    <li>
      {text}
      <Counter />
    </li>
  );
};
