import styled from 'styled-components';

export const Wrapper = styled.img`
    //background-color: ${props => props.boxColor ? props.boxColor : '#d3d3d3'};
    border: 2px solid;
    border-color:${props => props.boxColor ? props.boxColor : '#d3d3d3'};
    border-radius: 5px;
    color: #FFF;
    width: 180px;
    height: 150px;
    margin:5px;
    cursor: -webkit-grab;
    cursor: grab;
`;