import React from 'react';
import { Link } from 'react-router-dom';
import {Wrapper,DropButton,DropdownContent} from './Dropdown.styles';
import {routes} from '../../config/Router';

const Dropdown = ({route}) => {
    return (
        <Wrapper>
            <DropButton>
                {route.title}
            </DropButton>
            <DropdownContent>
                {route.links.map(link => (
                    routes.filter(routeList => routeList.title===link)
                    .map(currentRoute => (
                        <Link to={currentRoute.path}>{currentRoute.title}</Link>
                    ))
                ))}
            </DropdownContent>
        </Wrapper>
    )
}

export default Dropdown
