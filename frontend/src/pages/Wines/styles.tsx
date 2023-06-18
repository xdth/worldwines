import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 30px 0 30px;
  h1 {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px 10px;
    text-align: center;
  }

  h2 {
    font-size: 20px;
    border-bottom: 1px solid white;
  }

  a.active {
    color: red;
  }
`;