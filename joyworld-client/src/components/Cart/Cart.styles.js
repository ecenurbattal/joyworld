import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const CartContent = styled.div`
  position: absolute;
  top: 125%;
  right: 30%;

  display: flex;
  padding: 10px;
  width: 400px;
  border: 1px solid #d3d3d3;

  background: #fff;

  flex-direction: column;
  visibility: ${(props) => (props.isOpen ? `visible` : `hidden`)};
`;

export const CartContentList = styled.ul`
  list-style-type: none;
`;

export const CartContentListItem = styled.li`
  display: flex;
  padding: 10px;
`;

export const Image = styled.img`
  width: 100px;
  height: 60px;
  padding: 10px 5px 0;
`;

export const CartContentDetail = styled.div`
  display: flex;

  flex-direction: column;
`;
