import styled,{keyframes} from 'styled-components';

const hover = keyframes`
    0% {
        transform: scale(.5);
        color: #121212;
        -webkit-text-stroke: 2px gray;
    }

    20% {
    transform: scale(1);
    color: pink;
    -webkit-text-stroke: 3px red;
    filter: drop-shadow(0 0 1px black)drop-shadow(0 0 1px black)drop-shadow(0 0 3px red)drop-shadow(0 0 5px red)hue-rotate(10turn);
    }

    50% {
    transform: scale(.5);
    color: #121212;
    -webkit-text-stroke: 2px gray;
    }
`

export const Wrapper = styled.div`
    text-align: center;
    padding-top:175px;
    width: 100%;
    display:flex;
    justify-content:center;
    align-items:center;
`;

export const Letter = styled.p`
    display: inline-block;
    text-transform: uppercase;
    text-align: center;
    font-size: 8vw;
    font-family: arial;
    font-weight: 600;
    transform: scale(.5);
    color: #d3d3d3;
    -webkit-text-stroke: 2px gray;

    animation: ${hover} 1s linear infinite ${(props) => props.index*0.125}s;

`;

// ${(props) => Math.floor(props.index*0.125)}.${(props) => (props.index*0.125)%1}s;
// `;
