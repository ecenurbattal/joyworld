import styled from 'styled-components';

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
    align-items:center;
    justify-content:center;
    background:#B33771;
    padding:7px;
    margin: 0px 0px 10px 12px;
    border-radius:10px;
    min-width: 175px;
`;

export const ListItemText = styled.a`
    font-size:16px;
    text-align:center;
    color:white;
    font-family:Passero One, cursive;

    &:hover,
    &:active {
        color:white
    }
`;