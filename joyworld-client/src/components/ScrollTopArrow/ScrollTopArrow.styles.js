import styled, {keyframes} from 'styled-components';
import {FaArrowCircleUp} from 'react-icons/fa';

const fadeIn = keyframes`
    from { opacity: 0% 0; }
    to { opacity: 100% 0.5; }
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
    display: ${(props) => props.showScroll ? 'flex' : 'none'};

    &:hover {
        opacity:1;
    }
`;

// export const deneme = styled(FaArrowCircleUp)`
//     position: fixed; 
//     width: 100%;
//     bottom: 20px;
//     align-items: center;
//     height: 20px;
//     justify-content: center;
//     z-index: 1000;
//     cursor: pointer;
//     animation: ${fadeIn} 0.3s;
//     transition: opacity 0.4s;
//     opacity: 0.5;

//     &:hover {
//         opacity:1;
//     }
// `;
