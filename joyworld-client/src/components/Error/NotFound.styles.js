import styled from 'styled-components';
import {FaQuestionCircle} from 'react-icons/fa'

export const Wrapper = styled.div`
    margin-top: 45px;
    display:flex;
    flex-direction: column;
    width: 100%;
    justify-content:center;
    align-items:center;
`;

export const Wrapper404 = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
`;

export const Number = styled.div`
    color: #ffffff;
    font-size: 11rem;

    @media (max-width:470px) {
        font-size: 7rem;
    }
`;

export const QuestionCircle = styled(FaQuestionCircle)`
    font-size: 8.5rem;
    color: #ffffff;

    @media (max-width:470px) {
        font-size: 7rem;
    }
`;

export const Message = styled.div`
    margin-top:18px;
    color:white;  
    text-align: center;
    font-family: Sedgwick Ave, cursive;
    font-size: 1.6rem;
    width: 75%;

    @media (max-width:470px) {
        font-size: 1.3rem;
    }
`;