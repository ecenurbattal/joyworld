import React from 'react'
import { MenuWrapper } from './Menu.styles'

const Menu = ({children}) => {
    return (
        <MenuWrapper>
            {children}
        </MenuWrapper>
    )
}

export default Menu
