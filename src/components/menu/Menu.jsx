import { MenuItem } from "../menu-item/MenuItem";

export const Menu = ({ menu }) => {
  return (
    <>
      <h3>Меню</h3>
      {menu?.length ? (
        <ul>
          {menu.map((menuItem) => (
            <MenuItem key={menuItem.id} {...menuItem} />
          ))}
        </ul>
      ) : (
        <p>Меню отсутствует</p>
      )}
    </>
  );
};
