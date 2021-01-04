import React from 'react'
import {ToggleButton, ToggleButtonLine} from './SideDrawer.styles';

const DrawerToggleButton = ({onClick}) => {
    return (
        <ToggleButton onClick={onClick}>
            <ToggleButtonLine/>
            <ToggleButtonLine/>
            <ToggleButtonLine/>
        </ToggleButton>
    )
}

export default DrawerToggleButton
