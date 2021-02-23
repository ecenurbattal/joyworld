import React from 'react'
import {Wrapper} from './SignOut.styles';
import {logout} from '../../services/Auth/authService';

const SignOut = () => {
    const handleSignOutClick = () => {
        logout();
    }
    return (
        <Wrapper>
            <a onClick={handleSignOutClick} href="/">Çıkış Yap</a>
        </Wrapper>
    )
}


export default SignOut
