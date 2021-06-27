import styled from "styled-components";


export const Wrapper = styled.div`
    height: 65vh;
    display: flex;
    background: #009FFF;
    background: linear-gradient(to right, #ec2F4B, #009FFF);
`;

export const ChatMenu = styled.div`
    flex:3.5;
    @media (max-width: 768px) {
        flex: 1;
    };
`;
  
export const ChatBox = styled.div`
    flex: 5.5;

    @media (max-width: 768px) {
        flex: 10;
    };
`
  
export const ChatBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    padding: 10px;
    height: 100%;
`
  
export const ChatBoxTop = styled.div`
    height: 100%;
    overflow-y: scroll;
    padding-right: 10px;
`
  
export const ChatBoxBottom = styled.div`
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
  
export const ChatMessageInput = styled.textarea`
    width: 80%;
    height: 50px;
    padding: 10px;
    margin:10px;
`
  
export const StyledChatWrapper = styled.div`
    padding: 10px;
    height: 100%;
`;
  
export const NoConversationText = styled.span`
    font-size: 50px;
    color: rgb(224, 220, 220);
    cursor: default;
    text-align:center;
    font-family:Passero One, cursive;
    margin:10px;
`;

export const NoConversationWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;