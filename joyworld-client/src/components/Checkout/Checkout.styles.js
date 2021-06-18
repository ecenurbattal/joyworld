import styled from 'styled-components';

export const Wrapper = styled.div`
    min-height: 60vh;
    height:auto;
    background: #009FFF;
    background: linear-gradient(to right, #ec2F4B, #009FFF);
    color: white;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    padding:7px;
    position:relative;

    & > h2 {
        color:#B33771;
        font-family:Passero One, cursive;
        font-weight:700;
    }
`

export const ItemContent = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:80%;

    

    & > h2 {
        color:#B33771;
        font-family:Passero One, cursive;
        font-weight:700;
    }

    & > h3,h4 {
        font-family: "Comic Sans MS", "Comic Sans", cursive;
        font-size: 19px;
    }
`

export const ItemWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    width:90%;
    
    justify-content:space-between;
    margin-top:15px;
    background:transparent;
    transition: 0.25s;
    &:hover {
        border: 3px solid black;
        -webkit-transform: rotate(-3deg);
        -moz-transform: rotate(-3deg);
        -o-transform: rotate(-3deg);
        transform: rotate(-3deg);
    }
`

export const ItemImage = styled.img`
    width:400px;
    height:250px;
    border: 3px solid #d3d3d3;
`
