import React from 'react'
import Restaurant from '../restaurant/Restaurant'

export default function RestaurantsList({ restaurants }) {
  return (
    <ul>
      {restaurants.map((restaurant) => {
        return <Restaurant key={restaurant.id} {...restaurant} />
      })}
    </ul>
  )
}
