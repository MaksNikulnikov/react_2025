import { useOutletContext } from "react-router";
import { Menu } from "../../components/menu/Menu";

export const MenuPage = () => {
  const { menuIds } = useOutletContext();
  return <Menu menuIds={menuIds} />;
};
