import styled from 'styled-components';

export const ToggleButton = styled.button`
    margin-left: 15px;
    margin-bottom: 8px;
    display:flex;
    flex-direction: column;
    justify-content: space-around;

    height: 24px;
    width: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    box-sizing: border-box;

    &:focus {
        outline:none;
    }

    @media (min-width: 858px){
        display: none;
    }
`;

export const ToggleButtonLine = styled.div`
    width: 30px;
    height: 2px;
    background: white;
`;

export const Wrapper = styled.nav`
    height: 45%;
    background: rgb(24, 24, 24);
    box-shadow: 1px 0px 7px rgba(0,0,0,0.5);
    position:fixed;
    top:112px;
    left:0;
    width: 70%;
    max-width: 200px;
    z-index: 200;
    transform: ${(props) => props.show ? `translateX(0)` : `translateX(-100%)`};
    transition: transform 0.3s ease-out;
`;

export const SideDrawerList = styled.ul`
    height: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > li,
    & > div {
        margin: 0.5rem 0;
    }


    & > li a,
    & > div button {
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        padding:0;
        font-family: Sedgwick Ave, cursive;
    }


    & > li a:hover,
    & > li a:active {
        color: blue;
    }
`;