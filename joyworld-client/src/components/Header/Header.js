import React, { useContext, useEffect, useState } from 'react';
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

    const [showTitle,setShowTitle] = useState(false);

    useEffect(()=>{
        window.addEventListener('scroll', checkScrollTop)
        return function cleanup() {
            window.removeEventListener('scroll', checkScrollTop)
        }
    })

    const checkScrollTop = () => {
        if (!showTitle && window.pageYOffset > 120){
            setShowTitle(true)
        } else if (showTitle && window.pageYOffset <= 120){
            setShowTitle(false)
        }
    };


    const handleTitleClick = () => {
        history.push('/');
    }
    return (
        <Wrapper showTitle={showTitle}>
            <Title showTitle={showTitle} onClick={handleTitleClick}>JoyWorld</Title>
            <InlineContainer>
                <DrawerToggleButton onClick={drawerClickHandler}/>
                <Menu display="none" margin="0">
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
                <Menu margin="auto">
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
               
            </InlineContainer>
            
        </Wrapper>
    )
}

export default Header
