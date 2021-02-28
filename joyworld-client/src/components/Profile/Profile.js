import React from 'react'
import { useParams } from 'react-router-dom';
import Menu from './Menu'
import {getCurrentUser} from '../../services/Auth/authService';
import {Wrapper,Content} from './Profile.styles';

const Profile = ({menuItems,activeIndex=0,onIndexChange}) => {

    const {username} = useParams();

    const getMenuItems = () => {
        if(getCurrentUser().user.username===username) return menuItems;
        else return menuItems.filter(item => !item.isPrivate)
    }

    return (
        <Wrapper>
            <Menu
                menuItems = {getMenuItems()}
                activeIndex = {activeIndex}
                onIndexChange = {onIndexChange}
            />
            <Content>{getMenuItems()[activeIndex].component()}</Content>
                
        </Wrapper>
    )
}

export default Profile
