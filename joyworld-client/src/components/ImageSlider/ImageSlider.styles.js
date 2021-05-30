import styled from 'styled-components';
import {FaArrowAltCircleLeft,FaArrowAltCircleRight} from 'react-icons/fa';

export const Slider = styled.section`
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width:45%;
    min-height:500px;
    max-height:500px;

    @media(max-width:960px){
        max-width:100%;
    }
`;

export const Image = styled.img`
    min-width:100%;
    max-width:100%;
    min-height:500px;
    max-height:500px;
    border-radius: 10px;
`;

export const StyledRightArrow = styled(FaArrowAltCircleRight)`
    position: absolute;
    right:0;
    align-self:center;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
    color:white;
`;

export const StyledLeftArrow = styled(FaArrowAltCircleLeft)`
    position: absolute;
    left: 0;
    align-self:center;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
    color:white;
`;

export const Slide = styled.div`
    opacity: ${(props) => props.isActive ? '1' : '0'};
    transition-duration: 1s ${props => !(props.isActive) && 'ease'};
    transform: ${(props) => props.isActive&& 'scale(1.08)'};
    max-width:100%;
`;