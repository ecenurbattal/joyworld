import styled from 'styled-components';
import {BsPeopleCircle} from 'react-icons/bs';
import {BiTime} from 'react-icons/bi';
export const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

export const PostContent = styled.p`
    display:flex;
    flex-direction:column;
    color:white;
    font-size:17px;
    text-align:center;
    font-family: "Comic Sans MS", "Comic Sans", cursive;
    min-width:100%;
    
    background: linear-gradient(135deg, #632c65 15%,#56a5e2 100%);
    padding:25px 35px 25px 25px;
    border-radius:15px;
    border: 2px solid #B33771;
    transition:0.3s ease-in;

    &:hover {
        //background:#36adb5;
        text-shadow:2px 2px black;
        font-size:17.5px;
    }
;`

// export const StyledInput = styled.textarea`
//     display:flex;
//     flex-direction:column;
//     color:white;
//     font-size:17px;
//     text-align:center;
//     font-family: "Comic Sans MS", "Comic Sans", cursive;
//     min-width:100%;
//     min-height:27vh;
//     margin-bottom:20px;

//     background: linear-gradient(135deg, #632c65 15%,#56a5e2 100%);
//     padding:25px 35px 25px 25px;
//     border-radius:15px;
//     border: 2px solid #B33771;
// `;


export const InfoBarWrapper = styled.div`
    display:flex;
    align-self:flex-start;
    width:100%;
`;

export const InfoBar = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    background:#B33771;
    padding:7px;
    margin-left:12px;
    border-radius:10px;
    min-width: 80px;
`;

export const StyledCircle = styled(BsPeopleCircle)`
    color:white;
    font-size:15px;
`;

export const StyledTime = styled(BiTime)`
    color:white;
    font-size:15px;
`;

export const Info = styled.a`
    font-size:16px;
    text-align:center;
    color:white;
    cursor:pointer;
    font-family:Passero One, cursive;
`;

export const CreateDate = styled.p`
    font-size:16px;
    text-align:center;
    color:white;
    margin:0px 0px 0px 7px;
    padding:0;
    font-family:Passero One, cursive;
`;

export const IconsWrapper = styled.div`
    margin:45px 15px -65px 0px;
    display:flex;
    align-self:flex-end;

    & > * {
        color:white;
        font-size:25px;
        cursor:pointer;
        margin-left:15px;
    }
`;

