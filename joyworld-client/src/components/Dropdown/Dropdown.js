import React from 'react';
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
                        <a href={currentRoute.path}>{currentRoute.title}</a>
                    ))
                ))}
            </DropdownContent>
        </Wrapper>
    )
}

export default Dropdown
