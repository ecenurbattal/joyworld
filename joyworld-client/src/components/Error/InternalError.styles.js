import styled from 'styled-components';
import flame from '../../images/flame.png';
import desktop from '../../images/desktop-pc.png'

export const Wrapper = styled.div`
    display:flex;
    color: #fff;
    justify-content:center;
`;

export const Box = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`;

export const Img = styled.div`
    width: 175px;
    height: 175px;
    background: url(${flame}) no-repeat center/125px 125px, transparent url("${desktop}") no-repeat center/153px 153px;
`;

export const Status = styled.p`
    font-size: 7.5em;
`;

export const Message = styled.p`
    font-size:2em;

    & > a {
        border-bottom: 1px dashed #216f79;
        font-style: italic;
        text-decoration: none;
        color: #216f79;

        &:hover {
            text-shadow: 0 0 6px #216f79;
        }
    }

`;

