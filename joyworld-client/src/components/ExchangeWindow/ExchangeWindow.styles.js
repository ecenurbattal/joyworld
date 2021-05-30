import styled from 'styled-components';

export const Wrapper = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    width:100%;
`;

export const ExchangeContent = styled.div`
    position:absolute;
    top:40px;
    display:flex;
    flex-direction:column;
    align-items:center;
    min-width:100%;
    min-height:200px;
    border: 1px solid #d3d3d3;
    background:#191919;
    visibility: ${(props) => (props.isOpen ? `visible` : `hidden`)};

    & > p,a {
        color:white;
        font-family:Passero One, cursive;
        margin:5px;
    }
`;