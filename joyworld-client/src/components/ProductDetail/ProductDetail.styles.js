import styled from 'styled-components';
import {BiTime} from 'react-icons/bi';
import {BsPeopleCircle} from 'react-icons/bs';

export const Wrapper = styled.div`
    display:flex;
    justify-content:space-between;
    @media(max-width:960px){
       flex-direction:column;
    }
`;

export const InformationsWrapper = styled.div`
    min-width: 50%;
    max-width:50%;
    height:auto;
    background: #009FFF;
    background: linear-gradient(to right, #ec2F4B, #009FFF);
    color: white;
    clip-path: ellipse(100vw 60vh at 50% 50%);
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    padding:7px;
    margin-left: 30px;

    & > h1,h2,h3,h4,h5,h6 {
        text-align:center;
        font-family:Passero One, cursive;
        margin:10px;
    }

    & > div {
        & > p {
            margin:0 0 0 5px;
            padding:0;
            font-size:13px;
            color:#d3d3d3;
        }
    }

    @media(max-width:960px){
        min-width:100%;
        margin: 30px 0 0 0;
     }

`;

export const StyledTime = styled(BiTime)`
    color:#d3d3d3;
    font-size:15px;
`;

export const StyledCircle = styled(BsPeopleCircle)`
    color:white;
    font-size:15px;
    align-self:center;
    color:#d3d3d3;
`;

export const UserInformationWrapper = styled.div`
    display:flex;
    justify-content:flex-end;
    min-width:100%;

    & > a {
        align-self:end;
        font-size:16px;
        color:#d3d3d3;
        margin:7px 20px 7px 7px;
        font-family:Passero One, cursive;
    }
`;

export const Tag = styled.p`
    align-self:end;
    font-size:16px;
    color:#d3d3d3;
    margin:7px 20px 7px 7px;
    font-family:Passero One, cursive;
`;



// export const StyledDate = styled.p`
//     margin:0;
//     padding:0;
//     font-size:15px;
//     color:#d3d3d3;
// `