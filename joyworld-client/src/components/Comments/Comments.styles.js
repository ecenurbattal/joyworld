import styled from 'styled-components';
import {BsCircleFill} from 'react-icons/bs';
import {FaPenAlt} from 'react-icons/fa';

export const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    //background:#36adb5;
    min-width:100%;
    margin-top:50px;
    border-radius:15px;
    padding: 17px;
`;

export const Title = styled.h1`
    color:white;
    font-family:Passero One, cursive;
    margin-left:10px;
    max-width:200px;
    font-size:3.5rem;
    text-shadow:3px 3px gray;
`;

export const ItemWrapper = styled.div`
    display:flex;
    flex-direction:column;
    background: linear-gradient(135deg, #4b384c 15%,#da5de2 100%);
    margin:10px 10px 10px 0px;
    min-width:100%;
    align-self:flex-start;
    padding:10px 15px 5px 15px;
    border-radius:15px;
`;

export const CommentBody = styled.p`
    font-size:17px;
    color:white;
    font-family: "Comic Sans MS", "Comic Sans", cursive;

    transition:0.3s ease-in;
    
    &:hover {
        font-size:17.5px;
        text-shadow:2px 2px black;
    }
`;

export const CommentInfoBar = styled.div`
    display:flex;
`;

export const CommentAuthor = styled.a`
    font-size:15px;
    color:white;
    cursor:pointer;
    font-family:Passero One, cursive;
`;

export const StyledCircle = styled(BsCircleFill)`
    color:white;
    font-size:8px;
    margin:5px;
`;

export const CommentDate = styled.p`
    font-size:15px;
    color:white;
    font-family:Passero One, cursive;
`;

export const StyledPen = styled(FaPenAlt)`
    color:white;
    font-size:15px;
    position:absolute;
    align-self:flex-end;
    cursor:pointer;
`;

export const IconsWrapper = styled.div`
    display:flex;
    align-self:flex-end;

    & > * {
        color:white;
        font-size:15px;
        cursor:pointer;
        margin-left:10px;
    }
`;


export const StyledTextArea = styled.textarea`
    min-width:100%;
    min-height:200px;
    margin-top:10px;
    background:#d3d3d3;
`;

export const AddCommentWrapper = styled.div`
    display:flex;
    flex-direction:column;
    min-width:70%;
    align-self:center;
`;