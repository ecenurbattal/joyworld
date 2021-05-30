import React from 'react'
import { ButtonWrapper } from './Button.styles';

const Button = ({text,onClick,icon,disabled,...restProps}) => {
    return (
        <ButtonWrapper style={{ ...restProps }}
            disabled={disabled}
            onClick={onClick}>
            {icon}
            {text} 
        </ButtonWrapper>
    )
}

export default Button;
