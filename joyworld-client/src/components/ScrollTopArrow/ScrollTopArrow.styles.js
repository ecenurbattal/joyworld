import styled, {keyframes} from 'styled-components';
import {FaArrowCircleUp} from 'react-icons/fa';

const fadeIn = keyframes`
    0% { 
        opacity:0;
    }
    100% { 
        opacity: 0.5;
    }
`

export const StyledFaArrowCircleUp = styled(FaArrowCircleUp)`
    position: fixed;
    color:purple;
    width: 100%;
    bottom: 55px;
    height: 50px;
    z-index: 1000;
    cursor: pointer;
    animation: ${fadeIn} 0.3s;
    transition: opacity 0.4s;
    opacity: 0.5;
    display: ${(props) => props.showScroll ? 'block' : 'none'};

    &:hover {
        opacity:1;
    }
`;