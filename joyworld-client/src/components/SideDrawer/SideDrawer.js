import React from 'react';
import {Wrapper, SideDrawerList} from './SideDrawer.styles';
import {Link} from 'react-router-dom';
import {routes} from '../../config/Router';
import Dropdown from '../Dropdown/Dropdown';

const SideDrawer = ({show}) => {

    return (
        <Wrapper show={show}>
            <SideDrawerList>
                {routes.filter((route) => !!route.isLink)
                        .map((route) => (
                            route.isDropdown ? <Dropdown route={route}/> : (
                            <li key={`route-${route.title}`}>
                                <Link to={route.path}>{route.title}</Link>
                            </li>
                            )
                        ))
                    }
            </SideDrawerList>
        </Wrapper>
    )
}

export default SideDrawer
