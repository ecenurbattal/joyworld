import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: rgb(245, 243, 243);
    };
`;

export const ConversationImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;

export const ConversationName = styled.span`
    font-weight: 600;

    @media (max-width:768px){
        display:none;
    }

`;

export const ConversationOnline = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: limegreen;
    position: absolute;
    top: 2px;
    right: 2px;
`;

export const ConversationImageContainer = styled.div`
    position: relative;
    margin-right: 10px;
`;

