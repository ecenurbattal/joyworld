import React from 'react'
import { MenuWrapper,MenuItem } from './Profile.styles';


const Menu = ({menuItems,activeIndex,onIndexChange}) => {

    return (
        <MenuWrapper>
           {menuItems.map((item,i) => (
               <MenuItem 
               key={`menuItem${i}`}
               isActive={activeIndex===i} 
               onClick={() => onIndexChange(i)}
               >
                   {item.title}
                </MenuItem>
           ))}
        </MenuWrapper>
    )
}

export default Menu
