import React, { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {routes} from '../../config/Router';
import {Wrapper, Title, Menu, InlineContainer} from './Header.styles';
import Cart from '../Cart/Cart';
import SessionContext from '../../contexts/SessionContext';
import SignOut from '../SignOut/SignOut';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import Dropdown from '../Dropdown/Dropdown';



const Header = ({drawerClickHandler}) => {
    const {isAuthenticated} = useContext(SessionContext)
    const history = useHistory();
    const handleTitleClick = () => {
        history.push('/');
    }
    return (
        <Wrapper>
            <Title onClick={handleTitleClick}>JoyWorld</Title>
            <InlineContainer>
                <Menu margin="0">
                    {routes.filter((route) => !!route.isLink)
                        .map((route) => (
                            route.isDropdown ? <Dropdown route={route}/> : (
                            <li key={`route-${route.title}`}>
                                <Link to={route.path}>{route.title}</Link>
                            </li>
                            )
                        ))
                    }
                </Menu>
                <Menu display="none" margin="auto">
                    {!isAuthenticated ? (
                    <>
                        <li>
                            <Link to='/login'>Giriş Yap</Link>
                        </li>
                        <li>
                            <Link to='/register'>Kayıt Ol</Link>
                        </li>
                        </>
                    ) : (
                    <>
                        <Cart/>
                        <SignOut/>
                    </>
                    )}
                </Menu>
                <DrawerToggleButton onClick={drawerClickHandler}/>
            </InlineContainer>
            
        </Wrapper>
    )
}

export default Header
