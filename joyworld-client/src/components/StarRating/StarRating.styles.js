import styled from "styled-components";

export const Star = styled.span`
    display:inline-block;
    cursor: pointer;
    background:transparent;
    user-select:none;

    color: ${(props) => props.isActive ? 'gold' : '#d3d3d3'};
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    font-size: ${(props) => props.size}px;
`;

