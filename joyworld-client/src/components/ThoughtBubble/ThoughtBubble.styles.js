import styled from 'styled-components';

//top,right,bottom,left

export const Main = styled.div`
    margin:20px;
    position: relative;
    font-family:Passero One, cursive;
    font-size: 20px;
    line-height: 24px;
    max-width: ${(props) => props.width ? props.width : '30rem'};
    min-width: 40%;
    background: ${(props) => props.background ? props.background : '#fff'};
    border-radius: 30px;
    padding: 24px;
    text-align: center;
    color: ${(props) => props.textColor ? props.textColor : '#000'};
    text-shadow:2px 2px black;
`

export const Thought = styled(Main)`
    &:before,
    &:after {
        content:"";
        background: ${(props) => props.background ? props.background : '#fff'};
        border-radius:50%;
        position:absolute;
        z-index:1;
    }

    &:before {
        width:40px;
        height:40px;
        top:-15px;
        left:28px;
        box-shadow:-50px 30px 0 -12px ${(props) => props.background ? props.background : '#fff'};
    }

    &:after {
        bottom:-10px;
        right:22px;
        width:30px;
        height:30px;
        box-shadow:35px -55px 0 0 ${(props) => props.background ? props.background : '#fff'},
                -28px -6px 0 -2px ${(props) => props.background ? props.background : '#fff'},
                -24px 17px 0 -6px ${(props) => props.background ? props.background : '#fff'},
                -5px 25px 0 -10px ${(props) => props.background ? props.background : '#fff'};
    }
`;

