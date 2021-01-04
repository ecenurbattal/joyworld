import React from 'react'

const Button = ({text,onClick,role,icon,...restProps}) => {
    return (
        <button style={{
            ...restProps,
            border:"1px solid #d3d3d3",
            boxShadow:"0 0 5px 5px #d3d3d3",
            }}
            role={!!role ? (role) : ("button")}
            onClick={onClick}>
            {icon}
            {text} 
        </button>
    )
}

export default Button;
