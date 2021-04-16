import styled from 'styled-components';


export const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    margin:40px 0px 15px 15px;
`
export const ItemWrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    @media(max-width:523px) {
        margin-bottom: 20px;
    }
`;

export const ItemInformationWrapper = styled.div`
    display:flex;
    flex-direction:${(props) => props.direction==='right' ? 'row-reverse' : 'row'};
`;

export const AuthorPic = styled.img`
    height: 4rem;
    width: 4rem;
    object-fit: center;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-top:17px;
`;

export const ItemInformation = styled.div`
    display:flex;
    flex-direction: column;
    padding:10px 15px 0px 15px; //top,right,bottom,left
    margin:20px 2.5px 0px 2.5px;

    max-height:55px;

    @media(max-width:523px) {
        display:none;
    }

    & > p,
    & > a,
    & > h6 {
        color:white;
        font-size:12px;
        margin:0;
        padding:0;
        text-align:center;
    }

    & > p,
    & > a {
        font-family: "Comic Sans MS", "Comic Sans", cursive;
    }


    background: linear-gradient(135deg, #4b384c 15%,#da5de2 100%);
    border-radius: 15px;
`;


