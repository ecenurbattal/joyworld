import styled from 'styled-components';


export const Content = styled.div`
    display:flex;
    flex-direction:column;
    padding:10px;
    @media (min-width:976px) {
        font-size:1.15vw;
    }
    @media (max-width:976px) {
        font-size:0.55vw;
    }
    @media (max-width:527px) {
        font-size:1.5vw;
    }
    font-family:Passero One, cursive;
    margin-bottom:20px;
`;

export const DetailTitle = styled.p`
    font-weight:800;
    margin-right:3px;
    text-align:center;
    color: ${(props) => props.color}
`;

export const InlineContent = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

