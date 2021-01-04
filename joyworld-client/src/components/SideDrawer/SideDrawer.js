import React, {useContext} from 'react';
import {Wrapper, SideDrawerList} from './SideDrawer.styles';
import SessionContext from '../../contexts/SessionContext';
import Cart from '../Cart/Cart';
import SignOut from '../SignOut/SignOut';

const SideDrawer = ({show}) => {
    const {isAuthenticated} = useContext(SessionContext);

    return (
        <Wrapper show={show}>
            <SideDrawerList>
                {!isAuthenticated ? (
                    <>
                        <li>
                            <a href='/login'>Giriş Yap</a>
                        </li>
                        <li>
                            <a href='/register'>Kayıt Ol</a>
                        </li>
                        </>
                    ) : (
                    <>
                        <Cart/>
                        <SignOut/>
                    </>
                    )}
            </SideDrawerList>
        </Wrapper>
    )
}

export default SideDrawer
