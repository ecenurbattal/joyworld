import styled from 'styled-components';
import {FaFilter} from 'react-icons/fa';

export const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-left:auto;
`
export const StyledFaFilter = styled(FaFilter)`
    color: ${(props) => props.color ? props.color : 'white'};
    margin-right: 15px;
    font-size:25px;
`;

export const StyledSelect = styled.select`
    background: ${(props) => props.background ? props.background : 'white'};
    color: ${(props) => props.color ? props.color : 'black'};
    min-height: 40px;
    border:2px solid #7d5fff;
    border-radius: 10px;
    font-family: Passero One, cursive;
`;
//linear-gradient(135deg, #632c65 15%,#56a5e2 100%);