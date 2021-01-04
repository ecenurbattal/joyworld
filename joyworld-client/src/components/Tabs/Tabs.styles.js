import styled from 'styled-components';

export const Wrapper = styled.div`
  width:100%;
  height: 100%;
`;

export const TabButtons = styled.div`
  display: flex;
  justify-content:center;
`;

export const TabButton = styled.button`
  margin-left: 10px;
  background-image:
    linear-gradient(
        to right, 
        red, 
        purple,
        purple,
        rgb(0, 200, 200), 
        rgb(50, 200, 130)
    );
  width: 150px;
  height: 50px;
  font-family: Sedgwick Ave, cursive;
  font-size: 20px;
  font-weight:500;

  @media (max-width: 376px){
    font-size: 15px;
  }

  border: 1px solid ${(props) => (props.isActive ? 'red' : 'gray')};
  color: ${(props) => (props.isActive ? 'red' : 'white')};
`;

export const TabContent = styled.div`
  display: flex;
  justify-content:center;
  padding: 2em;
  margin-top: 10px;
  width: 100%;
  height:100%;
  background: url(${(props) => props.bgImage});
  background-size:cover;
  background-repeat:no-repeat;
  border-radius:10px;

  border: 7px solid #d3d3d3;
`;

export const TabInlineWrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
`;

export const TabInlineContent = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  font-size:30px;
  font-weight:800;
  font-family:Passero One, cursive;
  text-align: center;

  @media (max-width: 768px){
    font-size: 20px;
  }

  @media (max-width: 376px){
    font-size: 17px;
  }

  & > a {
    font-size: 35px;
    color: white;
    text-align: center;
    margin-top: 1rem;
  }
`;
