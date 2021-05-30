import styled from 'styled-components';

export const Wrapper = styled.div`
    display:flex;
    background-color: #34495e;
    margin: 10px;
`;

export const PageNumberWrapper = styled.a`
    color: #7f8c8d;
    padding: 8px 16px;
    text-decoration: none;
    cursor:pointer;

    &:active {
        background-color: #8e44ad;
    }

    &:hover {
        background-color: #ddd;
    }  
`;

export const OutsideWrapper = styled.div`
    display:flex;
    justify-content:center;
    margin-top:25px;
`;
