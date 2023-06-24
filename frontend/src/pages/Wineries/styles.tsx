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

export const Winery = styled.a`
  background-color: var(--background);
  margin: auto;
  margin-bottom: 20px;
  width: 90%;
  max-width: 1000px;
  padding: 20px;
  transition: transform 0.2s;
  color: var(--white);
  text-decoration: none;
  display: inline-block;

  &:hover {
    transform: translateX(10px);
    color: var(--purple);
  }

  @media (max-width: 480px) {
    width: 90%;
    margin: 10px auto;
  }
`;