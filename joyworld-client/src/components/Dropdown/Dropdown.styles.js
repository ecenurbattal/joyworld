import styled from 'styled-components';

export const Wrapper = styled.div`
    &:hover {
        & > div {
            display: flex;
            flex-direction: column;
        }
    }
`;

export const DropButton = styled.button`
    font-size: 16px;  
    border: none;
    outline: none;
    color: white;
    padding: 14px 16px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
`;

export const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: black;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;

    & > a {
        padding: 12px 16px;
        text-decoration: none;
        text-align: center;

        &:hover,
        &:active {
            background: rgba(255,255,255,0.3)
        }
    }

`;