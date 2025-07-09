import { RestaurantsList } from '../resraurants-list/RestaurantsList'

export const RestaurantsPage = ({restaurants}) => {
  return (
    <RestaurantsList restaurants={restaurants} />
  )
}
