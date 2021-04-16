import styled from 'styled-components';

export const PageWrapper = styled.div`
    height:100%;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: #d4418e;
    background-image: linear-gradient(315deg, #d4418e 5%, #0652c5 85%);
    border: 5px solid #d3d3d3;
    border-radius: 5px;
    cursor: pointer;
`;

export const PageTitle = styled.div`
    display:flex;
    justify-content:center;
    font-size: 3vw;
    width:100%;
    height:15%;
    margin: 20px 0 20px 0;
    font-family: Sedgwick Ave, cursive;
    color:${(props) => props.color ? props.color : 'white'};
`;

export const PageContent = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 15px;
    color:white;
    width:100%;
    height: 72%;
`;

export const PageFooter = styled.div`
    display:flex;
    justify-content:center;
    font-size:12px;
    color: #d3d3d3;
    width:100%;
    height:10%;
    position:absolute;
`

export const PageCoverTitle = styled.div`
    display:flex;
    justify-content:center;
    font-size: ${(props) => props.fontSize ? props.fontSize : '5vw'};
    width:100%;
    height:20%;
    margin-top: 20px;
    font-family:Permanent Marker, cursive;
    color:white;
    text-align:center;
    margin-bottom:10px;
`;

export const PageCoverImage = styled.img`
    width: 100%;
    height: 70%;
`;