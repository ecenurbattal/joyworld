import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    padding: 0 2em;


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


    & > li,
    & > div {
        display:inline;
        padding: 3px 20px 0 0 ;
    }

    & > li:hover,
    & > li:active {
        background: rgba(0,0,0,0.2);
        
    }

    & > li a,
    & > div a {
        text-decoration: none;
        color: #fff;
        font-family: Sedgwick Ave, cursive;
        font-size: 22px;
    }

    @media (max-width: 768px) {
        display: ${(props) => props.display};
        & > li a,
        & > div a {
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

    @media (max-width: 768px){
        font-size: 50px;
    }
`;
