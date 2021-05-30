import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    padding: 0 2em;

    transition: top 0.5s;

    background-image: linear-gradient(
        to right, 
        red, 
        purple,
        purple,
        rgb(0, 200, 200), 
        rgb(50, 200, 130)
    );

    @media (max-width:475px){
        padding: 0;
    }
`;


export const InlineContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const Menu = styled.ul`
    display:flex;
    align-items:center;
    
    list-style:none;
    margin-left: ${(props) => props.margin};
    margin-top: 10px;


    & > li,
    & > div {
        display:inline;
        padding: 3px 20px 0 0 ;
        transition: 0.3s ease-in;
    }

    & > li:hover,
    & > li:active {
        background: rgba(255,255,255,0.3);
    }

    & > li a,
    & > div a,
    & > div button {
        text-decoration: none;
        color: #fff;
        font-family: Sedgwick Ave, cursive;
        font-size: 22px;
    }

    @media (max-width: 858px) {
        display: ${(props) => props.display};
        & > li a,
        & > div a,
        & > div button {
            font-size: 15px;
        }
    }
`

export const Title = styled.h1`
    margin:0;
    padding-top: 7px;
    color:#fff;
    text-align:center;
    font-family:Permanent Marker, cursive;
    font-size: 75px;
    cursor: pointer;

    transition: opacity 0.5s linear;
    visibility: ${(props) => props.showTitle ? 'hidden' : 'visible' };
    position: ${(props) => props.showTitle ? 'absolute' : '' };
    opacity: ${(props) => props.showTitle ? '0' : '1'};

    @media (max-width: 768px){
        font-size: 50px;
    }
`;
