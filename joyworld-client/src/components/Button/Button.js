import React from 'react'

const Button = ({text,onClick,icon,...restProps}) => {
    return (
        <button style={{
            ...restProps,
            border:"2px solid #7d5fff",
            borderRadius:"10px"
            }}
            onClick={onClick}>
            {icon}
            {text} 
        </button>
    )
}

export default Button;
