import styled from 'styled-components';
import {TiTick} from 'react-icons/ti';
import {ImCross} from 'react-icons/im';
import {BsTrash} from 'react-icons/bs';

export const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
`;


export const MenuWrapper = styled.ul`
    border-right:1px solid #999;
    padding:10px 0px;
    width:15rem;
    border-radius: 5px;
`;

export const MenuItem = styled.li`
    display:block;
    height:5rem;
    color:white;
    cursor:pointer;
    font-size:1.4rem;
    font-family:Passero One, cursive;
    text-align:center;
    background-color:${(props) => props.isActive ? '#34495e' : '#95a5a6'};

    &:hover,
    &:active {
        background-color:#34495e;
        color:white;
    }
`;

export const Content = styled.div`
    width:70%;
`;

export const ContentsWrapper = styled.div`
    min-height: 60vh;
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
    position:relative;
`;

export const ProfilePic = styled.img`
    margin-top:10px;
    height: 6rem;
    width: 6rem;
    object-fit: center;
    border-radius: 50%;
    border: 2px solid #fff;
`;

export const Name = styled.h1`
    color:white;
    text-align:center;
`;

export const Description = styled.p`
    color:white;
    text-align:center;
    @media(max-width:535px) {
        display:none;
    }
`;


export const Stats = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
`;

export const Stat = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin: 2.3vw;
`;

export const ProductsWrapper = styled.div`
    display:flex;
    flex-direction:row;
`;

export const ListItem = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background:#B33771;
    padding:7px;
    margin: 0px 0px 10px 12px;
    border-radius:10px;
    min-width: 175px;
    max-width: 375px;
`;


export const ListItemTitle = styled.h3`
    text-align:center;
    font-family:Passero One, cursive;
    margin:10px;
`;

export const ListItemNote = styled.div`
    font-size:16px;
    text-align:center;
    color:white;
    font-family:Passero One, cursive;

    & > strong {
        cursor: auto;
        color:#a29bfe;
    }

    width:auto;

    &:hover,
    &:active {
        color:white
    }
`;

export const ListItemText = styled.a`
    font-size:16px;
    text-align:center;
    color:${(props) => props.color ? props.color : 'white'};
    font-family:Passero One, cursive;

    & > strong {
        cursor: auto;
        color:#a29bfe;
    }

    &:hover,
    &:active {
        color:white
    }
`;

export const StyledTick = styled(TiTick)`
    font-size:22px;
    color:green;
    margin:5px;
    cursor:pointer;
`;

export const StyledCross = styled(ImCross)`
    font-size:18px;
    color:red;
    margin:5px;
    cursor:pointer;
`;

export const StyledTrash = styled(BsTrash)`
    font-size:18px;
    color:#d3d3d3;
    cursor:pointer;
`;

export const SectionWrapper = styled.div`
    display:flex;
    min-width:100%;
    justify-content:space-between;
`;

export const Section = styled.div`
    display:flex;
    flex-direction:column;
    min-height:70%;
    justify-content:center;
    align-items:center;
    min-width:30%;
    max-width:45%;
`;

export const VerticalLine = styled.div`
    border-left: 3px solid #d3d3d3;
    height: 80%;
    position: absolute;
    top: 25px;
    left:53.3%;
`;