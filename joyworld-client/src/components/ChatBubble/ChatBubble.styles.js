import styled from 'styled-components';

export const Bubble = styled.div`
    position: relative;
    font-family:Passero One, cursive;
    font-size: 18px;
    line-height: 24px;
    max-width: ${(props) => props.width ? props.width : '30rem'};
    min-width: 40%;
    background: ${(props) => props.background ? props.background : '#fff'};
    border-radius: 40px;
    padding: 24px;
    text-align: center;
    color: ${(props) => props.textColor ? props.textColor : '#000'};
    align-self:${(props) => props.direction==='right' ? 'flex-end' : 'flex-start'};
    cursor: ${(props) => props.onClick ? 'pointer' : ''};
`;

export const ChatBubbleWrapper = styled(Bubble)`
    &:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 24px solid ${(props) => props.background ? props.background : '#fff'};
        border-right: 12px solid transparent;
        border-top: 12px solid ${(props) => props.background ? props.background : '#fff'};
        border-bottom: 20px solid transparent;
        ${(props) => props.direction ? props.direction : 'left'}: 32px;
        transform: scaleX(${(props) => props.direction==='right' ? '-1' : '1'});
        bottom: -24px;
    }
`;