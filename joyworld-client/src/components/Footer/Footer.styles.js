import styled from 'styled-components';

export const Wrapper = styled.div`
    left: 0;
    bottom: 0;  
    width:100%;
    height:50px;
    padding: 0.1em 2em;
    background-image:
    linear-gradient(
        to right, 
        red, 
        purple,
        purple,
        rgb(0, 200, 200), 
        rgb(50, 200, 130)
    );
`;

export const Text = styled.div`
        text-align:center;
        color:white;
        font-size:20px;
        font-weight:600;
`