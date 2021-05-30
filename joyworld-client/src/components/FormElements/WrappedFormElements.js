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

  min-width:70%;

  flex-direction: column;
  justify-content:center;
  align-items:center;

  & > * {
    margin-bottom: 15px;
  }
`;

export const Title = styled.p`
  font-size: 45px;
  color:white;
  margin-bottom: 20px;
  text-align: center;
  font-family:Passero One, cursive;
`

export const SubTitle = styled.p`
  font-size:30px;
  font-weight:600;
  color:white;
  margin:10px;
  font-family: Sedgwick Ave, cursive;
  align-self:${(props) => props.align ? props.align : 'flex-start'}
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  width: 75%;
  height:auto;
  min-height:500px;
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

export const Message = styled.p`
  color:purple;
  text-align:center;
  margin-top:7px;
  font-weight:600;
`;

export const RouteText = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
  color:white;
`

export const StyledTextArea = styled.textarea`
    min-width:100%;
    min-height:${(props) => props.minHeight ? props.minHeight : '200px'};
    max-height:${(props) => props.maxHeight ? props.maxHeight : '250px'};
    margin-top:10px;
    border: 2px solid #861657;
    border-radius:10px;
`;

export const RowWrapper = styled.div`
  display:flex;
  flex-wrap:wrap;
  min-width:100%;
  justify-content:center;
`;

export const ColumnWrapper = styled.div`
  display:flex;
  flex-direction:column;
  min-height:100vh;
`;

