import styled from 'styled-components';

export const ContainerWrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: center;
    margin-top: 5vh;
    

    @media (max-width:767px) {
        flex-direction: column;
    }

`;

export const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    border: 2px solid white;
    width: 45%;

    @media (max-width:767px) {
        width: 100%;
    }
    
    background: rgba(200,50,150,0.3)

`;

export const Title = styled.div`
    font-size:30px;
    color:white;
    text-align: center;
    font-weight: 900;
    margin: 5px;
`;

export const ItemWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin: 10px;
    padding: 15px;

    @media (max-width:767px) {
        width: 100%;
    }

    width: 90%;

    transition: 0.3s ease-out;
    &:hover {
        width: 96%;
        height: 330px;
    }

    border-radius: 20px;

    background-color #861657;
    background-image linear-gradient(326deg, #861657 0%, #ffa69e 74%);

`;

export const ItemImage = styled.img`
    width:100%;
    height:220px;
`;

export const ItemTitle = styled.a`
    font-size: 20px;
    color:white;
    width: 100%;
    font-family:Passero One, cursive;
    text-align: center;
    margin-top: 10px;
`;