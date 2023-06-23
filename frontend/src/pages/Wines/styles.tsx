import styled from 'styled-components';

export const Container = styled.div`
  width: 50%;
  min-width: 700px;
  margin: auto;

  @media (max-width: 480px) {
    width: 90%;
    min-width: 400px;
    margin: auto;
  }
`;