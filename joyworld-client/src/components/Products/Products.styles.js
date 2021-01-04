import styled from 'styled-components';

export const Wrapper = styled.div`
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 5px;
`;

export const CardWrapper = styled.div`
    width: 250px;
    min-height: 320px;
    background: white;

    justify-self: center;

    border: 1px solid #d3d3d3;
    margin-bottom: 20px;
    box-shadow: 0 0 5px 5px #d3d3d3;

    outline: none;

    transition: 0.25s;

    &:hover {
    border: 3px solid #a00b42;

    -webkit-transform: rotate(5deg);
    -moz-transform: rotate(5deg);
    -o-transform: rotate(5deg);
    transform: rotate(5deg);
    }
`;

export const CardContent = styled.div`
    padding: 1.5em 1em;
    display:flex;
    flex-direction:column;
    justify-content:center;
`;
