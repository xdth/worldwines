import styled from 'styled-components';

export const StyledInputContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  display: flex;
  justify-content: flex-end;  
  background: gray;
`;

export const StyledInputContainerExpanded = styled(StyledInputContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
`;

export const StyledInputContainerReduced = styled(StyledInputContainer)`
`;

export const StyledInput = styled.div`
  position: relative;
  display: inline-block;
  background: darkblue;
  margin: 30px;
  margin-right: 30px;
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
  text-align: center;
`;

export const InputExpanded = styled(Input)`
  width: 600px;
`;

export const InputReduced = styled(Input)`
  width: 300px;
`;

export const MagnifyingGlass = styled.svg`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  fill: white;
`;