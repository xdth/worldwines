import styled from 'styled-components';

export const Winery = styled.a`
  background-color: var(--background);
  margin-bottom: 20px;
  max-width: 1000px;
  padding: 20px;
  transition: transform 0.2s;
  color: var(--white);
  text-decoration: none;
  display: flex;

  &:hover {
    transform: translateX(10px);
    color: var(--purple);
  }

  @media (max-width: 480px) {
  }
`;