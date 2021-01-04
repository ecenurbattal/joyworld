import styled from 'styled-components';

export const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    background-color:#d3d3d3;
`;


export const Container = styled.div`
    display:flex;
    flex-direction:column;
    height: 100%;
    border: 3px solid black;
    background-color:${(props) => props.color};
    & > p {
        margin:3px;
        padding:0;
        color:white;
    }
`

export const Image = styled.img`
    width:80%;
    height:650px;
    border: 3px solid #d3d3d3;
    margin-left:125px;
    &:hover {
        border: 2px solid #a00b42;
    }
`;

export const CharacterName = styled.p`
    font-size: 75px;
    font-weight: 900;
    text-align:center;
    font-family:Permanent Marker, cursive;
`;

export const Content = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding:10px;
`;

export const DetailTitle = styled.p`
    font-weight:800;
    margin-right:3px;
    text-align:center;
    color: ${(props) => props.color}
`;

export const InlineContent = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`