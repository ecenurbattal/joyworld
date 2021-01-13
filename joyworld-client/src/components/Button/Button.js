import React from 'react'
import { ButtonWrapper } from './Button.styles';

const Button = ({text,onClick,icon,...restProps}) => {
    return (
        <ButtonWrapper style={{ ...restProps }}
            onClick={onClick}>
            {icon}
            {text} 
        </ButtonWrapper>
    )
}

export default Button;
