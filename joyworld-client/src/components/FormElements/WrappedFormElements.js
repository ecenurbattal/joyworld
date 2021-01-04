import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  padding: 1em;

  flex: 1;
  flex-direction: column;

  & > * {
    margin-bottom: 15px;
  }
`;

export const Box = styled.div`
  display: flex;
  align-items:center;
  width: 70%;
  height:450px;
  margin: auto;
  border: 1px solid #d3d3d3;
  background:#d3d3d3;
`;


export const ErrorMessage = styled.p`
  color: #980c0c;
  text-align:center;
`;

export const RouteText = styled.p`
  text-align: center;
  margin-top: 40px;
  font-size: 18px;
`
