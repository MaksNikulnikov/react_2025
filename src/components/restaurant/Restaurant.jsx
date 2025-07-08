import Menu from "../menu/Menu";
import Reviews from "../reviews/Reviews";

export default function Restaurant({ name, menu, reviews }) {
  return (
    <li>
      <h2>{name}</h2>
      <Menu menu={menu} />
      <Reviews reviews={reviews} />
    </li>
  );
}
