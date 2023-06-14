import styled from 'styled-components';

export const StyledInput = styled.div`
  position: relative;
  display: inline-block;
`;

export const Input = styled.input`
  border: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid white;
  color: white;
  background-color: transparent;
  outline: none;
  padding-right: 30px;
  width: 200px;
  text-align: center;
`;

export const MagnifyingGlass = styled.svg`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  fill: white;
`;