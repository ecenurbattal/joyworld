import styled, {keyframes} from 'styled-components';

const animatedBackground= keyframes`
  from { background-position: 0 0; }
  to { background-position: 100% 0; }
`

// @keyframes animatedBackground {
// 	from { background-position: 0 0; }
// 	to { background-position: 100% 0; }

export const FormContainer = styled.form`
  display: flex;
  padding: 1em;

  flex-direction: column;

  & > * {
    margin-bottom: 15px;
  }
`;

export const Title = styled.p`
  font-size: 45px;
  color:white;
  margin-bottom: 20px;
  text-align: center;
`
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  width: 50%;
  height:450px;
  margin: auto;
  border: 1px solid #d3d3d3;
  border-radius: 60px;
  background-color: #8ac8d5;
  background-image:
  radial-gradient(rgba(76,139,152,1), rgba(138,201,214,.05) 200px, transparent 400px),
  radial-gradient(rgba(76,139,152,1), rgba(255,255,255,.1) 300px, transparent 400px),
  radial-gradient(rgba(76,139,152,1), rgba(138,201,214,.1) 400px, transparent 400px);
  background-size: 1000px 500px, 700px 500px, 700px 500px; 
  background-position: 0 -200px, 300px -100px, 700px -200px;
  animation: ${animatedBackground} 7s linear infinite;
`;


export const ErrorMessage = styled.p`
  color: #980c0c;
  text-align:center;
`;

export const RouteText = styled.p`
  text-align: center;
  margin-top: 40px;
  font-size: 18px;
  color:white;
`
