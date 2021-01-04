import React from 'react';
import {Wrapper} from './Backdrop.styles';

const Backdrop = ({onClick}) => {
    return (
        <Wrapper onClick={onClick}/>
    )
}

export default Backdrop
