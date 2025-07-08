import React from 'react'
import MenuItem from '../menu-item/MenuItem'

export default function Menu({ menu }) {
  return (<>
  <h3>Меню</h3>
      <ul>
        {menu.map((menuItem) => (
          <MenuItem key={menuItem.id} {...menuItem} />
        ))}
      </ul>
  </> 
  )
}
