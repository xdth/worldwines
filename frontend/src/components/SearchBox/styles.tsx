import styled from 'styled-components';

export const StyledInputContainer = styled.div`
  background: #362323;
  background-color: var(--background);
  position: relative;
  display: inline-block;
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: flex-end;
  transition: height .8s ease-in-out;

  &.expanded {
    justify-content: center;
    align-items: center;
    height: 600px;
  }

  &.reduced {
    height: 20px;
  }
`;

export const StyledInput = styled.div`
  background: green;

  position: relative;
  display: inline-block;
  margin-right: 30px;

  @media (max-width: 480px) {
    margin-right: 0;
  }
`;

export const Input = styled.input`
  background: darkblue;

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

export const MagnifyingGlass = styled.svg`
  /* position: absolute;
  top: 50%; */
  right: 5px;
  /* transform: translateY(-50%); */
  fill: var(--white);
`;
