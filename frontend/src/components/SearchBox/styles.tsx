import styled from 'styled-components';

export const StyledInputContainer = styled.div`
  /* background: #362323; */

  position: relative;
  display: inline-block;
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: flex-end;
  transition: min-height .3s ease-in-out;
`;

export const StyledInputContainerExpanded = styled(StyledInputContainer)`
  justify-content: center;
  align-items: center;
  /* height: 50%; */
  min-height: 600px;
`;

export const StyledInputContainerReduced = styled(StyledInputContainer)`
  /* min-height: 70px; */
`;

export const StyledInput = styled.div`
/* background: darkblue; */

  position: relative;
  display: inline-block;
  /* margin: 30px; */
  margin-right: 30px;


  @media (max-width: 480px) {
    margin-right: 0;
  }
`;

export const Input = styled.input`
  border: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid var(--white);
  color: var(--white);
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
  fill: var(--white);
`;