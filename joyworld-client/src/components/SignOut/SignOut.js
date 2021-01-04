import React, { useContext } from 'react'
import SessionContext from '../../contexts/SessionContext';
import {Wrapper} from './SignOut.styles';

const SignOut = () => {
    const {setAuthenticated} = useContext(SessionContext);
    const handleSignOutClick = () => {
        setAuthenticated(false);
    }
    return (
        <Wrapper>
            <a onClick={handleSignOutClick} href="/">Çıkış Yap</a>
        </Wrapper>
    )
}


export default SignOut
