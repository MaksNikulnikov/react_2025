import { useSelector } from "react-redux";
import { selectRestaurantsIds } from "../../redux/entities/restoraunts/slice";
import { RestaurantsPage } from "./RestaurantsPage";

export const RestaurantsPageContainer = () => {
  const restaurantsIds = useSelector(selectRestaurantsIds);

  if (!restaurantsIds?.length) {
    return null;
  }

  return <RestaurantsPage restaurantsIds={restaurantsIds} />;
};
