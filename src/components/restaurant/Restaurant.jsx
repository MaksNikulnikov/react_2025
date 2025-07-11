import { Menu } from "../menu/Menu";
import { Reviews } from "../reviews/Reviews";

export const Restaurant = ({ name, menu, reviews }) => {
  return (
    <section className="restaurant">
      <h2>{name}</h2>
      <Menu menu={menu} />
      <Reviews reviews={reviews} />
    </section>
  );
};
